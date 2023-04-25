// npm i mdb-react-ui-kit

import React from 'react';
import Container from "react-bootstrap/Container";
import Navbar from "react-bootstrap/Navbar";

const Header = ({ menuItems }) => {
    return (
        <>
            <Navbar bg="primary" variant="dark" expands="lg">
                <Container>
                    <Navbar.Brand href="#home">
                        <img alt="" src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQVnvSXQxMmpyPjgA_SETd50mb_APYjdiskPw&usqp=CAU" width="40" height="40" className="d-inline-block align-top rounded-circle" />
                        Online Store
                    </Navbar.Brand>
                    <Navbar.Toggle aria-controls="basic-navbar-nav" />
                    {menuItems}
                </Container>
                <section className='d-flex justify-content-center justify-content-lg-between border-bottom'>
                    <div className='me-5 d-none d-lg-block'>
                        <span>Get connected with us on social networks:</span>
                    </div>

                    <div className='d-flex '>
                        <a className=' text-reset m-1 p-1'>
                            <i class="fa-brands fa-facebook "></i>
                        </a>
                        <a className=' text-reset m-1 p-1'>
                            <i class="fa-brands fa-twitter"></i>
                        </a>
                        <a className=' text-reset m-1 p-1'>
                            <i class="fa-brands fa-square-instagram"></i>
                        </a>
                       
                    </div>
                </section>
            </Navbar>

        </>
    );
}

export default Header;