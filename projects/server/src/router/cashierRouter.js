const router = require("express").Router();

const { cashierControllers } = require('../controller');
const { verifyToken } = require("../middleware");

router.get("/cashier", cashierControllers.getCashiers);
router.get("/user", verifyToken, cashierControllers.getCashiersById);
router.patch("/cashier/activate", cashierControllers.cashierActive);
router.patch("/cashier/deactivate", cashierControllers.cashierInActive);

module.exports = router;