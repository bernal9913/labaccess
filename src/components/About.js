import React from 'react';
import '../styles/About.css';
import estefyImage from '../assets/members/estefy.jpg';
import carlosImage from '../assets/members/carlos.jpg';
import desiderioImage from '../assets/members/desiderio.jpg';

const About = () => {
	return (
		<div className="about-container">
			<h1>Acerca de Nosotros</h1>
			<p className="description">
				Proyecto creado para automatizar las entradas y salidas del Laboratorio de Conducta Experimental
				como parte del servicio social de los estudiantes de Ingeniería en Sistemas de Información.
			</p>
			<div className="team">
				<div className="team-member">
					<a href="https://www.youtube.com/watch?v=tGE381tbQa8" target="_blank" rel="noopener noreferrer">
						<img src={estefyImage} alt="Estefy" className="team-image"/>
					</a>
					<h3>Estefy Grave</h3>
					<p className="member-description">
						Encargada de UX/UI y documentacion
					</p>
				</div>
				<div className="team-member">
					<a href="https://www.youtube.com/watch?v=X_SEwgDl02E" target="_blank" rel="noopener noreferrer">
						<img src={carlosImage} alt="Carlos" className="team-image"/>
					</a>
					<h3>Carlos Bernal</h3>
					<p className="member-description">
						Encargado de la programación, bases de datos e implementación
					</p>
				</div>
				<div className="team-member">
					<a href="https://www.youtube.com/watch?v=ARWg160eaX4" target="_blank" rel="noopener noreferrer">
						<img src={desiderioImage} alt="Desiderio" className="team-image"/>
					</a>
					<h3>Rene Antunez</h3>
					<p className="member-description">
						Encargado de testing y diseño
					</p>
				</div>
			</div>
		</div>
	);
};

export default About;
