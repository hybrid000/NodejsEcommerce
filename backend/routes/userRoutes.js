const express = require('express');
const router = express.Router();
const cartAndorderController = require("../controllers/cartController.js");
const wishlistController = require("../controllers/wishlistController");
const userController = require("../controllers/userController");
const  zodValidation = require('../middleware/validationMiddleware.js');
const authCheck = require('../middleware/authMiddleware.js')


// User login, signup related
router.post('/login', userController.loginFunction);
router.post('/signup', zodValidation.validateRegistration, userController.registerFunction);
router.get('/logout', userController.logoutFunction);
router.get('/profile',authCheck, userController.userProfile);

// USER CART REALTED
router.post('/cart/:productId', authCheck, cartAndorderController.addToCart);
router.get('/cart',authCheck, cartAndorderController.getCart);
router.patch('/updatecart/:productId',authCheck, cartAndorderController.updateCart);
router.delete('/deletecart/:productId',authCheck, cartAndorderController.deleteCartItem);


// USER WISHLIST REALTED
router.get('/wishlist', authCheck, wishlistController.getWishlist);
router.post('/wishlist/:productId', authCheck, wishlistController.addToWishlist);

// user order history related
router.get("/orders", authCheck, cartAndorderController.getOrders);


module.exports = router;