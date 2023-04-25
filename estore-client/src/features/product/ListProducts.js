import React, { useEffect, useState } from 'react';
import ProductService from '../../services/ProductService';
import Container from "react-bootstrap/Container";
import Table from '../../ui/table/Table';
const ListProducts = () => {
    const [products, setProducts] = useState([]);

    useEffect(() => {
        ProductService.fetchAllProduct().then((response) => {
            setProducts(response?.data?.data);
        });
    }, []);
    console.log(products);

    const columns = [
        {
            label: "Title",
            name: "title",
        },
        {
            label: "Brand",
            name: "brand",
        },
        {
            label: "Price",
            name: "price",
        },
        {
            label: "Size",
            name: "size",
        },
        {
            label: "Category",
            name: "category",
        },
        {
            label: "Color",
            name: "color",
        },
        {
            label: "Status",
            name: "status",
            custom: (row) => {
                return row.status == 1 ? "available" : "Out Of Stock";
            },
        },
    ];
    return (
        <>
            <Container>
                <h2>Product Listing</h2>
                <Table columns={columns} data={products} />
            </Container>
        </>
    );
}

export default ListProducts;