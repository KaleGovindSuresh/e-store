// .env => npm i dotenv    for installation .env package
//npm i express
//npm i body-parser
// npm i cors
require("./v1/models/ecom.conn")
const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors")
require("dotenv").config();

const app = express();
const port = process.env.PORT || 8888;
app.use(cors());
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.static("uploads"));
app.use("/api/v1/products", require("./v1/routes/ecom.route"))

app.listen(port, () => {
    console.log(`Server is listening on port ${port}`);
});
