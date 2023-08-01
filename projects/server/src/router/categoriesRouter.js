const router = require("express").Router();

const { categoriesController } = require("../controller");


router.post("/category", categoriesController.createCategory);
router.patch("/category", categoriesController.updateCategory);

router.patch("/category/deactivate", categoriesController.deactivateCategory);
router.patch("/category/activate", categoriesController.activateCategory);

router.get("/category", categoriesController.getCategories);
router.get("/category/:id", categoriesController.getCategoryById);


module.exports = router;