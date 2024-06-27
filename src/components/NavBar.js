import React from 'react';
import logo from "../ESCUDO-COLOR.png";
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import { Link } from 'react-router-dom';

const Navbar = () => {
    return (
        <AppBar position="static" sx={{ backgroundColor: '#282c33' }}>
            <Toolbar>
                <img src={logo} alt="Logo" style={{ marginRight: '10px', width: '40px', height: '40px' }} />
                <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
                    Laboratorio de conducta experimental
                </Typography>
                <Button color="inherit" component={Link} to="/">Inicio</Button>
                <Button color="inherit" component={Link} to="/about">Sobre nosotros</Button>
                <Button color="inherit" component={Link} to="/dashboard">Dashboard</Button>
                <Button color="inherit" component={Link} to="/Registro">Registro de Entrada visitantes</Button>
                <Button color="inherit" component={Link} to="/Salidas">Registro de Salida visitantes</Button>

            </Toolbar>
        </AppBar>
    );
}

export default Navbar;
