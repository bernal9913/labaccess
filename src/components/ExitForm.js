import React, { useEffect, useState } from 'react';
import { db } from '../apis/firebase';
import { doc, updateDoc } from "firebase/firestore";
import { Button, Card, CardContent, Typography, List, ListItem, ListItemText, Avatar, CircularProgress, Box } from '@mui/material';
import imagen from '../assets/commons/ratauser.png';
import hamsterRunning from '../assets/commons/loading-rat.gif';

const ExitForm = ({ entries = [], fetchEntries }) => {
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        if (entries.length > 0) {
            setLoading(false);
        }
    }, [entries]);

    const registerExit = async (id) => {
        let currentTime = new Date();
        const localTime = new Date(currentTime.getTime() - 7 * 60 * 60 * 1000); // Subtract 7 hours (in milliseconds)
        const exitTime = localTime.toISOString().slice(0, 16).replace('T', ' ');

        try {
            await updateDoc(doc(db, 'entries', id), {
                exitTime,
                dentro: false
            });
            fetchEntries(); // Fetch the updated entries
        } catch (error) {
            console.error('Error al registrar la salida: ', error);
        }
    };

    return (
        <main style={{ padding: '20px' }}>
            <Card>
                <CardContent>
                    <Typography variant="h4" gutterBottom>
                        Registros de Personas Dentro
                    </Typography>
                    {loading ? (
                        <Box display="flex" flexDirection="column" alignItems="center" justifyContent="center" height="300px">
                            <img src={hamsterRunning} alt="Cargando..." style={{ width: '150px', height: '150px' }} />
                            <Typography variant="body1" align="center">Cargando datos...</Typography>
                        </Box>
                    ) : entries.length === 0 ? (
                        <Typography variant="body1">No hay registros disponibles...</Typography>
                    ) : (
                        <List>
                            {entries
                                .filter(entry => entry.dentro)
                                .map((entry, index) => (
                                    <ListItem key={index} alignItems="flex-start">
                                        <Avatar src={imagen} alt="imagen" style={{ marginRight: '10px', borderRadius: 0 }} />
                                        <ListItemText
                                            primary={`Nombre: ${entry.name}`}
                                            secondary={
                                                <>
                                                    <Typography component="span" variant="body2" color="textPrimary">
                                                        Razón: {entry.reason}
                                                    </Typography>
                                                    <br />
                                                    Hora de Entrada: {entry.entryTime}
                                                    <br />
                                                    Sala: {entry.room}
                                                </>
                                            }
                                        />
                                        <Button
                                            variant="contained"
                                            color="primary"
                                            onClick={() => registerExit(entry.id)}
                                        >
                                            Registrar Salida
                                        </Button>
                                    </ListItem>
                                ))}
                        </List>
                    )}
                </CardContent>
            </Card>
        </main>
    );
};

export default ExitForm;
