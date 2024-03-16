import React from 'react';
import {Navbar, Nav, NavDropdown, Form, FormControl, Button, Tooltip, OverlayTrigger} from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import '../styles/global.scss'
import {Link} from "react-router-dom";
import {PersonFill} from "react-bootstrap-icons";

const Toolbar = () => {

    function logout() {
        console.log("Hello");
    }

    return (
        <Navbar bg="primary" className="toolbar">
            <Navbar.Brand>
                <Link to="/">
                    <Button className="logo">
                        <span className="logo-left">Web</span>
                        <span className="logo-right">Lib</span>
                    </Button>
                </Link>
            </Navbar.Brand>

            <Navbar.Toggle aria-controls="basic-navbar-nav" />

            <Navbar.Collapse id="basic-navbar-nav" className="navbar-collapse">
                <Form className="mx-auto">
                    <FormControl type="text" placeholder="Search" className="mr-sm-2" />
                </Form>
            </Navbar.Collapse>

            <Navbar.Collapse className="justify-content-end">
                <Nav>
                    <NavDropdown
                        className="dropdown-offset"
                        title={
                            <OverlayTrigger placement="bottom" overlay={
                                <Tooltip id="menu-tooltip">Open Menu</Tooltip>
                            }>
                                <span>
                                  <PersonFill className="dropdown-icon" />
                                </span>
                            </OverlayTrigger>
                        }
                        id="basic-nav-dropdown"
                        drop="down-centered"
                    >
                        <NavDropdown.Item as={Link} to="/loans" className="on-hover-primary dropdown-item dropdown-item-primary-bg">
                            Loans
                        </NavDropdown.Item>
                        <NavDropdown.Item as={Link} to="/reservations" className="on-hover-primary dropdown-item dropdown-item-primary-bg">
                            Reservations
                        </NavDropdown.Item>
                        <NavDropdown.Divider />
                        <NavDropdown.Item onClick={logout} className="on-hover-danger dropdown-item dropdown-item-danger-bg">
                            Logout
                        </NavDropdown.Item>
                    </NavDropdown>
                </Nav>
            </Navbar.Collapse>
        </Navbar>
    );
};

export default Toolbar;