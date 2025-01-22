import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom'; // Importa el hook useNavigate
import './Login.css';
    
const Login = () => {
    const [isRegistering, setIsRegistering] = useState(false);
    const navigate = useNavigate(); // Inicializa el hook useNavigate

    const toggleRegister = () => {
        setIsRegistering(!isRegistering);
    };

    const handleSubmit = (event) => {
        event.preventDefault(); // Evita el comportamiento por defecto del formulario

        // Aquí puedes agregar la lógica de validación o API para iniciar sesión o registrar al usuario

        // Después de que el usuario se registre o inicie sesión, redirige a la página principal
        navigate('/'); // Redirige a la página de inicio
    };

    return (
        <div className="login-container">
            <div className="form-container">
                <h2>{isRegistering ? 'Registrar Usuario' : 'Iniciar Sesión'}</h2>
                <form onSubmit={handleSubmit}>
                    <div className="form-group">
                        <label htmlFor="email">Correo Electrónico</label>
                        <input type="email" id="email" placeholder="Ingrese su correo" required />
                    </div>
                    <div className="form-group">
                        <label htmlFor="password">Contraseña</label>
                        <input type="password" id="password" placeholder="Ingrese su contraseña" required />
                    </div>
                    {isRegistering && (
                        <>
                            <div className="form-group">
                                <label htmlFor="username">Nombre de Usuario</label>
                                <input type="text" id="username" placeholder="Ingrese su nombre de usuario" required />
                            </div>
                            <div className="form-group">
                                <label htmlFor="confirmPassword">Confirmar Contraseña</label>
                                <input
                                    type="password"
                                    id="confirmPassword"
                                    placeholder="Confirme su contraseña"
                                    required
                                />
                            </div>
                        </>
                    )}
                    <button type="submit" className="btn btn-primary">
                        {isRegistering ? 'Registrar' : 'Iniciar Sesión'}
                    </button>
                </form>
                <p className="toggle-text">
                    {isRegistering ? '¿Ya tienes una cuenta?' : '¿No tienes una cuenta?'}
                    <span onClick={toggleRegister} className="toggle-link">
                        {isRegistering ? ' Inicia Sesión' : ' Regístrate'}
                    </span>
                </p>
            </div>
        </div>
    );
};

export default Login;