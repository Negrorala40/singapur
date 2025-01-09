import React, { useState } from 'react';
import './Login.css';
    
const Login = () => {
    const [isRegistering, setIsRegistering] = useState(false);

    const toggleRegister = () => {
        setIsRegistering(!isRegistering);
    };

    return (
        <div className="login-container">
            <div className="form-container">
                <h2>{isRegistering ? 'Registrar Usuario' : 'Iniciar Sesión'}</h2>
                <form>
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