import React, { useState, useRef, useEffect } from 'react';
import './Header.css';
import { FaUser, FaShoppingCart, FaSearch, FaBars } from 'react-icons/fa';
import { Link, useNavigate } from 'react-router-dom';

const Header = ({ cartItems, setCartItems }) => {
  const [menuOpen, setMenuOpen] = useState(false);
  const [submenuOpen, setSubmenuOpen] = useState(null);
  const [searchOpen, setSearchOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [cartOpen, setCartOpen] = useState(false);
  const menuRef = useRef(null);
  const searchRef = useRef(null);
  const cartRef = useRef(null);
  const navigate = useNavigate();  // Inicializa useNavigate

  const toggleMenu = () => setMenuOpen(!menuOpen);
  const toggleSubmenu = (menu) => setSubmenuOpen(submenuOpen === menu ? null : menu);
  const toggleSearch = () => setSearchOpen(!searchOpen);
  const toggleCart = () => setCartOpen(!cartOpen);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (menuRef.current && !menuRef.current.contains(event.target)) {
        setMenuOpen(false);
        setSubmenuOpen(null);
      }
      if (searchRef.current && !searchRef.current.contains(event.target)) {
        setSearchOpen(false);
      }
      if (cartRef.current && !cartRef.current.contains(event.target)) {
        setCartOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
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

  // Función para redirigir al checkout con los datos del carrito
  const goToCheckout = () => {
    setCartOpen(false);
    navigate('/checkout', { state: { cartItems, totalPrice } }); // Pasa los datos del carrito como estado
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
              <button type="submit" className="search-submit-btn">Buscar</button>
            </form>
          </div>
        )}
        <button className="btn btn-cart" onClick={toggleCart}>
          <FaShoppingCart size={15} />
        </button>
      </div>
      {cartOpen && (
        <div ref={cartRef} className="cart-overlay">
          <div className="cart-container">
            <button className="close-btn" onClick={toggleCart}>X</button>
            <h2>Carrito de Compras</h2>
            <ul className="cart-items">
              {cartItems.map((item, index) => (
                <li key={index} className="cart-item">
                  <img src={item.image} alt={item.name} />
                  <div>
                    <p>{item.name}</p>
                    <p>${item.price.toFixed(2)}</p>
                  </div>
                  <button className="btn-remove" onClick={() => removeItem(index)}>Eliminar</button>
                </li>
              ))}
            </ul>
            <div className="cart-summary">
              <p>Total: ${totalPrice.toFixed(2)}</p>
              <button className="btn btn-checkout" onClick={goToCheckout}>Ir a Pagar</button> {/* Botón para redirigir */}
            </div>
          </div>
        </div>
      )}
      <div ref={menuRef} className={`menu ${menuOpen ? 'open' : ''}`}>
        <ul>
          <li>
            <button
              className="submenu-toggle"
              onClick={() => toggleSubmenu('hombre')}
            >
              Hombre
            </button>
            <ul className={`submenu ${submenuOpen === 'hombre' ? 'open' : ''}`}>
              <li><Link to="/Menu?gender=hombre&subcategory=superior">Superior</Link></li>
              <li><Link to="/Menu?gender=hombre&subcategory=inferior">Inferior</Link></li>
              <li><Link to="/Menu?gender=hombre&subcategory=calzado">Calzado</Link></li>
            </ul>
          </li>
          <li>
            <button
              className="submenu-toggle"
              onClick={() => toggleSubmenu('mujer')}
            >
              Mujer
            </button>
            <ul className={`submenu ${submenuOpen === 'mujer' ? 'open' : ''}`}>
              <li><Link to="/Menu?gender=mujer&subcategory=superior">Superior</Link></li>
              <li><Link to="/Menu?gender=mujer&subcategory=inferior">Inferior</Link></li>
              <li><Link to="/Menu?gender=mujer&subcategory=calzado">Calzado</Link></li>
            </ul>
          </li>
        </ul>
      </div>
    </header>
  );
};

export default Header;
