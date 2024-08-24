const express = require('express');
const router = express.Router();
const cartAndorderController = require("../controllers/cartController.js");
const wishlistController = require("../controllers/wishlistController");
const userController = require("../controllers/userController");
const  zodValidation = require('../middleware/validationMiddleware.js');

// User login, signup related
router.post('/login', userController.loginFunction);
router.post('/signup', zodValidation.validateRegistration, userController.registerFunction);
router.get('/logout', userController.logoutFunction);
router.get('/profile', userController.userProfile);

// USER CART REALTED
router.post('/cart/:productId', cartAndorderController.addToCart);
router.get('/cart', cartAndorderController.getCart);
router.patch('/updatecart/:productId', cartAndorderController.updateCart);
router.delete('/deletecart/:productId', cartAndorderController.deleteCartItem);


// USER WISHLIST REALTED
router.get('/wishlist', wishlistController.getWishlist);
router.post('/wishlist/:productId', wishlistController.addToWishlist);

// user order history related
router.get("/orders", cartAndorderController.getOrders);


module.exports = router;