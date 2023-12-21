const express = require('express');
const router = express.Router();
const wishCartController = require('../controllers/wishCartController')

// router.get('/wishlist', wishCartController.getWishlist);


router.post('/wishlist/:productId', wishCartController.addToWishlist);
router.get('/wishlist', wishCartController.getWishlist);
router.get('/cart', wishCartController.getCart);

router.post('/cart/:productId', wishCartController.addToCart);

module.exports = router;