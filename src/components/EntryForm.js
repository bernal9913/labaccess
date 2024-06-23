import React, { useState } from 'react';
import { db } from '../firebase';
import { doc, setDoc } from "firebase/firestore";
import '../EntryForm.css';
import { Link } from 'react-router-dom';

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
            alert('Entrada registrada exitosamente');
            setName('');
            setReason('');
            setCode('');
            fetchEntries(); // Fetch the updated entries
        } catch (error) {
            console.error('Error al registrar la entrada: ', error);
        }
    };

    return (
        <main className="main">
            <form className="form" onSubmit={handleSubmit}>
                <h2 className="h2">Registro de Entrada</h2>
                <div className="div">
                    <label className='text' htmlFor="fname">Nombre</label>
                    <input
                        className="cuadro-text"
                        type="text"
                        id="fname"
                        name="firstname"
                        placeholder="Ingresa tu nombre"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                    />
                </div>
                <div className="div">
                    <label className='text' htmlFor="reason">Razón de Entrada</label>
                    <input
                        className="cuadro-text"
                        type="text"
                        id="reason"
                        name="razon"
                        placeholder="Ingresa tu razón de entrada"
                        value={reason}
                        onChange={(e) => setReason(e.target.value)}
                    />
                </div>
                <div className="form-actions">
                    <button type="submit" className="boton">Registrar</button>
                    <button type="button" className="boton">
                        <Link to="/">Regresar</Link>
                    </button>
                </div>
            </form>
        </main>
    );
};

export default EntryForm;
