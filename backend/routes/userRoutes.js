const express = require('express');
const router = express.Router();
const cartAndorderController = require("../controllers/cartAndorderController");
const wishlistController = require("../controllers/wishlistController");
const userController = require("../controllers/userController");
const  zodValidation = require('../middleware/validationMiddleware.js');


router.get('/check-auth', (req, res) => {

    if (req.isAuthenticated()) {
        console.log(
            "triggered now"
        )
        res.json({ user: req.user });

    }
    else {
        console.log("not verified")
        res.status(401).json({ message: 'Not authenticated' });
    }
});
// USER REALTED
router.get('/login', (req, res) => {
    if (req.isAuthenticated()) {
        res.redirect("/")
    } else {
     
        res.redirect('/about');
    }
});
// In your server.js or routes/userRoutes.js

router.get('/check-auth', (req, res) => {

    if (req.isAuthenticated()) {
        console.log(
    "triggered now"
        )
        res.json({ user: req.user });

    }
    else{

        res.status(401).json({ message: 'Not authenticated' });
    }
});

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

router.get("/orders", cartAndorderController.showOrders);


module.exports = router;