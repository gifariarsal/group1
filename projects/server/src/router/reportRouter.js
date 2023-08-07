const router = require("express").Router();
const {reportControllers} = require("../controller");
// const {verifyToken} = require("../middleware/");

router.get('/daily', reportControllers.getDaily); // ini untuk report daily
router.get('/sold',  reportControllers.getProductSold); // ini untuk report sold
router.get('/daily-sales',  reportControllers.getDailySalesAggregate);

module.exports = router