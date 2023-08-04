const router = require("express").Router();

const { productControllers } = require("../controller");
const { multerUpload } = require("../middleware");

router.get("/product/:id", productControllers.getProductById);
router.get("/product", productControllers.getProduct);
router.post("/product", multerUpload.single("productImg"), productControllers.createProduct);
router.patch("/product/:id", multerUpload.single("productImg"), productControllers.updateProduct);
router.patch("/product/:id/deactivate", productControllers.deactivateProduct);
router.patch("/product/:id/activate", productControllers.activateProduct);

module.exports = router;
