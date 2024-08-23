import React, { useEffect, useState } from 'react';
import './styles/App.css';
import { db } from './apis/firebase';
import { collection, getDocs, query, where, doc, updateDoc, getDoc } from "firebase/firestore";
import { BrowserRouter as Router, Routes, Route, useParams, useNavigate, useLocation } from 'react-router-dom';
import EntryForm from './components/EntryForm';
import ExitForm from './components/ExitForm';
import Home from './components/home';
import FrequentUserForm from "./components/FrequentUserForm";
import Dashboard from "./components/dashboard";
import Navbar from "./components/NavBar";
import NotFound from "./components/NotFound";
import QuickEntryForm from "./components/QuickEntryForm";
import LabMembers from "./components/LabMembers";
import EditLabMembers from "./components/EditLabMembers"
import {Box, Typography} from "@mui/material";
import EntryFormDIPA from "./components/EntryFormDIPA";
import ExitFormDIPA from "./components/ExitFormDIPA";
import QuickEntryFormDIPA from "./components/QuickEntryFormDIPA";
import FrequentUserFormDIPA from "./components/FrequentUserFormDIPA";
import DashboardDIPA from "./components/dashboardDIPA";
import NavbarDIPA from "./components/NavbarDIPA";
import Layout from "./components/Layout";

function QuickEntryExit({ type }) {
	const { id } = useParams();
	const navigate = useNavigate();

	const handleQuickAction = async () => {
		try {
			const userDoc = await getDoc(doc(db, 'frequentUsers', id));
			if (userDoc.exists()) {
				const userData = userDoc.data();
				let currentTime = new Date();
				const localTime = new Date(currentTime.getTime() - 7 * 60 * 60 * 1000); // Subtract 7 hours (in milliseconds)
				const entryTime = localTime.toISOString().replace('T', ' ').slice(0, 19); // Keep the format YYYY-MM-DD HH:MM:SS


				if (type === 'salida') {
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
			} else {
				alert('Usuario no encontrado');
				navigate('/');
			}
		} catch (e) {
			console.error(`Error en registro de ${type}: `, e);
		}
	};

	useEffect(() => {
		handleQuickAction();
	}, []);

	return null;
}
function QuickEntryExitDIPA({ type }) {
	const { id } = useParams();
	const navigate = useNavigate();


	const handleQuickAction = async () => {
		try {
			const userDoc = await getDoc(doc(db, 'frequentUsersD', id));
			if (userDoc.exists()) {
				const userData = userDoc.data();
				let currentTime = new Date();
				const localTime = new Date(currentTime.getTime() - 7 * 60 * 60 * 1000); // Subtract 7 hours (in milliseconds)
				const entryTime = localTime.toISOString().replace('T', ' ').slice(0, 19); // Keep the format YYYY-MM-DD HH:MM:SS


				if (type === 'salida') {
					const q = query(collection(db, "entriesD"), where("name", "==", userData.name), where("dentro", "==", true));
					const querySnapshot = await getDocs(q);
					if (!querySnapshot.empty) {
						const entryDoc = querySnapshot.docs[0]; // Suponiendo que solo hay una entrada activa
						await updateDoc(doc(db, 'entriesD', entryDoc.id), {
							exitTime: entryTime,
							dentro: false
						});
					}
				}
				alert(`Registro de ${type} exitoso para ${userData.name}`);
				navigate('/');
			} else {
				alert('Usuario no encontrado');
				navigate('/');
			}
		} catch (e) {
			console.error(`Error en registro de ${type}: `, e);
		}
	};

	useEffect(() => {
		handleQuickAction();
	}, []);

	return null;
}

function App() {
	const [entries, setEntries] = useState([]);
	const [entriesD, setEntriesD] = useState([]);


	const fetchEntries = async () => {
		console.log('Fetching entries...');
		const q = query(collection(db, "entries"), where("dentro", "==", true));
		const q2 = query(collection(db, "entriesD"), where("dentro", "==", true));
		try {
			const querySnapshot = await getDocs(q);
			const entriesArray = [];
			querySnapshot.forEach((doc) => {
				entriesArray.push({ id: doc.id, ...doc.data() });
			});
			setEntries(entriesArray);

			const querySnapshot2 = await getDocs(q2);
			const entriesArray2 = [];
			querySnapshot2.forEach((doc) => {
				entriesArray2.push({ id: doc.id, ...doc.data() });
			});
			setEntriesD(entriesArray2);

			console.log('Entries fetched:', entriesArray);
			console.log('DIPA Entries fetched:', entriesArray2);
		} catch (error) {
			console.error('Error fetching entries:', error);
		}
	};


	useEffect(() => {
		fetchEntries();
	}, []);


	return (
		<Router>
			<Layout>
				<Routes>
					{/* Rutas AEC */}
					<Route path="/" element={<Home />} />
					<Route path="/Registro" element={<EntryForm />} />
					<Route path="/entrada/:id" element={<QuickEntryForm />} />
					<Route path="/Salidas" element={<ExitForm entries={entries} fetchEntries={fetchEntries} />} />
					<Route path="/salida/:id" element={<QuickEntryExit type="salida" />} />
					<Route path="/frequent-users" element={<FrequentUserForm />} />
					<Route path="/dashboard" element={<Dashboard />} />

					{/* Rutas DIPA */}
					<Route path="/RegistroDIPA" element={<EntryFormDIPA />} />
					<Route path="/entradaDIPA/:id" element={<QuickEntryFormDIPA />} />
					<Route path="/SalidasDIPA" element={<ExitFormDIPA entries={entriesD} fetchEntries={fetchEntries} />} />
					<Route path="/salidaDIPA/:id" element={<QuickEntryExitDIPA type="salida" />} />
					<Route path="/frequent-usersDIPA" element={<FrequentUserFormDIPA />} />
					<Route path="/dashboardDIPA" element={<DashboardDIPA />} />

					{/* Rutas comunes */}
					<Route path="/about" element={<LabMembers />} />
					<Route path="/labedit" element={<EditLabMembers />} />
					<Route path="*" element={<NotFound />} /> {/* Ruta 404 */}
				</Routes>
			</Layout>
			<Box component="footer" sx={{ padding: 2, textAlign: 'center', backgroundColor: '#3f51b5', color: '#fff', marginTop: 4 }}>
				<Typography variant="body2">
					&copy; 2024 Universidad de Sonora. Todos los derechos reservados.
				</Typography>
			</Box>
		</Router>
	);
}

export default App;
