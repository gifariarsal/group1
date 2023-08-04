const router = require("express").Router();

const { cashierControllers } = require('../controller')

router.get("/cashier", cashierControllers.getCashiers);
router.patch("/cashier/activate", cashierControllers.cashierActive);
router.patch("/cashier/deactivate", cashierControllers.cashierInActive);

module.exports = router;