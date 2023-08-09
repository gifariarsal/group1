const router = require("express").Router();

const { cartController } = require("../controller");
const { verifyToken } = require("../middleware");

router.post('/cart', verifyToken, cartController.createCart);

router.patch('/cart', verifyToken, cartController.removeCartItem);

router.delete('/items/:id',  cartController.deleteItem);

router.patch('/items/:id', cartController.updateCartItem);

router.get('/cart', verifyToken, cartController.getAllCartItems);

router.post('/payment', verifyToken, cartController.checkout);

module.exports = router;