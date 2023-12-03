const express = require("express");
const router = express.Router();
router.get("/", (req, res) => {
    res.render("category", {activePage:"Categories"})
});

const productController = require('../controllers/productController');



router.get('/:categoryName', productController.getProductList);


module.exports = router;

