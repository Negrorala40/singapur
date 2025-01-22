import React, { useState } from 'react';
import './Product.css';

const Product = ({ product, addToCart }) => {
  const [selectedSize, setSelectedSize] = useState('');
  const [selectedColor, setSelectedColor] = useState('');
  const [quantity, setQuantity] = useState(1);

  const handleSizeChange = (e) => {
    setSelectedSize(e.target.value);
  };

  const handleColorChange = (e) => {
    setSelectedColor(e.target.value);
  };

  const handleQuantityChange = (e) => {
    setQuantity(e.target.value);
  };

  const handleAddToCart = () => {
    if (selectedSize && selectedColor) {
      addToCart({
        ...product,
        size: selectedSize,
        color: selectedColor,
        quantity: quantity,
      });
    } else {
      alert('Por favor selecciona talla y color');
    }
  };

  return (
    <div className="product">
      <img src={product.image} alt={product.name} className="product-image" />
      <div className="product-info">
        <h2>{product.name}</h2>
        <p>{product.description}</p>
        <p className="product-price">${product.price.toFixed(2)}</p>

        <div className="product-options">
          <div className="size-selector">
            <label>Talla:</label>
            <select value={selectedSize} onChange={handleSizeChange}>
              <option value="">Selecciona una talla</option>
              {product.sizes.map((size) => (
                <option key={size} value={size}>
                  {size}
                </option>
              ))}
            </select>
          </div>

          <div className="color-selector">
            <label>Color:</label>
            <select value={selectedColor} onChange={handleColorChange}>
              <option value="">Selecciona un color</option>
              {product.colors.map((color) => (
                <option key={color} value={color}>
                  {color}
                </option>
              ))}
            </select>
          </div>

          <div className="quantity-selector">
            <label>Cantidad:</label>
            <input
              type="number"
              value={quantity}
              onChange={handleQuantityChange}
              min="1"
            />
          </div>
        </div>

        <button className="btn-add-to-cart" onClick={handleAddToCart}>
          Agregar al Carrito
        </button>
      </div>
    </div>
  );
};

export default Product;