// src/components/ExitForm.js
import React, { useState } from 'react';
import { db } from '../firebase';

const ExitForm = () => {
    const [name, setName] = useState('');

    const handleSubmit = async (e) => {
        e.preventDefault();
        const exitTime = new Date().getTime()

        try {
            const entries = await db.collection('entries')
                .where('name', '==', name)
                .orderBy('entryTime', 'desc')
                .limit(1)
                .get();

            if (!entries.empty) {
                const entryDoc = entries.docs[0];
                await db.collection('exits').add({
                    name,
                    entryTime: entryDoc.data().entryTime,
                    exitTime
                });
                alert('Salida registrada exitosamente');
                setName('');
            } else {
                alert('No se encontró una entrada correspondiente');
            }
        } catch (error) {
            console.error('Error al registrar la salida: ', error);
        }
    };

    return (
        <form onSubmit={handleSubmit}>
            <h2>Registro de Salida</h2>
            <div>
                <label>Nombre</label>
                <input type="text" value={name} onChange={(e) => setName(e.target.value)} />
            </div>
            <button type="submit">Registrar</button>
        </form>
    );
};

export default ExitForm;
