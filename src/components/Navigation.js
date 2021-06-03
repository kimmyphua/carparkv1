import React from 'react';
import {Container, Nav, Navbar, } from "react-bootstrap";
import {NavLink} from "react-router-dom";
function Navigation() {
    return (
        <Navbar bg="light" expand="lg" variant="dark">
            <Container>

                <img style={ {width: "5%" }} src="https://i.imgur.com/yKpKiPIs.png"  />

                <Navbar.Toggle aria-controls="basic-navbar-nav" />
                <Navbar.Collapse id="basic-navbar-nav">
                    <Nav className="mx-3">
                        <NavLink to="/" className="highlight border border-1 text-dark nav-link mx-3">Home</NavLink>
                        <NavLink to="/mystruggles" className="highlight border border-1 text-dark nav-link">About</NavLink>

                    </Nav>
                </Navbar.Collapse>
                <Navbar.Brand className="text-dark" to="/" >♡ by kimberly</Navbar.Brand>
            </Container>

        </Navbar>
    );
}
export default Navigation;
