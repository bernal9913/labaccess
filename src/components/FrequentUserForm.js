import React, { useState } from 'react';
import { db } from '../firebase';
import { collection, addDoc } from "firebase/firestore";

const FrequentUserForm = () => {
    const [name, setName] = useState('');
    const [role, setRole] = useState('');

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const docRef = await addDoc(collection(db, 'frequentUsers'), {
                name,
                role
            });
            alert(`Usuario frecuente registrado exitosamente con ID: ${docRef.id}`);
            setName('');
            setRole('');
        } catch (error) {
            console.error('Error al registrar el usuario frecuente: ', error);
        }
    };

    return (
        <div>
            <h2>Registrar Usuario Frecuente</h2>
            <form onSubmit={handleSubmit}>
                <div>
                    <label>Nombre</label>
                    <input
                        type="text"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        required
                    />
                </div>
                <div>
                    <label>Cargo</label>
                    <input
                        type="text"
                        value={role}
                        onChange={(e) => setRole(e.target.value)}
                        required
                    />
                </div>
                <button type="submit">Registrar</button>
            </form>
        </div>
    );
};

export default FrequentUserForm;
