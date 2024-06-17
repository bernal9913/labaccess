//import logo from './logo.svg';
import logo from './ESCUDO-COLOR.png'
import './App.css';
import {BrowserRouter as Router, Routes, Route} from 'react-router-dom';
import EntryForm from "./components/EntryForm";
import ExitForm from "./components/ExitForm";
import Home from "./components/home";
import React from "react";

function App() {
    return (
        <Router>
            <div className="App">
                <Routes>
                    <Route path="/" element={<Home />} />
                    <Route path="/entryform" element={<EntryForm />} />
                    <Route path="/exitform" element={<ExitForm />} />
                </Routes>
            </div>
        </Router>
    );
}

export default App;