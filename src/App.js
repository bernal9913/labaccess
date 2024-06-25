import React, { useEffect, useState } from 'react';
import './App.css';
import { db } from './firebase';
import { collection, getDocs, query, where, doc, updateDoc, getDoc, setDoc} from "firebase/firestore";
import {BrowserRouter as Router, Routes, Route, useParams, useNavigate} from 'react-router-dom';
import EntryForm from './components/EntryForm';
import ExitForm from './components/ExitForm';
import Home from './components/home';
import FrequentUserForm from "./components/FrequentUserForm";
import Dashboard from "./components/dashboard";

function QuickEntryExit({ type }){
	const { id } = useParams();
	const navigate = useNavigate();

	const handleQuickAction = async () =>{
		try{
			const userDoc = await getDoc(doc(db, 'frequentUsers', id));
			if (userDoc.exists()){
				const userData = userDoc.data();
				let currentTime = new Date();
				const localTime = new Date(currentTime.getTime() - 7 * 60 * 60 * 1000); // Subtract 7 hours (in milliseconds)
				const entryTime = localTime.toISOString().slice(0, 16).replace('T', ' ');

				const entryID = entryTime;
				if (type === 'entrada'){
					await setDoc(doc(db, 'entries', entryID),{
						name: userData.name,
						reason: 'Acceso rapido',
						entryTime: entryTime,
						dentro: true
					});

				}else if (type === 'salida') {
					const q = query(collection(db, "entries"), where("name", "==", userData.name), where("dentro", "==", true));
					const querySnapshot = await getDocs(q);
					if (!querySnapshot.empty) {
						const entryDoc = querySnapshot.docs[0]; // Suponiendo que solo hay una entrada activa
						await updateDoc(doc(db, 'entries', entryDoc.id), {
							exitTime: entryTime,
							dentro: false
						});
					}
				}
				alert(`Registro de ${type} exitoso para ${userData.name}`);
				navigate('/');
			}else {
				alert('Usuario no encontrado');
				navigate('/');
			}
		}catch(e){
			console.error(`Error en registro de ${type}: `, e);
		};
	}
	useEffect(() => {
		handleQuickAction();
	}, []);

	return null;
}


function App() {
	const [entries, setEntries] = useState([]);

	const fetchEntries = async () => {
		console.log('Fetching entries...');
		const q = query(collection(db, "entries"), where("dentro", "==", true));
		try {
			const querySnapshot = await getDocs(q);
			const entriesArray = [];
			querySnapshot.forEach((doc) => {
				entriesArray.push({ id: doc.id, ...doc.data() });
			});
			setEntries(entriesArray);
			console.log('Entries fetched:', entriesArray);
		} catch (error) {
			console.error('Error fetching entries:', error);
		}
	};

	useEffect(() => {
		fetchEntries();
	}, []);

	return (
		<Router>
			<div className="App">
				<Routes>
					<Route path="/" element={<Home />} />
					<Route path="/Registro" element={<EntryForm />} />
					<Route path="/Salidas" element={<ExitForm entries={entries} fetchEntries={fetchEntries} />} />
					<Route path="/entrada/:id" element={<QuickEntryExit type="entrada" />} />
					<Route path="/salida/:id" element={<QuickEntryExit type="salida" />} />
					<Route path="/frequent-users" element={<FrequentUserForm />} />
					<Route path="/dashboard" element={<Dashboard />} />
				</Routes>
			</div>
		</Router>
	);
}

export default App;
