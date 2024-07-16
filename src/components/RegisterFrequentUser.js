import React, { useState } from 'react';
import { db } from '../apis/firebase';

const RegisterFrequentUser = () => {
    const [name, setName] = useState('');
    const [role, setRole] = useState('');

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            await db.collection('frequentUsers').add({
                name,
                role
            });
            alert('Usuario frecuente registrado exitosamente');
            setName('');
            setRole('');
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
                <label>Cargo</label>
                <input type="text" value={role} onChange={(e) => setRole(e.target.value)} />
            </div>
            <button type="submit">Registrar</button>
        </form>
    );
};

export default RegisterFrequentUser;
