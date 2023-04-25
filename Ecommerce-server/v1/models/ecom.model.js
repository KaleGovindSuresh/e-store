const mongoose = require("mongoose");
const AutoIncrement = require("mongoose-sequence")(mongoose);
const productSchema = new mongoose.Schema({
    productId: Number,
    title: String,
    brand: String,
    price: Number,
    category: String,
    desc: String,
    status: String,
    size: String,
    color: String,
    image: String,
});

productSchema.plugin(AutoIncrement, { inc_field: "productId" })

module.exports = mongoose.model("Product", productSchema);