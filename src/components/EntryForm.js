import React, { useState } from 'react';
import { db } from '../firebase';
import { doc, setDoc } from "firebase/firestore";
import { TextField, Button, Container, Typography, Box, Avatar } from '@mui/material';
import { Link } from 'react-router-dom';
import imagen from '../rataentry.png';

const EntryForm = ({ fetchEntries }) => {
    const [name, setName] = useState('');
    const [reason, setReason] = useState('');
    const [code, setCode] = useState('');

    const handleSubmit = async (e) => {
        e.preventDefault();
        let currentTime = new Date();
        const localTime = new Date(currentTime.getTime() - 7 * 60 * 60 * 1000); // Subtract 7 hours (in milliseconds)
        const entryTime = localTime.toISOString().slice(0, 16).replace('T', ' ');

        const id = entryTime; // Genera un ID basado en la fecha actual en formato ISO
        const dentro = true;

        try {
            await setDoc(doc(db, 'entries', id), {
                name: name || code,
                reason,
                entryTime,
                dentro
            });
            alert('Entrada registrada exitosamente\nNo olvides registrar tu salida!');
            setName('');
            setReason('');
            setCode('');
            fetchEntries(); // Fetch the updated entries
        } catch (error) {
            console.error('Error al registrar la entrada: ', error);
        }
    };

    return (
        <Container component="main" maxWidth="xs">
            <Box component="form" onSubmit={handleSubmit} sx={{ 
                mt: 3,
                display: 'flex', 
                flexDirection: 'column', 
                alignItems: 'center'  
                }}>
                <Typography component="h1" variant="h5">
                    Registro de Entrada
                </Typography>
                <Avatar src={imagen} alt="imagen" style={{ 
                    marginRight: '10px', 
                    borderRadius: 0,
                    width: '70px',
                    height: '70px' }} 
                    sx={{ mt: 2 }} // Margen superior entre el título y el avatar
                    />
                <TextField
                    variant="outlined"
                    margin="normal"
                    required
                    fullWidth
                    id="fname"
                    label="Nombre"
                    name="firstname"
                    autoComplete="fname"
                    autoFocus
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                />
                <TextField
                    variant="outlined"
                    margin="normal"
                    required
                    fullWidth
                    name="reason"
                    label="Razón de Entrada"
                    type="text"
                    id="reason"
                    autoComplete="reason"
                    value={reason}
                    onChange={(e) => setReason(e.target.value)}
                />
                <Button
                    type="submit"
                    fullWidth
                    variant="contained"
                    color="primary"
                    sx={{ mt: 3, mb: 2 }}
                >
                    Registrar
                </Button>
                <Button
                    type="button"
                    fullWidth
                    variant="contained"
                    color="secondary"
                    component={Link}
                    to="/"
                    sx={{ mt: 1 }}
                >
                    Regresar
                </Button>
            </Box>
        </Container>
    );
};

export default EntryForm;
