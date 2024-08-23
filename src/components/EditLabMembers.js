import React, { useEffect, useState } from 'react';
import '../styles/lab.css';
import { db, storage } from '../apis/firebase';
import { collection, getDocs, query, addDoc, updateDoc, deleteDoc, doc } from "firebase/firestore";
import { ref, uploadBytes, getDownloadURL, listAll, deleteObject } from "firebase/storage";

const EditLabMembers = () => {
	const [labMembers, setLabMembers] = useState([]);
	const [activities, setActivities] = useState([]);
	const [selectedMember, setSelectedMember] = useState(null);
	const [formData, setFormData] = useState({
		name: '',
		role: '',
		description: '',
		image: null,
		link: ''
	});
	const [imageUpload, setImageUpload] = useState(null);

	const fetchLabMembers = async () => {
		const q = query(collection(db, "labMembers"));
		try {
			const querySnapshot = await getDocs(q);
			const membersArray = [];

			for (const doc of querySnapshot.docs) {
				const memberData = doc.data();
				const imageRef = ref(storage, `members/${memberData.image}`);
				const imageUrl = await getDownloadURL(imageRef);

				membersArray.push({ id: doc.id, ...memberData, imageUrl });
			}

			setLabMembers(membersArray);
		} catch (error) {
			console.error('Error fetching entries:', error);
		}
	};

	const fetchActivities = async () => {
		try {
			const activitiesRef = ref(storage, 'activities/');
			// Listar todos los archivos en el folder
			const listResult = await listAll(activitiesRef);
			const activitiesArray = [];

			for (const itemRef of listResult.items) {
				const imageUrl = await getDownloadURL(itemRef);
				activitiesArray.push({ imageUrl, name: itemRef.name });
			}
			setActivities(activitiesArray)

		} catch (error) {
			console.error('Error fetching activities images:', error);
		}
	};


	const handleSubmit = async (e) => {
		e.preventDefault();

		let imageUrl = formData.image;

		if (imageUpload) {
			const imageRef = ref(storage, `members/${imageUpload.name}`);
			const snapshot = await uploadBytes(imageRef, imageUpload);

		}

		const updatedFormData = { ...formData, image: imageUpload.name };

		if (selectedMember) {
			const memberRef = doc(db, "labMembers", selectedMember.id);
			await updateDoc(memberRef, updatedFormData);
		} else {
			await addDoc(collection(db, "labMembers"), updatedFormData);
		}

		setFormData({
			name: '',
			role: '',
			description: '',
			image: null,
			link: ''
		});
		setImageUpload(null);
		setSelectedMember(null);
		fetchLabMembers();
	};

	const handleSubmitImages = async (e) => {
		e.preventDefault();
	
		if (!imageUpload || imageUpload.length === 0) return;
	
		const uploadedImages = [];
		
		for (const file of imageUpload) {
			const imageRef = ref(storage, `activities/${file.name}`);
			const snapshot = await uploadBytes(imageRef, file);
			const imageUrl = await getDownloadURL(snapshot.ref);
			uploadedImages.push(imageUrl);
		}

		fetchActivities();
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

	const handleImageDelete = async (activity) => {
		const activityRef = ref(storage, `activities/${activity.name}`);
		await deleteObject(activityRef)
		fetchActivities();
	};

	const handleChange = (e) => {
		const { name, value, files } = e.target;
		if (name === "image" && files) {
			setImageUpload(files[0]);
		} else {
			setFormData({
				...formData,
				[name]: value,
			});
		}
	};

	const handleChangeImage = (e) => {
		setImageUpload(e.target.files);
	};

	useEffect(() => {
		fetchLabMembers();
		fetchActivities();
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
					accept='image/png, image/jpg, image/jpeg, image/webp'
					onChange={handleChange}
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
						<img src={member.imageUrl} alt={member.name} />
					</a>
					<div className="member-info">
						<h3>{member.name}, {member.role}</h3>
						<p>{member.description}</p>
						<button onClick={() => handleEdit(member)}>Editar</button>
						<button onClick={() => handleDelete(member.id)}>Eliminar</button>
					</div>
				</div>
			))}

			<div className="lab-fun">
				<h2>Actividades del laboratorio</h2>
				<form onSubmit={handleSubmitImages}>
					<input
						type="file"
						name="image"
						accept='image/png, image/jpg, image/jpeg, image/webp'
						multiple
						onChange={handleChangeImage}
					/>
					<button type="submit">Agregar Imagen(es)</button>
				</form>
				{activities.map((activity, index) => (
					<div className="image" key={index}>
						<img alt={`Lab fun ${index}`} src={activity.imageUrl} />
						<div className="delete" type="button" onClick={() => handleImageDelete(activity)}>X</div>
					</div>
				))}
			</div>
		</div>
	);
};

export default EditLabMembers;
