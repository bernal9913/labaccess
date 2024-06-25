import React, { useEffect, useState } from 'react';
import { db } from '../firebase';
import { collection, getDocs } from "firebase/firestore";
import { CSVLink } from "react-csv";

const Dashboard = () => {
	const [entries, setEntries] = useState([]);
	const [frequentUsers, setFrequentUsers] = useState([]);

	const fetchEntries = async () => {
		const querySnapshot = await getDocs(collection(db, "entries"));
		const entriesArray = [];
		querySnapshot.forEach((doc) => {
			entriesArray.push({ id: doc.id, ...doc.data() });
		});
		setEntries(entriesArray);
	};

	const fetchFrequentUsers = async () => {
		const querySnapshot = await getDocs(collection(db, "frequentUsers"));
		const usersArray = [];
		querySnapshot.forEach((doc) => {
			usersArray.push({ id: doc.id, ...doc.data() });
		});
		setFrequentUsers(usersArray);
	};

	useEffect(() => {
		fetchEntries();
		fetchFrequentUsers();
	}, []);

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

	return (
		<div>
			<h1>Dashboard</h1>
			<section>
				<h2>Entradas y Salidas</h2>
				<CSVLink data={entries} headers={headers} filename={"entradas-salidas.csv"}>
					Descargar CSV
				</CSVLink>
				<table>
					<thead>
					<tr>
						<th>ID</th>
						<th>Nombre</th>
						<th>Razón</th>
						<th>Hora de Entrada</th>
						<th>Hora de Salida</th>
						<th>Dentro</th>
					</tr>
					</thead>
					<tbody>
					{entries.map(entry => (
						<tr key={entry.id}>
							<td>{entry.id}</td>
							<td>{entry.name}</td>
							<td>{entry.reason}</td>
							<td>{entry.entryTime}</td>
							<td>{entry.exitTime}</td>
							<td>{entry.dentro ? 'Sí' : 'No'}</td>
						</tr>
					))}
					</tbody>
				</table>
			</section>
			<section>
				<h2>Usuarios Frecuentes</h2>
				<CSVLink data={frequentUsers} headers={userHeaders} filename={"usuarios-frecuentes.csv"}>
					Descargar CSV
				</CSVLink>
				<table>
					<thead>
					<tr>
						<th>ID</th>
						<th>Nombre</th>
						<th>Cargo</th>
					</tr>
					</thead>
					<tbody>
					{frequentUsers.map(user => (
						<tr key={user.id}>
							<td>{user.id}</td>
							<td>{user.name}</td>
							<td>{user.role}</td>
						</tr>
					))}
					</tbody>
				</table>
			</section>
		</div>
	);
};

export default Dashboard;
