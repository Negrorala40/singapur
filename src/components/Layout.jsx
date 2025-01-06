import React from 'react';
import { Outlet } from 'react-router-dom';
// import './Layout.css'; // Si necesitas estilos específicos para el layout
import Header from './Header'; // El header que ya tienes

const Layout = () => {
    return (
        <div>
            <Header />
            <main>
                <Outlet /> {/* Renderiza las páginas aquí */}
            </main>
        </div>
    );
};

export default Layout;