import React from 'react';
import { db } from '../firebase';
import { doc, updateDoc } from "firebase/firestore";

const ExitForm = ({ entries = [], fetchEntries }) => {
    const registerExit = async (id) => {
        //const exitTime = new Date().toISOString().slice(0, 16).replace('T', ' ');
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
        <div>
            <h2>Registros de Personas Dentro</h2>
            {entries.length === 0 ? (
                <p>Cargando datos o no hay registros disponibles...</p>
            ) : (
                <ul>
                    {entries
                        .filter(entry => entry.dentro)
                        .map((entry, index) => (
                            <li key={index}>
                                <p>Nombre: {entry.name}</p>
                                <p>Razón: {entry.reason}</p>
                                <p>Hora de Entrada: {entry.entryTime}</p>
                                <button onClick={() => registerExit(entry.id)}>Registrar Salida</button>
                            </li>
                        ))}
                </ul>
            )}
        </div>
    );
};

export default ExitForm;
