import React, { useEffect, useState } from 'react';
import { db } from '../apis/firebase';
import { CSVLink } from "react-csv";
import { collection, getDocs, query, deleteDoc, doc } from "firebase/firestore";
import { DataGrid } from '@mui/x-data-grid';
import { Button } from '@mui/material';
import { Box, Typography } from '@mui/material';
import hamsterRunning from '../assets/commons/loading-rat.gif';
import {CopyToClipboard} from "react-copy-to-clipboard/src";

const Dashboard = () => {
	const [entries, setEntries] = useState([]);
	const [frequentUsers, setFrequentUsers] = useState([]);
	const [loading, setLoading] = useState(true);
	const [copiedText, setCopiedText] = useState('');

	const fetchEntries = async () => {
		const q = query(collection(db, "entriesD"));
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
		const q = query(collection(db, "frequentUsersD"));
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
		setLoading(false);
	}, []);

	const downloadCSV = () => {
		const csvData = entries.map(entry => ({
			id: entry.id || 'vacio',
			name: entry.name || 'vacio',
			reason: entry.reason || 'vacio',
			entryTime: entry.entryTime || 'vacio',
			exitTime: entry.exitTime || 'vacio',
			dentro: entry.dentro || 'false',
			room: entry.room || 'vacio'
		}));

		return csvData;
	};

	const handleCopyLink = (type, id) => {
		const baseUrl = "https://laboratorio--aec.web.app";
		const url = `${baseUrl}/${type}/${id}`;
		setCopiedText(url);
	};

	const deleteUser = async (id) => {
		try {
			await deleteDoc(doc(db, 'frequentUsersD', id));
			fetchFrequentUsers(); // Fetch the updated frequent users
		} catch (error) {
			console.error('Error deleting user:', error);
		}
	};

	const headers = [
		{ label: "ID", key: "id" },
		{ label: "Nombre", key: "name" },
		{ label: "Razón", key: "reason" },
		{ label: "Hora de Entrada", key: "entryTime" },
		{ label: "Hora de Salida", key: "exitTime" },
		{ label: "Dentro", key: "dentro" },
		{ label: "Sala", key: "room" }
	];


	const columnsEntries = [
		{ field: 'id', headerName: 'ID', width: 150 },
		{ field: 'name', headerName: 'Nombre', width: 200 },
		{ field: 'entryTime', headerName: 'Hora de Entrada', width: 200 },
		{ field: 'exitTime', headerName: 'Hora de Salida', width: 200 },
		{ field: 'dentro', headerName: 'Dentro', width: 150 },
		{ field: 'room', headerName: 'Sala', width: 150 },
	];

	const columnsFrequentUsers = [
		{ field: 'id', headerName: 'ID', width: 150 },
		{ field: 'name', headerName: 'Nombre', width: 200 },
		{ field: 'role', headerName: 'Cargo', width: 200 },
		{
			field: 'actions',
			headerName: 'Acciones',
			width: 750,
			renderCell: (params) => (
				<>
					<CopyToClipboard text={`https://laboratorio--aec.web.app/entradaDIPA/${params.row.id}`}>
						<Button
							variant="contained"
							color="primary"
							style={{ marginRight: '10px' }}
							onClick={() => handleCopyLink('entrada', params.row.id)}
						>
							Copiar Enlace de Entrada
						</Button>
					</CopyToClipboard>
					<CopyToClipboard text={`https://laboratorio--aec.web.app/salidaDIPA/${params.row.id}`}>
						<Button
							variant="contained"
							color="secondary"
							style={{ marginRight: '10px' }}
							onClick={() => handleCopyLink('salida', params.row.id)}
						>
							Copiar Enlace de Salida
						</Button>
					</CopyToClipboard>
					<Button
						variant="contained"
						color="error"
						onClick={() => deleteUser(params.row.id)}
					>
						Eliminar
					</Button>
				</>
			)
		}
	];
	return (
		<div style={{ padding: '20px' }}>
			<h1>Dashboard</h1>
			{loading ? (
				<Box display="flex" flexDirection="column" alignItems="center" justifyContent="center" height="300px">
					<img src={hamsterRunning} alt="Cargando..." style={{ width: '150px', height: '150px' }} />
					<Typography variant="body1" align="center">Cargando datos...</Typography>
				</Box>
			) : (
				<>
					<div style={{ height: 400, width: '100%', marginBottom: '20px' }}>
						<DataGrid rows={entries} columns={columnsEntries} pageSize={5} />
					</div>
					<Button variant="contained" color="primary">
						<CSVLink data={downloadCSV()} headers={headers} filename={"entries.csv"} style={{ color: 'inherit', textDecoration: 'none' }}>
							Descargar CSV
						</CSVLink>
					</Button>
					<h2>Usuarios Frecuentes</h2>
					<div style={{ height: 400, width: '100%' }}>
						<DataGrid rows={frequentUsers} columns={columnsFrequentUsers} pageSize={5} />
					</div>
				</>
			)}
		</div>
	);
};

export default Dashboard;

