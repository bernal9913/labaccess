// src/components/NotFound.js

import React from 'react';
import { Box, Typography } from '@mui/material';
import remmysad from '../assets/commons/ratatouille-sad.gif'; // Asegúrate de tener el GIF en la carpeta correcta

const NotFound = () => {
	return (
		<Box
			display="flex"
			flexDirection="column"
			alignItems="center"
			justifyContent="center"
			height="100vh"
			textAlign="center"
		>
			<Typography variant="h1" component="div" gutterBottom>
				404
			</Typography>
			<Typography variant="h4" component="div" gutterBottom>
				Página no encontrada
			</Typography>
			<img src={remmysad} alt="Cargando..." style={{ width: '150px', height: '150px', margin: '20px 0' }} />
			<Typography variant="body1">
				Lo sentimos, la página que buscas no existe.
			</Typography>
		</Box>
	);
};

export default NotFound;
