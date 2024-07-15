import React, { useState } from 'react';
import { db } from '../apis/firebase';
import { TextField, Button, Container, Typography, Box, Avatar } from '@mui/material';
import imagen from '../assets/commons/ratafrequent.png';
import { collection, addDoc } from "firebase/firestore";

const FrequentUserForm = () => {
    const [name, setName] = useState('');
    const [role, setRole] = useState('');

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const docRef = await addDoc(collection(db, 'frequentUsers'), {
                name,
                role
            });
            alert(`Usuario frecuente registrado exitosamente con ID: ${docRef.id}`);
            setName('');
            setRole('');
        } catch (error) {
            console.error('Error al registrar el usuario frecuente: ', error);
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
                        Registrar Usuario Frecuente
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
                    name="role"
                    label="Cargo"
                    type="text"
                    id="role"
                    autoComplete="role"
                    value={role}
                    onChange={(e) => setRole(e.target.value)}
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
            </Box>           
        </Container>           
    );
};

export default FrequentUserForm;
