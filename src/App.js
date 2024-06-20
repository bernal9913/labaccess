import React, { useEffect, useState } from 'react';
import './App.css';
import { db } from './firebase';
import { collection, getDocs, query, where } from "firebase/firestore";
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import EntryForm from './components/EntryForm';
import ExitForm from './components/ExitForm';
import Home from './components/home';

function App() {
    const [entries, setEntries] = useState([]);

    const fetchEntries = async () => {
        console.log('Fetching entries...');
        const q = query(collection(db, "entries"), where("dentro", "==", true));
        try {
            const querySnapshot = await getDocs(q);
            const entriesArray = [];
            querySnapshot.forEach((doc) => {
                entriesArray.push({ id: doc.id, ...doc.data() });
            });
            setEntries(entriesArray);
            console.log('Entries fetched:', entriesArray);
        } catch (error) {
            console.error('Error fetching entries:', error);
        }
    };

    useEffect(() => {
        fetchEntries();
    }, []);

    return (
        <Router>
            <div className="App">
                <Routes>
                    <Route path="/" element={<Home />} />
                    <Route path="/Registro" element={<EntryForm />} />
                    <Route path="/Salidas" element={<ExitForm entries={entries} fetchEntries={fetchEntries} />} />
                </Routes>
            </div>
        </Router>
    );
}

export default App;
