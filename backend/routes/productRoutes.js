const express = require("express");
const router = express.Router();
const authCheck = require('../middleware/authMiddleware.js')
const productController = require("../controllers/productController");

router.get("/:productId", productController.getProduct);

router.post("/review/:productId", authCheck ,productController.postReviews);

module.exports = router;
