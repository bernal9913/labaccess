// src/components/RegisterFrequentUser.js
import React, { useState } from 'react';
import { db } from '../firebase';

const RegisterFrequentUser = () => {
    const [name, setName] = useState('');
    const [initials, setInitials] = useState('');

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            await db.collection('frequentUsers').add({
                name,
                initials
            });
            alert('Usuario frecuente registrado exitosamente');
            setName('');
            setInitials('');
        } catch (error) {
            console.error('Error al registrar usuario frecuente: ', error);
        }
    };

    return (
        <form onSubmit={handleSubmit}>
            <h2>Registrar Usuario Frecuente</h2>
            <div>
                <label>Nombre</label>
                <input type="text" value={name} onChange={(e) => setName(e.target.value)} />
            </div>
            <div>
                <label>Iniciales</label>
                <input type="text" value={initials} onChange={(e) => setInitials(e.target.value)} />
            </div>
            <button type="submit">Registrar</button>
        </form>
    );
};

export default RegisterFrequentUser;
