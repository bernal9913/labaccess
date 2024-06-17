import React from 'react';
import logo from "../ESCUDO-COLOR.png";
const home  = () => {
    return (
        <div className="App">
            <header className="App-header">
                <img src={logo} className="App-logo" alt="logo" />
                <h1>Laboratorio de Conducta Experimental</h1>
                <p>Página de prueba para demostrar el diseño del Laboratorio de Conducta Experimental.</p>
            </header>
            <main className="App-main">
                <section className="App-section">
                    <h2>Nuestro Compromiso</h2>
                    <p>Brindar servicios y productos de calidad para nuestros clientes.</p>
                    <a href="#mas-info" className="App-btn">Más Información</a>
                </section>
                <section id="mas-info" className="App-info">
                    <h2>¿Quiénes Somos?</h2>
                    <p>Somos un laboratorio dedicado a estudios avanzados en conducta humana y animal...</p>
                </section>
            </main>
            <footer className="App-footer">
                <p>&copy; 2024 Universidad de Sonora. All rights reserved.</p>
            </footer>
        </div>
    );
}
export default home;