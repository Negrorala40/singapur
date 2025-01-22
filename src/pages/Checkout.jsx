import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import './Checkout.css'; // Agrega tu archivo de estilos CSS

const Checkout = () => {
    const [cartItems, setCartItems] = useState([]); // Aquí almacenamos los productos del carrito
    const [totalPrice, setTotalPrice] = useState(0); // Aquí almacenamos el total de la compra
    const [shippingInfo, setShippingInfo] = useState({
        name: '',
        address: '',
        city: '',
        country: '',
        postalCode: '',
    });
    const [paymentInfo, setPaymentInfo] = useState({
        cardNumber: '',
        expirationDate: '',
        cvv: '',
    });
    const navigate = useNavigate();

    // Simula obtener los productos del carrito desde el localStorage o estado global
    useEffect(() => {
        const cart = JSON.parse(localStorage.getItem('cart')) || [];
        setCartItems(cart);
        setTotalPrice(cart.reduce((total, item) => total + item.price * item.quantity, 0));
    }, []);

    // Función para manejar cambios en los campos del formulario
    const handleChange = (event) => {
        const { name, value } = event.target;
        if (name in shippingInfo) {
            setShippingInfo((prev) => ({ ...prev, [name]: value }));
        } else {
            setPaymentInfo((prev) => ({ ...prev, [name]: value }));
        }
    };

    // Función para procesar el pago (simulada)
    const handleCheckout = (event) => {
        event.preventDefault();
        
        // Aquí agregarías la lógica para procesar el pago, como integraciones con Stripe o PayPal

        // Si el pago es exitoso, redirige a la página de confirmación
        navigate('/confirmation'); // Redirige a una página de confirmación
    };

    return (
        <div className="checkout-container">
            <h2>Resumen de la Compra</h2>
            
            {/* Resumen de productos */}
            <div className="cart-summary">
                {cartItems.map((item) => (
                    <div key={item.id} className="cart-item">
                        <img src={item.image} alt={item.name} className="cart-item-image" />
                        <div className="cart-item-details">
                            <p>{item.name}</p>
                            <p>{item.quantity} x ${item.price}</p>
                        </div>
                    </div>
                ))}
                <div className="total-price">
                    <p>Total: ${totalPrice}</p>
                </div>
            </div>

            <h3>Información de Envío</h3>
            <form onSubmit={handleCheckout}>
                <div className="form-group">
                    <label htmlFor="name">Nombre</label>
                    <input
                        type="text"
                        id="name"
                        name="name"
                        value={shippingInfo.name}
                        onChange={handleChange}
                        placeholder="Ingrese su nombre"
                        required
                    />
                </div>
                <div className="form-group">
                    <label htmlFor="address">Dirección</label>
                    <input
                        type="text"
                        id="address"
                        name="address"
                        value={shippingInfo.address}
                        onChange={handleChange}
                        placeholder="Ingrese su dirección"
                        required
                    />
                </div>
                <div className="form-group">
                    <label htmlFor="city">Ciudad</label>
                    <input
                        type="text"
                        id="city"
                        name="city"
                        value={shippingInfo.city}
                        onChange={handleChange}
                        placeholder="Ingrese su ciudad"
                        required
                    />
                </div>
                <div className="form-group">
                    <label htmlFor="country">País</label>
                    <input
                        type="text"
                        id="country"
                        name="country"
                        value={shippingInfo.country}
                        onChange={handleChange}
                        placeholder="Ingrese su país"
                        required
                    />
                </div>
                <div className="form-group">
                    <label htmlFor="postalCode">Código Postal</label>
                    <input
                        type="text"
                        id="postalCode"
                        name="postalCode"
                        value={shippingInfo.postalCode}
                        onChange={handleChange}
                        placeholder="Ingrese su código postal"
                        required
                    />
                </div>

                <h3>Información de Pago</h3>
                <div className="form-group">
                    <label htmlFor="cardNumber">Número de Tarjeta</label>
                    <input
                        type="text"
                        id="cardNumber"
                        name="cardNumber"
                        value={paymentInfo.cardNumber}
                        onChange={handleChange}
                        placeholder="Ingrese el número de tarjeta"
                        required
                    />
                </div>
                <div className="form-group">
                    <label htmlFor="expirationDate">Fecha de Expiración</label>
                    <input
                        type="text"
                        id="expirationDate"
                        name="expirationDate"
                        value={paymentInfo.expirationDate}
                        onChange={handleChange}
                        placeholder="MM/AA"
                        required
                    />
                </div>
                <div className="form-group">
                    <label htmlFor="cvv">CVV</label>
                    <input
                        type="text"
                        id="cvv"
                        name="cvv"
                        value={paymentInfo.cvv}
                        onChange={handleChange}
                        placeholder="CVV"
                        required
                    />
                </div>

                <button type="submit" className="btn btn-primary">Confirmar Compra</button>
            </form>
        </div>
    );
};

export default Checkout;
