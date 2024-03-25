import React, {useEffect, useState} from 'react';
import {Navbar, Nav, NavDropdown, Tooltip, OverlayTrigger, Button} from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import '../../styles/global.scss'
import {PersonFill} from "react-bootstrap-icons";
import {Link, useNavigate} from "react-router-dom";
import {useAuthContext} from "../../context/auth-context";

const LibrarianToolbar = () => {

    const navigate = useNavigate();
    const { logout } = useAuthContext();
    const [isSmallScreen, setIsSmallScreen] = useState(window.innerWidth <= 768);

    useEffect(() => {
        const handleResize = () => {
            setIsSmallScreen(window.innerWidth <= 768);
        };
        window.addEventListener('resize', handleResize);
        return () => {
            window.removeEventListener('resize', handleResize);
        };
    }, []);

    function logoButtonClick(){
        navigate("/librarian");
    }

    return (
        <Navbar bg="primary" className="toolbar">
            <Navbar.Brand>
                <Button className="logo" onClick={() => logoButtonClick()}>
                    <span className="logo-left">Web</span>
                    <span className="logo-right">Librarian</span>
                </Button>
            </Navbar.Brand>

            {!isSmallScreen && (
                <Nav className="me-auto">
                    <Link to="/librarian/books" className="text-white text-decoration-none text-clickable-grey me-4">
                        Books
                    </Link>
                    <Link to="/librarian/copies" className="text-white text-decoration-none text-clickable-grey me-4">
                        Copies
                    </Link>
                    <Link to="/librarian/authors" className="text-white text-decoration-none text-clickable-grey me-4">
                        Authors
                    </Link>
                    <Link to="/librarian/genres" className="text-white text-decoration-none text-clickable-grey me-4">
                        Genres
                    </Link>
                    <Link to="/librarian" className="text-white text-decoration-none text-clickable-grey">
                        Loans
                    </Link>
                </Nav>
            )}

            <Navbar.Collapse className="justify-content-end">
                {isSmallScreen? (
                    <Nav>
                        <NavDropdown
                            className="dropdown-offset"
                            title={
                                <OverlayTrigger
                                    placement="bottom-start"
                                    overlay={<Tooltip className={'tooltip-width'} id="menu-tooltip">Open Menu</Tooltip>}
                                >
                                    <span>
                                        <PersonFill className="dropdown-icon" />
                                    </span>
                                </OverlayTrigger>
                            }
                            id="basic-nav-dropdown"
                            drop="down-centered"
                        >
                            <NavDropdown.Item className={"text-clickable-primary"}>Books</NavDropdown.Item>
                            <NavDropdown.Divider />
                            <NavDropdown.Item onClick={() => logout()} className="on-hover-danger dropdown-item dropdown-item-danger-bg">
                                Logout
                            </NavDropdown.Item>
                        </NavDropdown>
                    </Nav>
                ) : (
                    <Nav className={"me-1"}>
                        <OverlayTrigger
                            placement="bottom-start"
                            overlay={<Tooltip className={'tooltip-width'} id="menu-tooltip">Logout</Tooltip>}
                        >
                            <span onClick={() => logout()}>
                                <PersonFill className="clickable dropdown-icon" />
                            </span>
                        </OverlayTrigger>
                    </Nav>
                )}
            </Navbar.Collapse>
        </Navbar>
    );
};

export default LibrarianToolbar;