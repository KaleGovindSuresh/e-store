const e = require("cors");
const EcomProductModel = require("../models/ecom.model");
class EcomCtrl {
    static createProduct(req, res) {
        const product = req.body;
        console.log("File: ", req.file);

        if (req.file) product.image = `products/${req.file.filename}`;

        new EcomProductModel(product)
            .save()
            .then((result) => {
                res.status(201).send({ message: "Product Created..", data: result });
            })
            .catch((err) => {
                console.error(err);
                res.status(500)
                    .send({ message: "Could not created the product", error: err });
            });
    } //createProduct

    static updateProduct(req, res) {
        const { id } = req.params;
        const product = req.body;

        if (req.file) product.image = `products/${req.file.filename}`;

        EcomProductModel.findOneAndUpdate({ _id: id }, product, { new: true })
            .then((result) => {
                res.status(200).send({ message: "Product updated..", data: result });
            })
            .catch((err) => {
                console.error(err);
                res.status(500).send({ message: "Could not updated the product", error: err });
            });
    } //updateProduct

    static deleteProduct(req, res) {
        const { id } = req.params;
        EcomProductModel.findOneAndDelete({ _id: id })
            .then((result) => {
                res.status(200).send({ message: "Product deleted..", data: result });
            })
            .catch((err) => {
                console.error(err);
                res.status(500).send({ message: "Could not deleted the product", error: err });
            });
    } //deleteProduct

    static fetchOneProduct(req, res) {
        const { id } = req.params;
        EcomProductModel.findOne({ _id: id })
            .then((result) => {
                res.status(200).send({ message: "Product details..", data: result });
            })
            .catch((err) => {
                console.error(err);
                res.status(500).send({ message: "Could not fetch the product", error: err });
            });
    } //fetchOneProduct

    static fetchAllProducts(req, res) {
        const { category, size, color, sortby, q } = req.query;

        const categories = category ? category.split("_") : null;
        const sizes = size ? size.split("_") : null;
        const colors = color ? color.split("_") : null;

        let filter = {};
        const qExp = new RegExp(q, "i");
        if (q) {
            filter = { $or: [{ title: qExp }, { brand: qExp }] }
        }

        if (categories)
            filter.category = { $in: categories?.map((s) => new RegExp(s, "i")) };
        if (sizes) filter.size = { $in: sizes?.map((s) => new RegExp(s, "i")) };
        if (colors) filter.color = { $in: colors?.map((s) => new RegExp(s, "i")) };


        const sortObj = {};
        if (sortby == "lowtohigh") sortObj.price = 1;
        if (sortby == "hightolow") sortObj.price = -1;

        EcomProductModel.find(filter)
            .sort(sortObj)
            .then((result) => {
                res.status(200).send({ message: "Product details...", data: result });
            })
            .catch((err) => {
                console.error(err);
                res
                    .status(500)
                    .send({ message: "Cound not fetch the product", error: err });
            });
    } //fetchAllProduct

    //getConfig
    static getConfig(req, res) {
        EcomProductModel.find()
            .then((result) => {
                const categories = Array.from(
                    new Set(result.map((prod) => prod?.category?.toLocaleLowerCase()))
                );

                const sizes = Array.from(
                    new Set(result.map((prod) => prod?.size?.toLocaleLowerCase()))
                );
                const colors = Array.from(
                    new Set(result.map((prod) => prod?.color?.toLocaleLowerCase()))
                );

                res.status(200).send({
                    message: " details...",
                    data: { categories, sizes, colors },
                });
            })
            .catch((err) => {
                console.error(err);
                res.status(404).send({ message: "not available", error: err });
            });
    }
}

module.exports = EcomCtrl;
