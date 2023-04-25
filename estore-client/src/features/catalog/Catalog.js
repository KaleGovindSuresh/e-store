import React, { useEffect, useState } from "react";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Form from "react-bootstrap/Form";
import Col from "react-bootstrap/Col";
import Card from "react-bootstrap/Card";
import ProductService from "../../services/ProductService";
import { useSearchParams } from "react-router-dom";
import Product from "./Product";
const Catalog = () => {
    const [searchParams, setSearchParams] = useSearchParams();
    const [products, setProducts] = useState([]);
    const [configDetails, setConfigDetails] = useState({});
    const [initialFilters, setInitiailFilters] = useState({
        categories: [],
        sizes: [],
        colors: [],
    });

    const loadProductConfig = () => {
        ProductService.fetchConfig()
            .then((response) => {
                console.log(response);
                setConfigDetails(response?.data?.data);
            })
            .catch(console.error);
    };

    const loadProducts = (query) => {
        console.log("Query:", query);
        ProductService.fetchAllProduct(query)
            .then((response) => {
                setProducts(response?.data?.data);
            })
            .catch((err) => {
                console.error(err);
            });
    };

    const handleFilterChange = (name, value, checked) => {
        let paramValue = searchParams.get(name);
        console.log(checked);

        if (!checked) {
            const arr = paramValue.split("_")?.filter((v) => v != value);
            console.log("Array: ", arr);

            if (arr.length > 0) searchParams.set(name, arr.join("_"));
            else searchParams.delete(name);
        }

        if (checked && !paramValue?.includes(value)) {
            paramValue = paramValue?.length > 0 ? paramValue + "_" + value : value;
            searchParams.set(name, paramValue);
        }
        setSearchParams(searchParams);
    };

    const loadInitialFilters = () => {
        const categories = searchParams?.get("category")?.split("_");
        const sizes = searchParams?.get("size")?.split("_");
        const colors = searchParams?.get("color")?.split("_");

        setInitiailFilters({
            categories: categories ? categories : [],
            colors: colors ? colors : [],
            sizes: sizes ? sizes : [],
        });
    };

    const handlePriceSorting = (e) => {
        const { value } = e.target;
        if (value != "no") {
            searchParams.set("sortby", value);
        } else {
            searchParams.delete("sortby");
        }
        setSearchParams(searchParams);
    };

    const handleSearch = (e) => {
        const { value } = e.target;
        if (value?.length > 2) {
            searchParams.set("q", value) && searchParams.set("x", value);
        } else {
            searchParams.delete("q");
        }
        setSearchParams(searchParams);
    };

    useEffect(() => {
        loadProductConfig();
        loadProducts();
    }, []);

    useEffect(() => {
        loadInitialFilters();
        const query = searchParams.toString();
        loadProducts(query ? `?${query}` : "");
    }, [searchParams]);

    return (
        <Container>
            <Row>
                <Col xs={12} md={4} lg={3}>
                    <Card className="bg-info p-4">
                        <h4>Categories</h4>
                        <div className="overFlow-auto">
                            {Array.isArray(configDetails?.categories) &&
                                configDetails?.categories
                                    ?.filter((cat) => cat)
                                    .map((cat, i) => (
                                        <Form.Check
                                            key={cat + i}
                                            type="checkbox"
                                            checked={initialFilters?.categories?.includes(cat)}
                                            id={cat + i}
                                            label={cat}
                                            onChange={(e) =>
                                                handleFilterChange("category", cat, e?.target?.checked)
                                            }
                                        />
                                    ))}
                        </div>
                        <h4>Sizes</h4>
                        <div className="overFlow-auto">
                            {Array.isArray(configDetails?.sizes) &&
                                configDetails?.sizes
                                    ?.filter((cat) => cat)
                                    .map((size, i) => (
                                        <Form.Check
                                            key={size + i}
                                            type="checkbox"
                                            checked={initialFilters?.sizes?.includes(size)}
                                            id={size + i}
                                            label={size}
                                            onChange={(e) =>
                                                handleFilterChange("size", size, e?.target?.checked)
                                            }
                                        />
                                    ))}
                        </div>
                        <h4>Colors</h4>
                        <div className="overFlow-auto">
                            {Array.isArray(configDetails?.colors) &&
                                configDetails?.colors
                                    ?.filter((cat) => cat)
                                    .map((color, i) => (
                                        <Form.Check
                                            key={color + i}
                                            type="checkbox"
                                            checked={initialFilters?.colors?.includes(color)}
                                            id={color + i}
                                            label={color}
                                            onChange={(e) =>
                                                handleFilterChange("color", color, e?.target?.checked)
                                            }
                                        />
                                    ))}
                        </div>
                    </Card>
                </Col>

                <Col xs={12} md={8} lg={9}>
                    <div className="bg-info p-2 text-right d-flex justify-content-between align-items-center">
                        {/* search field  */}
                        <div>
                            <Form.Control
                                onChange={handleSearch}
                                type="search"
                                placeholder="search product..."
                            />
                        </div>
                        {/* sorting field  */}
                        <div style={{ maxWidth: 200 }}>
                            <Form.Select
                                aria-controls="Default Select example"
                                onChange={handlePriceSorting}
                            >
                                <option value="no">Sort by Price</option>
                                <option value="lowtohigh">Low to High</option>
                                <option value="hightolow">High to Low</option>
                            </Form.Select>
                        </div>
                    </div>
                    <section className="d-flex flex-wrap">
                        {Array.isArray(products) &&
                            products.map((prod) => <Product key={prod._id} {...prod} />)}
                    </section>
                </Col>
            </Row>
        </Container>
    );
};

export default Catalog;

