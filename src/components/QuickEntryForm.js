import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { db } from '../firebase';
import { doc, getDoc, setDoc } from 'firebase/firestore';
import { Button, TextField, FormControl, InputLabel, Select, MenuItem, Container, Typography, Box, CircularProgress, Paper } from '@mui/material';
import { styled } from '@mui/system';

const StyledFormContainer = styled(Container)({
	display: 'flex',
	flexDirection: 'column',
	alignItems: 'center',
	justifyContent: 'center',
	padding: '20px',
	marginTop: '50px',
	backgroundColor: '#f5f5f5',
	borderRadius: '10px',
	boxShadow: '0 4px 8px rgba(0,0,0,0.1)',
});

const StyledTextField = styled(TextField)({
	marginBottom: '20px',
	width: '100%',
});

const StyledButton = styled(Button)({
	marginTop: '20px',
	width: '100%',
});

const QuickEntryForm = () => {
	const { id } = useParams();
	const navigate = useNavigate();
	const [name, setName] = useState('');
	const [reason, setReason] = useState('');
	const [otherReason, setOtherReason] = useState('');
	const [room, setRoom] = useState('');
	const [loading, setLoading] = useState(true);

	useEffect(() => {
		const fetchUserName = async () => {
			try {
				const userDoc = await getDoc(doc(db, 'frequentUsers', id));
				if (userDoc.exists()) {
					const userData = userDoc.data();
					setName(userData.name);
				} else {
					alert('Usuario no encontrado');
					navigate('/');
				}
			} catch (error) {
				console.error('Error fetching user:', error);
				navigate('/');
			} finally {
				setLoading(false);
			}
		};

		fetchUserName();
	}, [id, navigate]);

	const handleEntry = async () => {
		try {
			let currentTime = new Date();
			const localTime = new Date(currentTime.getTime() - 7 * 60 * 60 * 1000); // Subtract 7 hours (in milliseconds)
			const entryTime = localTime.toISOString().replace('T', ' ').slice(0, 19); // Keep the format YYYY-MM-DD HH:MM:SS

			const entryID = entryTime;
			const entryReason = reason === 'Otro' ? otherReason : reason;

			await setDoc(doc(db, 'entries', entryID), {
				name,
				reason: entryReason,
				room,
				entryTime: entryTime,
				dentro: true
			});

			alert(`Registro de entrada exitoso para ${name}`);
			navigate('/');
		} catch (e) {
			console.error('Error en registro de entrada: ', e);
		}
	};

	if (loading) {
		return (
			<Box display="flex" alignItems="center" justifyContent="center" height="100vh">
				<CircularProgress />
			</Box>
		);
	}

	return (
		<StyledFormContainer component={Paper}>
			<Typography variant="h4" gutterBottom>
				Formulario de Entrada Rápida
			</Typography>
			<FormControl fullWidth margin="normal">
				<StyledTextField label="Nombre" value={name} disabled />
			</FormControl>
			<FormControl fullWidth margin="normal">
				<InputLabel>Razón</InputLabel>
				<Select value={reason} onChange={(e) => setReason(e.target.value)}>
					<MenuItem value="Bioterio">Bioterio</MenuItem>
					<MenuItem value="Experimento">Experimento</MenuItem>
					<MenuItem value="Investigación">Investigación</MenuItem>
					<MenuItem value="Sala de enseñanza">Sala de enseñanza</MenuItem>
					<MenuItem value="Servicio social">Servicio social</MenuItem>
					<MenuItem value="Técnico Académico">Técnico Académico</MenuItem>
					<MenuItem value="Visita general">Visita general</MenuItem>
					<MenuItem value="Práctica">Práctica</MenuItem>
					<MenuItem value="Otro">Otro</MenuItem>
				</Select>
				{reason === 'Otro' && (
					<StyledTextField
						label="Especificar otro"
						value={otherReason}
						onChange={(e) => setOtherReason(e.target.value)}
						margin="normal"
					/>
				)}
			</FormControl>
			<FormControl fullWidth margin="normal">
				<InputLabel>Sala</InputLabel>
				<Select value={room} onChange={(e) => setRoom(e.target.value)}>
					<MenuItem value="Bioterio">Bioterio</MenuItem>
					<MenuItem value="Sala de enseñanza">Sala de enseñanza</MenuItem>
					<MenuItem value="Administración">Administración</MenuItem>
					<MenuItem value="Sala de experimentación">Sala de experimentación</MenuItem>
				</Select>
			</FormControl>
			<StyledButton variant="contained" color="primary" onClick={handleEntry}>
				Registrar Entrada
			</StyledButton>
		</StyledFormContainer>
	);
};

export default QuickEntryForm;
