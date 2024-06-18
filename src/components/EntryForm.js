import React, { useState } from 'react';
import { db } from '../firebase';
import { doc, setDoc} from "firebase/firestore"
import '../EntryForm.css';

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
            <div className="div">
            <label className='text' for="fname">Nombre</label>
                <input className="cuadro-text" type="text" id="fname" name="firstname" placeholder="Ingresa tu nombre" value={name} onChange={(e) => setName(e.target.value)} />
            </div>
            <div className="div">
                <label className='text' for="reason">Razón de Entrada</label>
                <input className="cuadro-text" type="text" id="reason" name="razon" placeholder="Ingresa tu razón de entrada" value={reason} onChange={(e) => setReason(e.target.value)} />
            </div>
            <div className="div">
                <label className='text' for="code">Código</label>
                <input className="cuadro-text" type="text" id="code" name="codigo" placeholder="Ingresa el código" value={code} onChange={(e) => setCode(e.target.value)} />
            </div >
            <button type="submit" className="boton">Registrar</button>
        </form>
    );
};

export default EntryForm;
