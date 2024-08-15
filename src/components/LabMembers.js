import React, { useEffect, useState } from 'react';
import '../styles/lab.css';
import { db, storage } from '../apis/firebase'; // Importar storage
import { collection, getDocs, query } from "firebase/firestore";
import { ref, getDownloadURL } from "firebase/storage"; // Importar métodos para obtener imágenes de storage

import raton1 from "../assets/members/raton1.jpg";
import raton2 from "../assets/members/raton2.jpg";
import raton3 from "../assets/members/raton3.webp"

import ofimg1 from '../assets/ourfun/img1.png';
import ofimg2 from '../assets/ourfun/img2.png';
import ofimg3 from '../assets/ourfun/img3.png';

const LabMembers = () => {
	const [labMembers, setLabMembers] = useState([]);

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

	const fetchLabMembers = async () => {
		const q = query(collection(db, "labMembers"));
		try {
			const querySnapshot = await getDocs(q);
			const membersArray = [];

			// Iterar sobre cada miembro para obtener la URL de la imagen desde Firebase Storage
			for (const doc of querySnapshot.docs) {
				const memberData = doc.data();
				const imageRef = ref(storage, `members/${memberData.image}`); // Obtener referencia de la imagen en storage
				const imageUrl = await getDownloadURL(imageRef); // Obtener la URL de descarga

				// Añadir la URL de la imagen a los datos del miembro
				membersArray.push({ id: doc.id, ...memberData, imageUrl });
			}

			setLabMembers(membersArray);
		} catch (error) {
			console.error('Error fetching entries:', error);
		}
	};

	useEffect(() => {
		fetchLabMembers();
	}, []);

	return (
		<div className="container">
			<div className="header">
				<h1>Miembros del laboratorio</h1>
			</div>
			{labMembers.map((member, index) => (
				<div className="member" key={index}>
					<a href={member.link} target="_blank" rel="noopener noreferrer">
						<img src={member.imageUrl} alt={member.name} />
					</a>
					<div className="member-info">
						<h3>{member.name}, {member.role}</h3>
						<p>{member.description}</p>
					</div>
				</div>
			))}
			{/* <div className="other-members">
				{otherMembers.map((member, index) => (
					<div className="other-member" key={index}>
						<img src={member.image} alt={member.name} />
						<p>{member.name}</p>
						<p>{member.role}</p>
					</div>
				))}
			</div> */}
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
