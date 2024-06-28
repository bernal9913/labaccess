import React, { useState, useEffect } from 'react';
import { db } from '../firebase';
import { doc, setDoc, collection, getDocs } from "firebase/firestore";
import { TextField, Button, Container, Typography, Box, Avatar, Radio, RadioGroup, FormControlLabel, FormControl, FormLabel, Select, MenuItem } from '@mui/material';
import { Link } from 'react-router-dom';
import imagen from '../rataentry.png';

const EntryForm = ({ fetchEntries }) => {
    const [name, setName] = useState('');
    const [reason, setReason] = useState('');
    const [code, setCode] = useState('');
    const [isMember, setIsMember] = useState(false);
    const [frequentUsers, setFrequentUsers] = useState([]);
    const [selectedUser, setSelectedUser] = useState('');
    const [room, setRoom] = useState('');

    useEffect(() => {
        const fetchFrequentUsers = async () => {
            const q = collection(db, "frequentUsers");
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
        fetchFrequentUsers();
    }, []);

    const handleSubmit = async (e) => {
        e.preventDefault();
        let currentTime = new Date();
        const localTime = new Date(currentTime.getTime() - 7 * 60 * 60 * 1000); // Subtract 7 hours (in milliseconds)
        const entryTime = localTime.toISOString().slice(0, 16).replace('T', ' ');

        const id = entryTime; // Genera un ID basado en la fecha actual en formato ISO
        const dentro = true;
        const entryName = isMember ? selectedUser : (name || code);
        const entryReason = isMember ? 'Acceso rápido' : reason;

        try {
            await setDoc(doc(db, 'entries', id), {
                name: entryName,
                reason: entryReason,
                entryTime,
                dentro,
                room
            });
            alert('Entrada registrada exitosamente\nNo olvides registrar tu salida!');
            setName('');
            setReason('');
            setCode('');
            setSelectedUser('');
            setRoom('');
            fetchEntries(); // Fetch the updated entries
        } catch (error) {
            console.error('Error al registrar la entrada: ', error);
        }
    };

    return (
        <Container component="main" maxWidth="xs">
            <Typography component="h1" variant="h5" align="center" sx={{ mt: 2 }}>
                Bienvenido al laboratorio de análisis de conducta experimental
            </Typography>
            <Typography component="p" variant="body1" align="center" sx={{ mt: 1 }}>
                Por favor identifíquese antes de entrar y no olvide registrar su salida.
            </Typography>
            <Box component="form" onSubmit={handleSubmit} sx={{
                mt: 3,
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center'
            }}>
                <Avatar src={imagen} alt="imagen" style={{
                    marginRight: '10px',
                    borderRadius: 0,
                    width: '70px',
                    height: '70px'
                }} sx={{ mt: 2 }} />
                <FormControl component="fieldset" sx={{ mt: 2 }}>
                    <FormLabel component="legend">Identificación</FormLabel>
                    <RadioGroup
                        row
                        value={isMember ? 'member' : 'guest'}
                        onChange={(e) => setIsMember(e.target.value === 'member')}
                    >
                        <FormControlLabel value="guest" control={<Radio />} label="Soy invitado" />
                        <FormControlLabel value="member" control={<Radio />} label="Soy integrante" />
                    </RadioGroup>
                </FormControl>
                {isMember ? (
                    <FormControl fullWidth variant="outlined" sx={{ mt: 2 }}>
                        <Select
                            value={selectedUser}
                            onChange={(e) => setSelectedUser(e.target.value)}
                            displayEmpty
                        >
                            <MenuItem value="" disabled>Seleccione su nombre</MenuItem>
                            {frequentUsers.map((user) => (
                                <MenuItem key={user.id} value={user.name}>{user.name}</MenuItem>
                            ))}
                        </Select>
                    </FormControl>
                ) : (
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
                )}
                {!isMember && (
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
                )}
                <FormControl fullWidth variant="outlined" sx={{ mt: 2 }}>
                    <Select
                        value={room}
                        onChange={(e) => setRoom(e.target.value)}
                        displayEmpty
                    >
                        <MenuItem value="" disabled>Seleccione la sala</MenuItem>
                        <MenuItem value="sala1">Sala 1</MenuItem>
                        <MenuItem value="sala2">Sala 2</MenuItem>
                    </Select>
                </FormControl>
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
