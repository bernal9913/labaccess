import React from 'react';
import { db } from '../firebase';
import '../ExitForm.css';
import imagen from '../ratauser.png';
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
        <main className="main">
            <form className="form">
            <div className="div">
            <entry className="entry">
            <h2>Registros de Personas Dentro</h2> 
            {entries.length === 0 ? (
                <p>Cargando datos o no hay registros disponibles...</p>
            ) : (
                <ul className="list">
                    {entries 
                        .filter(entry => entry.dentro)
                        .map((entry, index) => (
                            <li key={index}>
                                <img className="img" src={imagen} alt="imagen"/>                  
                                <p><strong>Nombre:</strong> {entry.name}</p>
                                <p><strong>Razón:</strong> {entry.reason}</p>
                                <p><strong>Hora de Entrada:</strong> {entry.entryTime}</p>
                                <button className="button" onClick={() => registerExit(entry.id)}>Registrar Salida</button>
                            </li>
                        ))}
                </ul>
            )}
            </entry>
            </div>
            </form>
        </main>
    );
};

export default ExitForm;
