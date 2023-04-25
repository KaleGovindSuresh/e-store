import React, { useState } from 'react';

import FloatingLabel from "react-bootstrap/FloatingLabel";
import Form from "react-bootstrap/Form";
import Card from "react-bootstrap/Card";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Button from "react-bootstrap/Button";
import Image from "react-bootstrap/Image";

import ProductService from '../../services/ProductService';

const AddProduct = () => {
    const [product, setProduct] = useState({});
    const [previewImage, setPreviewImage] = useState("");


    const handleChange = (e) => {
        const { name, value } = e.target;
        setProduct({ ...product, [name]: value });
    };

    const handleImageChange = (e) => {
        // console.log(e);

        const file = e.target.files[0];
        setProduct({ ...product, image: file });
        //convert image to base64
        const reader = new FileReader();

        reader.addEventListener(
            "load",
            () => {
                //convert image file to base64 string
                setPreviewImage(reader.result);
            },
            false
        );
        if (file) {
            reader.readAsDataURL(file);
        }
    };

    const handleSubmit = (e) => {
        e.preventDefault();

        const fd = new FormData();
        for (const prop of Object.keys(product)) {
            fd.append(prop, product[prop]);
        }

        ProductService.createProduct(fd)
            .then((response) => {
                console.log(response);
                const message = response?.data?.message || "created the product";
                alert(message);
            })
            .catch((err) => {
                const message = err?.response?.data?.message || "could not created server"
                console.error(message);
            });
    };
    return (
        <>
            <Container className="mt-5">
                <Row className="justify-content-center">
                    <Col xs={6}>
                        <Card className="p-3">
                            <Card.Title className="text-center m-2 bg-primary text-white p-1">
                                Add Product
                            </Card.Title>
                            <Form onSubmit={handleSubmit}>
                                <FloatingLabel controlId="title" label="Title" className="mb-3">
                                    <Form.Control type="text" placeholder="product 1" name="title" value={product.title} onChange={handleChange} />
                                </FloatingLabel>
                                <FloatingLabel controlId="brand" label="Brand" className="mb-3">
                                    <Form.Control type="text" placeholder="Tata" name="brand" value={product.brand} onChange={handleChange} />
                                </FloatingLabel>
                                <FloatingLabel controlId="Rs." label="Rs." className="mb-3">
                                    <Form.Control type="number" placeholder="100" name="Rs." value={product.price} onChange={handleChange} />
                                </FloatingLabel>

                                <Row>
                                    <Col xs={12} md={6} className="p-1">
                                        <Form.Select aria-label="Category" name="category" value={product.category} onChange={handleChange} >
                                            <option value="">Select</option>
                                            <option value="Wheeler">Four Wheeler</option>
                                            <option value="Wheeler">Two Wheeler</option>
                                            <option value="laptop">Laptop</option>
                                            <option value="mobile">Mobile</option>
                                            <option value="shoes">Shoes </option>
                                            <option value="watches">Watches </option>
                                        </Form.Select>
                                    </Col>
                                    <Col xs={12} md={6} className="p-1">
                                        <Form.Select aria-label="Size" name="size" value={product.size} onChange={handleChange} >
                                            <option value="">Select</option>
                                            <option value="s">S</option>
                                            <option value="m">M</option>
                                            <option value="l">L</option>
                                        </Form.Select>
                                    </Col>
                                    <Col xs={12} md={6} className="p-1">
                                        <Form.Select aria-label="Color" name="color" value={product.color} onChange={handleChange} >
                                            <option value="">Select</option>
                                            <option value="blue">Blue</option>
                                            <option value="white">White</option>
                                            <option value="red">Red</option>
                                            <option value="gray">Gray</option>
                                            <option value="black">Black</option>
                                        </Form.Select>
                                    </Col>
                                    <Col xs={12} md={6} className="p-1">
                                        <Form.Select aria-label="Status" name="status" value={product.title} onChange={handleChange} >
                                            <option value="">Select</option>
                                            <option value="1">Available</option>
                                            <option value="0">Unavailable</option>
                                        </Form.Select>
                                    </Col>
                                </Row>
                                {/* description  */}
                                <Form.Group
                                    className="mb-3"
                                    controlId="exampleFrom.ControlTextarea1"
                                >
                                    <Form.Label>Decription</Form.Label>
                                    <Form.Control as="textarea" row={3} />
                                </Form.Group>

                                <div style={{ width: 150, height: 150 }} className="m-auto mb-5 position-relative">
                                    <Image thumbnail className="w-100 h-100"
                                        src={
                                            previewImage ? previewImage : "https://www.pngmart.com/files/15/Apple-iPhone-11-PNG-Clipart.png"
                                        } />
                                    <label htmlFor="image">
                                        <span className="position-absolute translate-middle top-0 start-100 rounded bg-primary text-white "
                                            style={{ cursor: "pointer", padding: "0px 3px" }} >
                                            <i className="fa-solid fa-cloud-arrow-up"></i>
                                        </span>
                                    </label>
                                </div>
                                <input type="file" id="image" className="d-none" onChange={handleImageChange} />
                                <Button type="submit">Submit</Button>
                            </Form>
                        </Card>
                    </Col>
                </Row>
            </Container>
        </>
    );
}

export default AddProduct;