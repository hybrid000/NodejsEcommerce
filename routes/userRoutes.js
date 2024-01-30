const express = require('express');
const router = express.Router();
const cartAndorderController = require("../controllers/cartAndorderController");
const wishlistController = require("../controllers/wishlistController");
const userController = require("../controllers/userController");

const  zodValidation = require('../middleware/validationMiddleware.js');



// USER REALTED
router.get('/login', (req, res) => {
    if (req.isAuthenticated()) {
        res.redirect("/")
    } else {
        res.render('userLogin');
    }
});

router.get('/register', (req, res) => {
    res.render('userRegister');
});

router.post('/login', userController.loginFunction);

router.post('/register', zodValidation.validateRegistration, userController.registerFunction);



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

router.get("/orders", cartAndorderController.showOrders);


module.exports = router;