import React, { useState } from 'react';
import { db } from '../firebase';
import { doc, setDoc} from "firebase/firestore"

const EntryForm = () => {
    const [name, setName] = useState('');
    const [reason, setReason] = useState('');
    const [code, setCode] = useState('');

    const handleSubmit = async (e) => {
        e.preventDefault();
        const entryTime = new Date().getTime();
        const id = new Date().toISOString(); // Genera un ID basado en la fecha actual en formato ISO

        try {
            await setDoc(doc(db, 'entries', id), {
                name: name || code,
                reason,
                entryTime
            });
            alert('Entrada registrada exitosamente');
            setName('');
            setReason('');
            setCode('');
        } catch (error) {
            console.error('Error al registrar la entrada: ', error);
        }
    };

    return (
        <form onSubmit={handleSubmit}>
            <h2>Registro de Entrada</h2>
            <div>
                <label>Nombre</label>
                <input type="text" value={name} onChange={(e) => setName(e.target.value)} />
            </div>
            <div>
                <label>Razón de Entrada</label>
                <input type="text" value={reason} onChange={(e) => setReason(e.target.value)} />
            </div>
            <div>
                <label>Código</label>
                <input type="text" value={code} onChange={(e) => setCode(e.target.value)} />
            </div>
            <button type="submit">Registrar</button>
        </form>
    );
};

export default EntryForm;
