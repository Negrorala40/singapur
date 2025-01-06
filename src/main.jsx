import React from 'react';
import ReactDOM from 'react-dom/client';  // Asegúrate de usar el nuevo API de React 18
import App from './App';  // Asegúrate de que la ruta a App.jsx sea correcta
import './index.css';  // Si tienes estilos globales

const root = ReactDOM.createRoot(document.getElementById('root'));  // Usando el nuevo API de React 18
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);