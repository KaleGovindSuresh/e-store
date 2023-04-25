const router = require("express").Router();
const path = require("path");
const multer = require("multer")

const { fetchAllProducts, fetchOneProduct, createProduct, updateProduct, deleteProduct, getConfig } = require("../controllers/ecom.controller");

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, "uploads/products")
    },
    filename: function (req, file, cb) {
        const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9)
        cb(null, file.fieldname + '-' + uniqueSuffix + path.extname(file.originalname)
        );
    }
})

const upload = multer({ storage: storage });


router.post("/", upload.single("image"), createProduct);
router.put("/:id", upload.single("image"), updateProduct);
router.get("/details", getConfig);
router.delete("/:id", deleteProduct);
router.get("/", fetchAllProducts);
router.get("/:id", fetchOneProduct);

module.exports = router;