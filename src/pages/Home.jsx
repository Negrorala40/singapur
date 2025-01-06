import React from 'react';
import './Home.css';
import { Link } from "react-router-dom";

const Home = () => {
    return (
        <div>
            <main>
                {/* Contenedor horizontal para Destacados y Descuentos */}
                <div className="horizontal-container">
                    {/* Sección Destacados */}
                    <section id="destacados" className="destacados">
                        <div className="container">
                            <h2>Destacados</h2>
                            <p>Conoce nuestras piezas más exclusivas.</p>
                        </div>
                    </section>

                    {/* Sección Descuentos */}
                    <section id="descuentos" className="descuentos">
                        <div className="container">
                            <h2>
                                <Link to="/Menu?filter=descuento" className="link-descuentos">
                                    Descuentos
                                </Link>
                            </h2>
                            <p>Aprovecha nuestras ofertas especiales.</p>
                        </div>
                    </section>
                </div>
            </main>

            {/* Footer
            <footer className="footer">
                <div className="container">
                    <p>&copy; 2024 Singapur. Sebastian Arboleda Londoño. Todos los derechos reservados.</p>
                </div>
            </footer> */}
        </div>
    );
};

export default Home;