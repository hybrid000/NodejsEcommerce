const express = require("express");
const router = express.Router();

const productController = require("../controllers/productController");

router.get("/:productId", productController.getProduct);

router.post("/:productId", productController.postReviews);

module.exports = router;
