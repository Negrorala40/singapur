import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Header from './components/Header';
import Home from './pages/Home';
import Login from './pages/Login';
import Menu from './pages/Menu';
import Footer from './components/Footer';

const App = () => {
    // Estado global para el carrito
    const [cartItems, setCartItems] = useState([]);

    return (
        <Router>
            {/* Pasar el estado del carrito como props */}
            <Header cartItems={cartItems} setCartItems={setCartItems} />
            <Routes>
                <Route 
                    path="/" 
                    element={
                        <>
                            <Home />
                            <Menu 
                                cartItems={cartItems} 
                                setCartItems={setCartItems} 
                            /> {/* Pasar props a Menu */}
                        </>
                    } 
                />
                <Route path="/login" element={<Login />} />
                <Route 
                    path="/Menu" 
                    element={
                        <Menu 
                            cartItems={cartItems} 
                            setCartItems={setCartItems} 
                        />
                    } 
                />
            </Routes>
            <Footer />
        </Router>
    );
};

export default App;