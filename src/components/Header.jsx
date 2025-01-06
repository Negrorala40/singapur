import React, { useState, useRef, useEffect } from 'react';
import './Header.css';
import { FaUser, FaShoppingCart, FaSearch, FaBars } from 'react-icons/fa';
import { Link, useNavigate } from 'react-router-dom';

const Header = () => {
    const [menuOpen, setMenuOpen] = useState(false);
    const [submenuOpen, setSubmenuOpen] = useState(false);
    const [searchOpen, setSearchOpen] = useState(false);
    const [searchQuery, setSearchQuery] = useState('');
    const menuRef = useRef(null);
    const searchRef = useRef(null);
    const navigate = useNavigate();

    // Alternar visibilidad del menú
    const toggleMenu = () => {
        setMenuOpen(!menuOpen);
    };

    // Alternar visibilidad del submenú
    const toggleSubmenu = () => {
        setSubmenuOpen(!submenuOpen);
    };

    const toggleSearch = () => {
        setSearchOpen(!searchOpen);
    };

    // Cerrar menú o barra de búsqueda al hacer clic fuera
    useEffect(() => {
        const handleClickOutside = (event) => {
            if (menuRef.current && !menuRef.current.contains(event.target)) {
                setMenuOpen(false);
                setSubmenuOpen(false);
            }
            if (searchRef.current && !searchRef.current.contains(event.target)) {
                setSearchOpen(false);
            }
        };

        document.addEventListener('mousedown', handleClickOutside);
        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, []);

    const handleSearchSubmit = (event) => {
        event.preventDefault();
        if (searchQuery.trim()) {
            // Navega a la página de menú con el parámetro de búsqueda
            navigate(`/menu?search=${encodeURIComponent(searchQuery)}`);
            setSearchQuery(''); // Limpia el campo de búsqueda
            setSearchOpen(false); // Cierra el cuadro de búsqueda
        }
    };

    return (
        <header className="header">
            <div className="header-left">
                <button className="btn btn-menu" onClick={toggleMenu}>
                    <FaBars size={15} />
                </button>
                <Link to="/Login" className="btn btn-login">
                    <FaUser size={15} />
                </Link>
            </div>
            <Link to="/" className="logo">Singapur</Link>
            <div className="header-right">
                {!searchOpen && (
                    <button className="btn btn-search" onClick={toggleSearch}>
                        <FaSearch size={15} />
                    </button>
                )}
                {searchOpen && (
                    <div ref={searchRef} className="search-box">
                        <form onSubmit={handleSearchSubmit}>
                            <input
                                type="text"
                                className="search-input"
                                placeholder="Buscar productos..."
                                value={searchQuery}
                                onChange={(e) => setSearchQuery(e.target.value)}
                            />
                            <button type="submit" className="search-submit-btn">
                                Buscar
                            </button>
                        </form>
                    </div>
                )}
                <button className="btn btn-cart">
                    <FaShoppingCart size={15} />
                </button>
            </div>
            {/* Menú desplegable */}
            <div ref={menuRef} className={`menu ${menuOpen ? 'open' : ''}`}>
                <ul>
                    <li>
                        <button className="submenu-toggle" onClick={toggleSubmenu}>
                            Calzado
                        </button>
                        {/* Submenú */}
                        <ul className={`submenu ${submenuOpen ? 'open' : ''}`}>
                            <li><a href="#calzado-hombre">Hombre</a></li>
                            <li><a href="#calzado-mujer">Mujer</a></li>
                        </ul>
                    </li>
                </ul>
            </div>
        </header>
    );
};

export default Header;