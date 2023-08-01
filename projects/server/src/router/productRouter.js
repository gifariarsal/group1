const router = require("express").Router();

const { productControllers } = require("../controller");
const { multerUpload, verifyToken } = require("../middleware");

router.get("/product", verifyToken, productControllers.getProduct);
router.get("/product/:id", verifyToken, productControllers.getProductById);
router.post("/product", multerUpload.single("productImg"), productControllers.createProduct);
router.patch("/product", multerUpload.single("productImg"), productControllers.updateProduct);
router.patch("/product/deactivate", productControllers.deactivateProduct);
router.patch("/product/activate", productControllers.activateProduct);

module.exports = router;
