import React from 'react';
import logo from "../assets/commons/escudo.png";
import imagen from '../assets/commons/rataestudio.png';
import imagen2 from '../assets/commons/servicio.png';
import { Container, Typography, Avatar, Box } from '@mui/material';

const home = () => {
    return (
      <Box sx={{ flexGrow: 1, backgroundColor: '#f0f4f8', minHeight: '100vh', display: 'flex', flexDirection: 'column' }}>
        <Box
          component="header"
          sx={{ textAlign: 'center', padding: 4, backgroundColor: '#fff', boxShadow: 1, marginBottom: 4 }}
        >
          <img src={logo} alt="logo" style={{ height: '100px', marginBottom: '16px' }} />
          <Typography variant="h4" component="h1" sx={{ color: '#3f51b5', marginBottom: 2 }}>
            Laboratorio de Análisis Experimental de la Conducta
          </Typography>
          <Typography variant="body1" sx={{ color: '#666' }}>
            Página de prueba para demostrar el diseño del Laboratorio de Conducta Experimental.
          </Typography>
        </Box>
        <Container component="main" sx={{ flex: 1, padding: 4 }}>
          <Box sx={{ 
                marginBottom: 4, 
                textAlign: 'center',                 
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center'
                }}
                >
            <Typography variant="h5" component="h2" sx={{ color: '#3f51b5', marginBottom: 2, }}>
              Nuestro Compromiso
            </Typography>
            <Typography variant="body1" sx={{ color: '#666', marginBottom: 2 }}>
              Brindar servicios y productos de calidad para nuestros clientes.
            </Typography>
            <Avatar src={imagen2} alt="imagen" style={{
                    marginRight: '10px',
                    borderRadius: 0,
                    width: '70px',
                    height: '70px'
                }} sx={{ mt: 2 }} />
          </Box>
          <Box id="mas-info" sx={{ 
                textAlign: 'center',
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center' }}>
            <Typography variant="h5" component="h2" sx={{ color: '#3f51b5', marginBottom: 2 }}>
              ¿Quiénes Somos?
            </Typography>
            <Typography variant="body1" sx={{ color: '#666' }}>
              Somos un laboratorio dedicado a estudios avanzados en conducta humana y animal...
            </Typography>
            <Avatar src={imagen} alt="imagen" style={{
                    marginRight: '10px',
                    borderRadius: 0,
                    width: '70px',
                    height: '70px'
                }} sx={{ mt: 2 }} />
          </Box>
        </Container>
      </Box>
    );
  }
  
export default home;