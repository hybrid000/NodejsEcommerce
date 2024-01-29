const express = require('express');
const router = express.Router();
const cartAndorderController = require("../controllers/cartAndorderController");
const productController = require('../controllers/productController');


router.get('/', (req, res) => {
    res.render('index', { activePage: 'Home' });
    
});

router.get('/category/:categoryName', productController.getProductList);

router.get("/checkout", cartAndorderController.checkoutFn);

router.post("/order",cartAndorderController.orderFn)

router.get('/support', (req, res) => {
    console.log(req.originalUrl)
    res.render('support', {
        activePage: 'Support',
        contactAddressLink: 'https://www.google.com/maps/place/Lyon,+France/@45.7579211,4.7527293,12z/data=!3m1!4b1!4m6!3m5!1s0x47f4ea516ae88797:0x408ab2ae4bb21f0!8m2!3d45.764043!4d4.835659!16zL20vMGRwcmc?hl=fr&entry=ttu',
        contactNumber: 7088226647,
        contactAddress: 'Lyon',
        contactEmail: 'neekplaysitbest@gmail.com',


    })
});


router.post('/search', async (req, res) => {
    const { search } = req.body;

    try {
        const products = await productController.searchProducts(search);
        console.log(products);
        // Render your view with the found products
        res.render('search', { products });

    } catch (error) {
        console.error(error);
        res.status(500).send('Server Error');
    }
});


module.exports = router;
