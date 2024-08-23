import React from 'react';
import { useLocation } from 'react-router-dom';
import Navbar from './NavBar';
import NavbarDIPA from './NavbarDIPA';

function Layout({ children }) {
	const location = useLocation();

	const renderNavbar = () => {
		if (location.pathname.startsWith('/RegistroDIPA') ||
			location.pathname.startsWith('/entradaDIPA') ||
			location.pathname.startsWith('/SalidasDIPA') ||
			location.pathname.startsWith('/salidaDIPA') ||
			location.pathname.startsWith('/frequent-usersDIPA') ||
			location.pathname.startsWith('/dashboardDIPA')) {
			return <NavbarDIPA />;
		}
		return <Navbar />;
	};

	return (
		<>
			{renderNavbar()}
			<div className="App">
				{children}
			</div>
		</>
	);
}

export default Layout;
