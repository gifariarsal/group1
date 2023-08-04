const router = require("express").Router();

const { cartControllers } = require("../controller");

router.post('/cart', cartControllers.createCart);

router.post('/cart-items', cartControllers.removeCartItem);

router.get('/cart-items', cartControllers.getAllCartItems);

router.post('/transaction', cartControllers.checkoutTransaction);

module.exports = router;