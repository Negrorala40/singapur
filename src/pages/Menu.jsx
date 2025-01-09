import React, { useState, useEffect } from 'react';
import './Menu.css';
import { useLocation, Link } from 'react-router-dom';

const products = [
    {
        id: 1,
        name: 'Zapato Deportivo',
        price: 120000,
        discount: 20,
        category: 'Deportivo',
        image: 'https://via.placeholder.com/150',
    },
    {
        id: 2,
        name: 'Zapato Casual',
        price: 95000,
        discount: 0,
        category: 'Casual',
        image: 'https://via.placeholder.com/150',
    },
    {
        id: 3,
        name: 'Zapato Formal',
        price: 200000,
        discount: 15,
        category: 'Formal',
        image: 'https://via.placeholder.com/150',
    },
    {
        id: 4,
        name: 'Zapato Deportivo Avanzado',
        price: 150000,
        discount: 10,
        category: 'Deportivo',
        image: 'https://via.placeholder.com/150',
    },
    {
        id: 5,
        name: 'Zapato Casual Moderno',
        price: 120000,
        discount: 15,
        category: 'Casual',
        image: 'https://via.placeholder.com/150',
    },
    {
        id: 6,
        name: 'Zapato Formal Elegante',
        price: 200000,
        discount: 20,
        category: 'Formal',
        image: 'https://via.placeholder.com/150',
    },
    {
        id: 7,
        name: 'Zapato Deportivo Profesional',
        price: 180000,
        discount: 5,
        category: 'Deportivo',
        image: 'https://via.placeholder.com/150',
    },
    {
        id: 8,
        name: 'Zapato Sandalia Verano',
        price: 80000,
        discount: 10,
        category: 'Sandalias',
        image: 'https://via.placeholder.com/150',
    },
        {
            id: 9,
            name: 'Zapato Deportivo Casual',
            price: 120000,
            discount: 15,
            category: 'Deportivos',
            image: 'https://via.placeholder.com/150',
        },
        {
            id: 10,
            name: 'Zapato Elegante Formal',
            price: 150000,
            discount: 20,
            category: 'Formales',
            image: 'https://via.placeholder.com/150',
        },
        {
            id: 11,
            name: 'Botas de Invierno',
            price: 180000,
            discount: 25,
            category: 'Botas',
            image: 'https://via.placeholder.com/150',
        },
        {
            id: 12,
            name: 'Sandalia Casual Playa',
            price: 60000,
            discount: 5,
            category: 'Sandalias',
            image: 'https://via.placeholder.com/150',
        },
        {
            id: 13,
            name: 'Zapato Running Profesional',
            price: 200000,
            discount: 30,
            category: 'Deportivos',
            image: 'https://via.placeholder.com/150',
        },
        {
            id: 14,
            name: 'Mocasines de Cuero',
            price: 140000,
            discount: 10,
            category: 'Formales',
            image: 'https://via.placeholder.com/150',
    },
    {
            id: 15,
            name: 'Zapato Escolar Niño',
            price: 90000,
            discount: 12,
            category: 'Escolares',
            image: 'https://via.placeholder.com/150',
    },
    {
            id: 16,
            name: 'Zapato Casual Urbano',
            price: 110000,
            discount: 18,
            category: 'Casuales',
            image: 'https://via.placeholder.com/150',
        },
    {
            id: 17,
            name: 'Zapato Outdoor Resistente',
            price: 130000,
            discount: 20,
            category: 'Outdoor',
            image: 'https://via.placeholder.com/150',
        },
    {
            id: 18,
            name: 'Pantuflas de Casa',
            price: 50000,
            discount: 8,
            category: 'Pantuflas',
            image: 'https://via.placeholder.com/150',
        },    
];

const Menu = () => {
    const location = useLocation();
    const [selectedCategory, setSelectedCategory] = useState('Todos');
    const [filteredProducts, setFilteredProducts] = useState(products);

    // Verificar si estamos en /Menu o si la ruta incluye parámetros de búsqueda para Menu
    const isMenuPage = location.pathname === '/Menu' || location.pathname.includes('/Menu');

    useEffect(() => {
        const queryParams = new URLSearchParams(location.search);
        const searchQuery = queryParams.get('search')?.toLowerCase() || '';
        const filterQuery = queryParams.get('filter');

        let filtered = products;

        // Filtrar por categoría
        if (selectedCategory !== 'Todos') {
            filtered = filtered.filter(
                (product) => product.category === selectedCategory
            );
        }

        // Filtrar por búsqueda
        if (searchQuery) {
            filtered = filtered.filter((product) =>
                product.name.toLowerCase().includes(searchQuery)
            );
        }

        // Filtrar por descuento
        if (filterQuery === 'descuento') {
            filtered = filtered.filter((product) => product.discount > 0);
        }

        setFilteredProducts(filtered);
    }, [location.search, selectedCategory]);

    const handleFilterChange = (event) => {
        setSelectedCategory(event.target.value);
    };

    return (
        <div
            className={`menu-container ${isMenuPage ? 'menu-page' : ''}`}
            style={{
                marginTop: isMenuPage ? '4rem' : '0', // Aplica margen superior solo en /Menu o búsquedas relacionadas
            }}
        >
            {/* Filtro y botón "Ver todo" */}
            <div className="filter-and-button-container">
                <div className="filter-container">
                    <label htmlFor="filter" className="filter-label">Filtrar por:</label>
                    <select
                        id="filter"
                        className="filter-select"
                        value={selectedCategory}
                        onChange={handleFilterChange}
                    >
                        <option value="Todos">Todos</option>
                        <option value="Deportivo">Deportivo</option>
                        <option value="Casual">Casual</option>
                        <option value="Formal">Formal</option>
                    </select>
                </div>

                <Link to="/Menu">
                    <button className="view-all-button">Ver todo</button>
                </Link>
            </div>

            {/* Productos filtrados */}
            <div className="product-grid">
                {filteredProducts.map((product) => (
                    <div key={product.id} className="product-card">
                        <img src={product.image} alt={product.name} className="product-image" />
                        <div className="product-details">
                            <h3 className="product-name">{product.name}</h3>
                            <p className="product-price">
                                {product.discount > 0 ? (
                                    <>
                                        <span className="original-price">
                                            ${product.price.toLocaleString('es-CO')}
                                        </span>
                                        <span className="discounted-price">
                                            ${(
                                                product.price -
                                                (product.price * product.discount) / 100
                                            ).toLocaleString('es-CO')}
                                        </span>
                                    </>
                                ) : (
                                    <span>${product.price.toLocaleString('es-CO')}</span>
                                )}
                            </p>
                            {product.discount > 0 && (
                                <span className="product-discount">
                                    {product.discount}% OFF
                                </span>
                            )}
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default Menu;