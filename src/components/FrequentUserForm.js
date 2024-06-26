import React, { useState } from 'react';
import { db } from '../firebase';
import '../frequentuserform.css';
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
        <main className="main">
            <form className="form">
                    <div className="div">
                        <entry className="entry">
                            <h2>Registrar Usuario Frecuente</h2>
                            <form onSubmit={handleSubmit}>
                                <div className="div">
                                    <label className="text">Nombre</label>
                                    <input
                                        className="cuadro-text"
                                        type="text"
                                        placeholder="Ingresa tu nombre"
                                        value={name}
                                        onChange={(e) => setName(e.target.value)}
                                        required
                                    />
                                </div>
                                <div className="div">
                                    <label className="text">Cargo</label>
                                    <input
                                        className="cuadro-text"
                                        type="text"
                                        placeholder="Ingresa tu cargo"
                                        value={role}
                                        onChange={(e) => setRole(e.target.value)}
                                        required
                                    />
                                </div>
                                <button className="boton" type="submit">Registrar</button>
                            </form>
                        </entry>
                    </div>   
            </form>    
        </main>    
    );
};

export default FrequentUserForm;
