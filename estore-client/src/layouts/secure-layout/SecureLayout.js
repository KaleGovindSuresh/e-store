import React from 'react';
import Header from '../../ui/header/Header';
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import { Link, Routes, Route } from "react-router-dom";

import AddProduct from "../../features/product/AddProduct";
import ListProducts from "../../features/product/ListProducts";

const SecureLayout = () => {
    return (
        <>
            <Header
                menuItems={
                    <Navbar.Collapse id="basic-navbar-nav">
                        <Nav className="me-auto">
                            <Nav.Link>
                                <Link className="text-light" to="/secured">
                                    Add Product
                                </Link>
                            </Nav.Link>
                            <Nav.Link>
                                <Link className="text-light" to="/secured/list-products">
                                    Product List
                                </Link>
                            </Nav.Link>
                            <Nav.Link>
                                <Link className="text-light" to="/">
                                    Logout
                                </Link>
                            </Nav.Link>
                        </Nav>

                    </Navbar.Collapse>
                }
            />

            <Routes>
                <Route path="" element={<AddProduct />} />
                <Route path="list-products" element={<ListProducts />} />
            </Routes>
        </>
    );
}

export default SecureLayout;