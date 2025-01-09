import React, { useState, useEffect } from 'react';
import './Car.css';

const initialCart = [
    {
        id: 1,
        name: 'Zapato Deportivo',
        description: 'Talla 42, Color Blanco',
        price: 120000,
        quantity: 1,
        image: 'https://via.placeholder.com/150',
    },
    {
        id: 2,
        name: 'Zapato Casual',
        description: 'Talla 40, Color Negro',
        price: 95000,
        quantity: 2,
        image: 'https://via.placeholder.com/150',
    },
];

const Car = () => {
    const [cart, setCart] = useState(() => {
        const savedCart = localStorage.getItem('cart');
        return savedCart ? JSON.parse(savedCart) : initialCart;
    });

    const [coupon, setCoupon] = useState('');
    const [discount, setDiscount] = useState(0);

    useEffect(() => {
        localStorage.setItem('cart', JSON.stringify(cart));
    }, [cart]);

    const handleQuantityChange = (id, quantity) => {
        setCart(cart.map(item => item.id === id ? { ...item, quantity: Math.max(quantity, 1) } : item));
    };

    const handleRemoveItem = (id) => {
        setCart(cart.filter(item => item.id !== id));
    };

    const handleClearCart = () => {
        setCart([]);
    };

    const handleApplyCoupon = () => {
        if (coupon === 'DESCUENTO10') {
            setDiscount(0.1);
        } else {
            alert('Cupón no válido');
        }
    };

    const subtotal = cart.reduce((acc, item) => acc + item.price * item.quantity, 0);
    const total = subtotal - subtotal * discount;

    return (
        <div className="car-container">
            <h2>Carrito de Compras</h2>
            <div className="car-items">
                {cart.map(item => (
                    <div key={item.id} className="car-item">
                        <img src={item.image} alt={item.name} className="car-item-image" />
                        <div className="car-item-details">
                            <h3>{item.name}</h3>
                            <p>{item.description}</p>
                            <p>Precio: ${item.price.toLocaleString('es-CO')}</p>
                            <div className="quantity-control">
                                <button onClick={() => handleQuantityChange(item.id, item.quantity - 1)}>-</button>
                                <span>{item.quantity}</span>
                                <button onClick={() => handleQuantityChange(item.id, item.quantity + 1)}>+</button>
                            </div>
                            <p>Total: ${(item.price * item.quantity).toLocaleString('es-CO')}</p>
                        </div>
                        <button className="remove-button" onClick={() => handleRemoveItem(item.id)}>Eliminar</button>
                    </div>
                ))}
            </div>
            <div className="car-summary">
                <h3>Resumen</h3>
                <p>Subtotal: ${subtotal.toLocaleString('es-CO')}</p>
                <p>Descuento: ${Math.round(subtotal * discount).toLocaleString('es-CO')}</p>
                <p>Total: ${total.toLocaleString('es-CO')}</p>
                <div className="coupon-section">
                    <input
                        type="text"
                        placeholder="Ingresa tu cupón"
                        value={coupon}
                        onChange={(e) => setCoupon(e.target.value)}
                    />
                    <button onClick={handleApplyCoupon}>Aplicar</button>
                </div>
                <div className="car-actions">
                    <button className="btn-secondary" onClick={() => window.history.back()}>Seguir comprando</button>
                    <button className="btn-primary">Proceder al pago</button>
                    <button className="btn-danger" onClick={handleClearCart}>Vaciar carrito</button>
                </div>
            </div>
        </div>
    );
};

export default Car;
