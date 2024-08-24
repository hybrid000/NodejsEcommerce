const express = require('express');
const router = express.Router();
const cartAndorderController = require("../controllers/cartController");
const productController = require('../controllers/productController');


router.get("/auth/check", (req, res) => {
    if (req.isAuthenticated()) {
        res.json({
            isAuthenticated: true,
            username: req.user.username
        });
    } else {
        res.json({
            isAuthenticated: false,
            username: null
        });
    }
});

router.get('/category/:categoryName', productController.getProductList);

router.post('/search', async (req, res) => {

    const { search } = req.body;

    try {
        const products = await productController.searchProducts(search);
        console.log(products);
        res.json({ products });

    } catch (error) {
        console.error(error);
        res.status(500).send('Server Error');
    }
});


module.exports = router;
