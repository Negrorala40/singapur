import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'; // Importa BrowserRouter y Routes
import Header from './components/Header';
import Home from './pages/Home';
import Login from './pages/Login';
import Menu from "./pages/Menu";
import Footer from "./components/Footer";

const App = () => {
    return (
        <Router>
            <Header />
            <Routes>
                <Route 
                    path="/" 
                    element={
                        <>
                            <Home />
                            <Menu /> {/* Renderiza Menu junto con Home */}
                        </>
                    } 
                />
                <Route path="/login" element={<Login />} />
                <Route path="/Menu" element={<Menu />} />
            </Routes>
            <Footer />
        </Router>
    );
};

export default App;
