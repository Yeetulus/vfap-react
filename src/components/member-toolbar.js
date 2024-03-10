import React from 'react';
import { Navbar, Nav, NavDropdown, Form, FormControl, Button } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUser } from '@fortawesome/free-solid-svg-icons';
import 'bootstrap/dist/css/bootstrap.min.css';

const Toolbar = () => {
    return (
        <Navbar bg="light" expand="lg">
            <Navbar.Brand href="#home">
                <img
                    src="your-logo-url.png"
                    height="30"
                    className="d-inline-block align-top"
                    alt="Your Logo"
                />
            </Navbar.Brand>

            <Navbar.Toggle aria-controls="basic-navbar-nav" />

            <Navbar.Collapse id="basic-navbar-nav">
                <Form inline className="mx-auto">
                    <FormControl type="text" placeholder="Search" className="mr-sm-2" />
                    <Button variant="outline-success">Search</Button>
                </Form>
            </Navbar.Collapse>

            <Navbar.Collapse className="justify-content-end">
                <Nav>
                    <NavDropdown title={<FontAwesomeIcon icon={faUser} />} id="basic-nav-dropdown">
                        <NavDropdown.Item href="#action/1">Profile</NavDropdown.Item>
                        <NavDropdown.Item href="#action/2">Settings</NavDropdown.Item>
                        <NavDropdown.Divider />
                        <NavDropdown.Item href="#action/3">Logout</NavDropdown.Item>
                    </NavDropdown>
                </Nav>
            </Navbar.Collapse>
        </Navbar>
    );
};

export default Toolbar;
