import React from 'react';
import '../styles/lab.css';
import estefyImage from '../assets/members/estefy.jpg';
import carlosImage from '../assets/members/carlos.jpg';
import desiderioImage from '../assets/members/desiderio.jpg';
import kennethImage from '../assets/members/kenethtest.jpeg';
import raton1 from "../assets/members/raton1.jpg";
import raton2 from "../assets/members/raton2.jpg";
import raton3 from "../assets/members/raton3.webp"

import ofimg1 from '../assets/ourfun/img1.png';
import ofimg2 from '../assets/ourfun/img2.png';
import ofimg3 from '../assets/ourfun/img3.png';
const labMembers = [
	{
		name: "Kenneth Madrigal",
		role: "Director del laboratorio",
		description: "Doctor profesor, filantropo, playboy y millonario, no necesito presentación",
		image: kennethImage,
		link: "https://youtu.be/UrHZF4MLzwc?si=pLuhW0umWoU20gVS&t=24"
	},
	{
		name: "Estefania Grave",
		role: "prestador de servicio social",
		description: "Encargada de ux y documentacion",
		image: estefyImage,
		link: "https://www.youtube.com/watch?v=tGE381tbQa8"
	},
	{
		name: "Carlos Bernal",
		role: "prestador de servicio social",
		description: "Encargado de la programación, bases de datos e implementación",
		image: carlosImage,
		link: "https://www.youtube.com/watch?v=X_SEwgDl02E"
	},
	{
		name: "Rene Antunez",
		role: "prestador de servicio social",
		description: "Encargado de testing y diseño",
		image: desiderioImage,
		link: "https://www.youtube.com/watch?v=ARWg160eaX4"
	}
	// Add other members similarly
];
const otherMembers = [
	{
		name: "Liz Brown",
		role: "Undergraduate Student, EAB Lab",
		image: raton1
	},
	{
		name: "Lindsey DeWeerd",
		role: "Undergraduate Student, EAB/HOP Labs",
		image: raton2
	},
	{
		name: "Emily Gloede",
		role: "Undergraduate Student, EAB Lab",
		image: raton3
	},
	// Add other members similarly
];


const LabMembers = () => {
	return (
		<div className="container">
			<div className="header">
				<h1>Miembros del laboratorio</h1>
		</div>
		{labMembers.map((member, index) => (
			<div className="member" key={index}>
				<a href={member.link} target="_blank" rel="noopener noreferrer">
					<img src={member.image} alt={member.name} />
				</a>
				<div className="member-info">
					<h3>{member.name}, {member.role}</h3>
					<p>{member.description}</p>
				</div>
			</div>
		))}
			<div className="other-members">
				{otherMembers.map((member, index) => (
					<div className="other-member" key={index}>
						<img src={member.image} alt={member.name} />
						<p>{member.name}</p>
						<p>{member.role}</p>
					</div>
		))}
		</div>
			<div className="lab-fun">
				<h2>Actividades del laboratorio</h2>
				<img src={ofimg1} alt="Lab fun 1" />
				<img src={ofimg2} alt="Lab fun 2" />
				<img src={ofimg3} alt="Lab fun 3" />
			</div>
		</div>
	);
};


export default LabMembers;
