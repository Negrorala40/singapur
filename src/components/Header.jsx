import React, { useState, useRef, useEffect } from 'react';
import './Header.css';
import { FaUser, FaShoppingCart, FaSearch, FaBars } from 'react-icons/fa';
import { Link, useNavigate } from 'react-router-dom';

const Header = ({ cartItems, setCartItems }) => {
    const [menuOpen, setMenuOpen] = useState(false);
    const [submenuOpen, setSubmenuOpen] = useState(false);
    const [searchOpen, setSearchOpen] = useState(false);
    const [searchQuery, setSearchQuery] = useState('');
    const [cartOpen, setCartOpen] = useState(false); // Estado para el visor del carrito
    const menuRef = useRef(null);
    const searchRef = useRef(null);
    const cartRef = useRef(null);
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

    const toggleCart = () => {
        setCartOpen(!cartOpen);
    };

    // Cerrar menú, barra de búsqueda o carrito al hacer clic fuera
    useEffect(() => {
        const handleClickOutside = (event) => {
            if (menuRef.current && !menuRef.current.contains(event.target)) {
                setMenuOpen(false);
                setSubmenuOpen(false);
            }
            if (searchRef.current && !searchRef.current.contains(event.target)) {
                setSearchOpen(false);
            }
            if (cartRef.current && !cartRef.current.contains(event.target)) {
                setCartOpen(false);
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
            navigate(`/Menu?search=${encodeURIComponent(searchQuery)}`);
            setSearchQuery('');
            setSearchOpen(false);
        }
    };

    const removeItem = (index) => {
        const updatedCart = cartItems.filter((_, i) => i !== index);
        setCartItems(updatedCart);
    };

    const totalPrice = cartItems.reduce((total, item) => total + item.price, 0);

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
                <button className="btn btn-cart" onClick={toggleCart}>
                    <FaShoppingCart size={15} />
                </button>
            </div>
            {/* Visor del carrito */}
            {cartOpen && (
                <div ref={cartRef} className="cart-overlay">
                    <div className="cart-container">
                        <button className="close-btn" onClick={toggleCart}>
                            X
                        </button>
                        <h2>Carrito de Compras</h2>
                        <ul className="cart-items">
                            {cartItems.map((item, index) => (
                                <li key={index} className="cart-item">
                                    <img src={item.image} alt={item.name} />
                                    <div>
                                        <p>{item.name}</p>
                                        <p>${item.price.toFixed(2)}</p>
                                    </div>
                                    <button
                                        className="btn-remove"
                                        onClick={() => removeItem(index)}
                                    >
                                        Eliminar
                                    </button>
                                </li>
                            ))}
                        </ul>
                        <div className="cart-summary">
                            <p>Total: ${totalPrice.toFixed(2)}</p>
                            <button className="btn btn-checkout">Ir a Pagar</button>
                        </div>
                    </div>
                </div>
            )}
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
