import React from 'react';
import Header from '../../ui/header/Header';
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import { Link, Routes, Route } from "react-router-dom";
import Home from "../../features/home/Home"
import Catalog from '../../features/catalog/Catalog';
const BlankLayout = () => {
    return (
        <>
            <Header
                menuItems={
                    <Navbar.Collapse id="basic-navbar-nav">
                        <Nav className="me-auto">
                            <Nav.Link>
                                <Link className="text-light" to="/">
                                    Home
                                </Link>
                            </Nav.Link>
                            <Nav.Link>
                                <Link className="text-light" to="/catalog">
                                    Catalog
                                </Link>
                            </Nav.Link>
                            <Nav.Link>
                                <Link className="text-light" to="/secured">
                                    Login
                                </Link>
                            </Nav.Link>
                        </Nav>

                    </Navbar.Collapse>
                }
            />

            <Routes>
                <Route path="" element={<Home />} />
                <Route path="/catalog" element={< Catalog />} />
            </Routes>
        </>
    );
}
export default BlankLayout;