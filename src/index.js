import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import { createBrowserRouter } from 'react-router-dom';
import EntryForm from './components/EntryForm';
import ExitForm from './components/ExitForm';
import Home from './components/home';
import FrequentUserForm from "./components/FrequentUserForm";
import Dashboard from "./components/dashboard";

const router = createBrowserRouter([
    { path: "/", element: <Home /> },
    { path: "/Registro", element: <EntryForm /> },
    { path: "/Salidas", element: <ExitForm /> },
    { path: "/frequent-users", element: <FrequentUserForm/>},
    { path: "/dashboard", element: <Dashboard /> }
]);

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
    <React.StrictMode>
        <App />
    </React.StrictMode>
);
