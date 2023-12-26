const express = require('express');
const router = express.Router();
const wishCartController = require('../controllers/wishCartController')

const userController = require("../controllers/userController");


router.get('/login', (req, res) => {
    res.render('userLogin');
});

router.get('/register', (req, res) => {
    res.render('userRegister');
});

router.post('/login', userController.loginFunction);

router.post('/register', userController.registerFunction);

router.get('/logout', userController.logoutFunction);

router.get('/cart', wishCartController.getCart);

router.post('/cart/:productId', wishCartController.addToCart);

router.delete('/deletecart/:productId', wishCartController.deleteCartItem);

router.get('/wishlist', wishCartController.getWishlist);

router.post('/wishlist/:productId', wishCartController.addToWishlist);

// router.get("/checkwishlist/:productId",wishCartController.wishlistCheck);




module.exports = router;