import React from 'react';
import { db } from '../firebase';
import { doc, updateDoc } from "firebase/firestore";
import { Button, Card, CardContent, Typography, List, ListItem, ListItemText, Avatar, CircularProgress } from '@mui/material';
import imagen from '../ratauser.png';

const ExitForm = ({ entries = [], fetchEntries }) => {
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
                    {entries.length === 0 ? (
                        <Typography variant="body1">Cargando datos o no hay registros disponibles...</Typography>
                    ) : (
                        <List>
                            {entries
                                .filter(entry => entry.dentro)
                                .map((entry, index) => (
                                    <ListItem key={index} alignItems="flex-start">
                                        <Avatar src={imagen} alt="imagen" style={{ marginRight: '10px' }} />
                                        <ListItemText
                                            primary={`Nombre: ${entry.name}`}
                                            secondary={
                                                <>
                                                    <Typography component="span" variant="body2" color="textPrimary">
                                                        Razón: {entry.reason}
                                                    </Typography>
                                                    <br />
                                                    Hora de Entrada: {entry.entryTime}
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
