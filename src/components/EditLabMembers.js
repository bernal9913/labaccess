import React, { useEffect, useState } from 'react';
import '../styles/lab.css';
import { db } from '../apis/firebase';
import { collection, getDocs, query, addDoc, updateDoc, deleteDoc, doc } from "firebase/firestore";

const EditLabMembers = () => {
	const [labMembers, setLabMembers] = useState([]);
	const [selectedMember, setSelectedMember] = useState(null);
	const [formData, setFormData] = useState({
		name: '',
		role: '',
		description: '',
		image: '',
		link: ''
	});

	const fetchLabMembers = async () => {
		const q = query(collection(db, "labMembers"));
		try {
			const querySnapshot = await getDocs(q);
			const membersArray = [];
			querySnapshot.forEach((doc) => {
				membersArray.push({ id: doc.id, ...doc.data() });
			});
			setLabMembers(membersArray);
		} catch (error) {
			console.error('Error fetching entries:', error);
		}
	};

	const handleSubmit = async (e) => {
		e.preventDefault();
		if (selectedMember) {
			// Update existing member
			const memberRef = doc(db, "labMembers", selectedMember.id);
			await updateDoc(memberRef, formData);
		} else {
			// Add new member
			await addDoc(collection(db, "labMembers"), formData);
		}
		setFormData({
			name: '',
			role: '',
			description: '',
			image: '',
			link: ''
		});
		setSelectedMember(null);
		fetchLabMembers();
	};

	const handleEdit = (member) => {
		setSelectedMember(member);
		setFormData(member);
	};

	const handleDelete = async (id) => {
		const memberRef = doc(db, "labMembers", id);
		await deleteDoc(memberRef);
		fetchLabMembers();
	};

	const handleChange = (e) => {
		setFormData({
			...formData,
			[e.target.name]: e.target.value,
		});
	};

	useEffect(() => {
		fetchLabMembers();
	}, []);

	return (
		<div className="container">
			<div className="header">
				<h1>Miembros del laboratorio</h1>
			</div>
			<form onSubmit={handleSubmit}>
				<input
					type="text"
					name="name"
					placeholder="Nombre"
					value={formData.name}
					onChange={handleChange}
					required
				/>
				<input
					type="text"
					name="role"
					placeholder="Rol"
					value={formData.role}
					onChange={handleChange}
					required
				/>
				<input
					type="text"
					name="description"
					placeholder="Descripción"
					value={formData.description}
					onChange={handleChange}
					required
				/>
				<input
					type="file"
					name="image"
					placeholder="Sube imagen"
					value={formData.image}
					accept='image/png, image/jpg, image/jpeg, image/webp'
					required
				/>
				<input
					type="text"
					name="link"
					placeholder="Enlace"
					value={formData.link}
					onChange={handleChange}
				/>
				<button type="submit">{selectedMember ? 'Actualizar Miembro' : 'Agregar Miembro'}</button>
			</form>
			{labMembers.map((member, index) => (
				<div className="member" key={index}>
					<a href={member.link} target="_blank" rel="noopener noreferrer">
						<img src={require(`../assets/members/${member.image}`)} alt={member.name} />
					</a>
					<div className="member-info">
						<h3>{member.name}, {member.role}</h3>
						<p>{member.description}</p>
						<button onClick={() => handleEdit(member)}>Editar</button>
						<button onClick={() => handleDelete(member.id)}>Eliminar</button>
					</div>
				</div>
			))}
		</div>
	);
};

export default EditLabMembers;
