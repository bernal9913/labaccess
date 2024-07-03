import React, { useState } from 'react';
import logo from "../ESCUDO-COLOR.png";
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import { Link } from 'react-router-dom';
import Drawer from '@mui/material/Drawer';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';
import Box from '@mui/material/Box';

const Navbar = () => {
    const [drawerOpen, setDrawerOpen] = useState(false);

    const toggleDrawer = (open) => (event) => {
        if (event.type === 'keydown' && (event.key === 'Tab' || event.key === 'Shift')) {
            return;
        }
        setDrawerOpen(open);
    };

    const drawerList = (
        <Box
            sx={{ width: 250 }}
            role="presentation"
            onClick={toggleDrawer(false)}
            onKeyDown={toggleDrawer(false)}
        >
            <List>
                <ListItem button component={Link} to="/">
                    <ListItemText primary="Inicio" />
                </ListItem>
                <ListItem button component={Link} to="/about">
                    <ListItemText primary="Sobre nosotros" />
                </ListItem>
                <ListItem button component={Link} to="/dashboard">
                    <ListItemText primary="Dashboard" />
                </ListItem>
                <ListItem button component={Link} to="/Registro">
                    <ListItemText primary="Registro de Entrada visitantes" />
                </ListItem>
                <ListItem button component={Link} to="/frequent-users">
                    <ListItemText primary="Usuarios Frecuentes" />
                </ListItem>
                <ListItem button component={Link} to="/Salidas">
                    <ListItemText primary="Registro de Salida visitantes" />
                </ListItem>
            </List>
        </Box>
    );

    return (
        <>
            <AppBar position="static" sx={{ backgroundColor: '#3f51b5' }}>
                <Toolbar>
                    <img src={logo} alt="Logo" style={{ marginRight: '10px', width: '40px', height: '40px' }} />
                    <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
                        Laboratorio de Análisis Experimental de la Conducta.
                    </Typography>
                    <IconButton
                        color="inherit"
                        aria-label="open drawer"
                        edge="end"
                        onClick={toggleDrawer(true)}
                        sx={{ display: { xs: 'block', md: 'none' } }}
                    >
                        <MenuIcon />
                    </IconButton>
                    <Box sx={{ display: { xs: 'none', md: 'block' } }}>
                        <Button color="inherit" component={Link} to="/">Inicio</Button>
                        <Button color="inherit" component={Link} to="/about">Sobre nosotros</Button>
                        <Button color="inherit" component={Link} to="/Registro">Registro de Entrada visitantes</Button>
                        <Button color="inherit" component={Link} to="/Salidas">Registro de Salida visitantes</Button>
                    </Box>
                </Toolbar>
            </AppBar>
            <Drawer
                anchor="right"
                open={drawerOpen}
                onClose={toggleDrawer(false)}
            >
                {drawerList}
            </Drawer>
        </>
    );
};

export default Navbar;
