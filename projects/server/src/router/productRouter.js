const router = require("express").Router();

const { productControllers } = require("../controller");
const { multerUpload } = require("../middleware");

router.get("/product/:id", productControllers.getProductById);
router.get("/product", productControllers.getProduct);
router.post("/product", multerUpload.single("productImg"), productControllers.createProduct);

module.exports = router;
