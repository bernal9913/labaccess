import React, { useEffect, useState } from 'react';
import { db } from '../firebase';
import { CSVLink } from "react-csv";
import { collection, getDocs, query, where } from "firebase/firestore";
import { DataGrid } from '@mui/x-data-grid';
import { Button } from '@mui/material';
import '../dashboard.css';
import { CopyToClipboard } from 'react-copy-to-clipboard';

const Dashboard = () => {
	const [entries, setEntries] = useState([]);
	const [frequentUsers, setFrequentUsers] = useState([]);
	const [copiedText, setCopiedText] = useState('');

	const fetchEntries = async () => {
		const q = query(collection(db, "entries"));
		try {
			const querySnapshot = await getDocs(q);
			const entriesArray = [];
			querySnapshot.forEach((doc) => {
				entriesArray.push({ id: doc.id, ...doc.data() });
			});
			setEntries(entriesArray);
		} catch (error) {
			console.error('Error fetching entries:', error);
		}
	};

	const fetchFrequentUsers = async () => {
		const q = query(collection(db, "frequentUsers"));
		try {
			const querySnapshot = await getDocs(q);
			const usersArray = [];
			querySnapshot.forEach((doc) => {
				usersArray.push({ id: doc.id, ...doc.data() });
			});
			setFrequentUsers(usersArray);
		} catch (error) {
			console.error('Error fetching frequent users:', error);
		}
	};

	useEffect(() => {
		fetchEntries();
		fetchFrequentUsers();
	}, []);

	const handleCopyLink = (type, id) => {
		const baseUrl = "https://animal-crossing-4c5da.web.app";
		const url = `${baseUrl}/${type}/${id}`;
		navigator.clipboard.writeText(url).then(() => {
			alert(`Link copiado: ${url}`);
		});
	};

	const headers = [
		{ label: "ID", key: "id" },
		{ label: "Nombre", key: "name" },
		{ label: "Razón", key: "reason" },
		{ label: "Hora de Entrada", key: "entryTime" },
		{ label: "Hora de Salida", key: "exitTime" },
		{ label: "Dentro", key: "dentro" }
	];

	const userHeaders = [
		{ label: "ID", key: "id" },
		{ label: "Nombre", key: "name" },
		{ label: "Cargo", key: "role" }
	];

	const columnsEntries = [
		{ field: 'id', headerName: 'ID', width: 150 },
		{ field: 'name', headerName: 'Nombre', width: 200 },
		{ field: 'entryTime', headerName: 'Hora de Entrada', width: 200 },
		{ field: 'exitTime', headerName: 'Hora de Salida', width: 200 },
		{ field: 'reason', headerName: 'Razón', width: 200 },
		{ field: 'dentro', headerName: 'Dentro', width: 200 },
		// Añade más columnas según sea necesario
	];

	const columnsFrequentUsers = [
		{ field: 'id', headerName: 'ID', width: 150 },
		{ field: 'name', headerName: 'Nombre', width: 200 },
		{ field: 'role', headerName: 'Cargo', width: 200 },
		{
			field: 'actions',
			headerName: 'Acciones',
			width: 250,
			renderCell: (params) => (
				<>
					<Button
						variant="contained"
						color="primary"
						onClick={() => handleCopyLink('entrada', params.row.id)}
						style={{ marginRight: '10px' }}
					>
						Copiar Enlace de Entrada
					</Button>
				</>
			),},
		{
			field: "actions1",
			headerName: "Acciones1",
			width: 250,
			renderCell: (params) => (
				<>
					<Button
						variant="contained"
						color="secondary"
						onClick={() => handleCopyLink('salida', params.row.id)}
					>
						Copiar Enlace de Salida
					</Button>
				</>
			)
		},
	];

	return (
		<div style={{ padding: '20px' }}>
			<h1>Dashboard</h1>
			<div style={{ height: 400, width: '100%', marginBottom: '20px' }}>
				<DataGrid rows={entries} columns={columnsEntries} pageSize={5} />
			</div>
			<Button variant="contained" color="primary">
				<CSVLink
					data={entries}
					headers={headers}
					filename={"entries.csv"}
					style={{ color: "white", textDecoration: "none" }}
				>
					Descargar CSV
				</CSVLink>
			</Button>
			<h2>Usuarios Frecuentes</h2>
			<div style={{ height: 400, width: '100%' }}>
				<DataGrid rows={frequentUsers} columns={columnsFrequentUsers} pageSize={5} />
			</div>
		</div>
	);
};

export default Dashboard;
