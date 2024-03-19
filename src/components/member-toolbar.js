import React, {useState} from 'react';
import {Navbar, Nav, NavDropdown, Form, FormControl, Button, Tooltip, OverlayTrigger} from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import '../styles/global.scss'
import {Link} from "react-router-dom";
import {PersonFill} from "react-bootstrap-icons";
import {useBooksContext} from "../context/books-context";
import { useNavigate } from "react-router-dom";
import {useAuthContext} from "../context/auth-context";

const Toolbar = () => {

    const navigate = useNavigate();
    const [searchTerm, setSearchTerm] = useState('');
    const { searchBarResults, setSearchBarResults, fetchSearchBarResults, setSelectedBook, setBookResults } = useBooksContext();
    const { logout } = useAuthContext();

    const handleSearchChange = (e) => {
        const newSearchTerm = e.target.value;
        fetchSearchBarResults(newSearchTerm);
        setSearchTerm(newSearchTerm);
    };

    const handleSearchSubmit = (e) => {
        e.preventDefault();
        fetchSearchBarResults(searchTerm).then(data => {
            setBookResults(data);
            setSearchTerm('');
            setSearchBarResults([]);
        });
    };

    function showBookDetail(result) {
        setSearchTerm("");
        setSearchBarResults([]);
        navigate(`/${result.id}`);
        setSelectedBook(result);
    }

    function logoButtonClick(){
        setSelectedBook(undefined);
        setSearchTerm("");
        navigate("/");
    }

    return (
        <Navbar bg="primary" className="toolbar">
            <Navbar.Brand>
                <Button className="logo" onClick={() => logoButtonClick()}>
                    <span className="logo-left">Web</span>
                    <span className="logo-right">Lib</span>
                </Button>
            </Navbar.Brand>

            <Navbar.Toggle aria-controls="basic-navbar-nav" />

            <Navbar.Collapse id="basic-navbar-nav" className="navbar-collapse">
                <Form className="ms-4 w-75" onSubmit={handleSearchSubmit}>
                    <FormControl
                        type="text"
                        placeholder="Search"
                        className="mr-sm-2"
                        value={searchTerm}
                        onChange={handleSearchChange}
                    />
                    {searchTerm.length > 0 && (
                        <div className="autocomplete">
                            {searchBarResults.slice(0, 6).map((result, index) => (
                                <p onClick={() => showBookDetail(result)} key={index}>{result.title}</p>
                            ))}
                        </div>
                    )}
                </Form>
            </Navbar.Collapse>

            <Navbar.Collapse className="justify-content-end">
                <Nav>
                    <NavDropdown
                        className="dropdown-offset"
                        title={
                            <OverlayTrigger placement="bottom-start" overlay={
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
                        <NavDropdown.Item onClick={() => logout()} className="on-hover-danger dropdown-item dropdown-item-danger-bg">
                            Logout
                        </NavDropdown.Item>
                    </NavDropdown>
                </Nav>
            </Navbar.Collapse>
        </Navbar>
    );
};

export default Toolbar;