import React from 'react';
import {Container, Nav, Navbar, } from "react-bootstrap";
import {NavLink} from "react-router-dom";
function Navigation() {
    return (
        <Navbar bg="light" expand="lg" variant="dark">
            <Container>

                <Navbar.Brand className="text-dark" to="/" >Where to Park?!</Navbar.Brand>
                <Navbar.Toggle aria-controls="basic-navbar-nav" />
                <Navbar.Collapse id="basic-navbar-nav">
                    <Nav className="me-auto">
                        <NavLink to="/" className="highlight text-dark nav-link">Home</NavLink>
                        <NavLink to="/mystruggles" className="highlight text-dark nav-link">About</NavLink>

                    </Nav>
                </Navbar.Collapse>
                <Navbar.Brand className="text-dark" to="/" >♡ by kimberly</Navbar.Brand>  </Container>

        </Navbar>
    );
}
export default Navigation;
