import React from 'react';
import { Navbar, NavbarBrand, Nav, Button } from 'shards-react';

const AppNav = (props) => {
	const { userName, logout } = props;
	return (
	<Navbar type="dark" theme="primary" expand="md" className="mb-2">
		<NavbarBrand href="#">React Boilerplate</NavbarBrand> 
		{ !!userName &&
		<Nav navbar className="ml-auto"><Button theme="secondary" onClick={logout}>Logout {userName}</Button></Nav>
		}
	  </Navbar>
	)
}

export default AppNav;