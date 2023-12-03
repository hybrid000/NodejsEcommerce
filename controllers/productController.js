const express = require("express");
const router = express.Router();
const fs = require('fs').promises;
const path = require('path');
const Product = require("../models/product");
const { set } = require("mongoose");

const getProductList = async (req, res) => {
    try {
        const categoryName = req.params.categoryName;
        const products = await Product.find({ category: categoryName });
        console.log(products);

        const productsWithImages = products.map(product => ({
            ...product.toObject(),
            imagePath: `/resources/products/${product._id}/img1.png`,
        }));

        res.render('productList', { products: productsWithImages, activePage: "Categories" });
    } catch (error) {
        console.error(error);
        res.status(500).send(`Internal Server Error: ${error.message}`);
    }
};

const getProduct = async (req, res) => {
    // function 
    const ratingTocomment = {
        1: "Pathetic",
        2: "Not good",
        3: "It's Okay",
        4: "Good",
        5: "Love it",
    };
    // function
    const averageCalculator = (numbers) => {

        if (numbers.length > 0) {

            const sum = numbers.reduce((acc, num) => acc + num, 0);

            const average = sum / numbers.length;

            return average;
        } else {
            return 0;
        }
    }
    // function
    const roundToOneDecimalPlace = (number) => {
        const roundedNumber = number.toFixed(1);
        return parseFloat(roundedNumber);
    }

    try {
        const productId = req.params.productId;
        const product = await Product.findById(productId);

        if (!product) {
            return res.status(404).send('Product not found');
        }

        res.render('product', { product, averageCalculator, roundToOneDecimalPlace, ratingTocomment });
    }
    catch (error) {
        console.error(error);
        res.status(500).send(`Internal Server Error: ${error.message}`);

    }
};
const postReviews = async (req, res) => {
    try{
    const getCurrentDate = () => {
        const currentDate = new Date();
        const options = { weekday: 'short', year: 'numeric', month: 'short', day: 'numeric' };

        return currentDate.toLocaleDateString('en-US', options);
    };

        const date = getCurrentDate();
        console.log(date); // Output: Sun, Dec 03, 2023

        

        const productId = req.params.productId;

        const ratings = req.body.ratings;
        const reviewText = req.body.reviewText;

        // Assuming you have a Mongoose model called Product
        const product = await Product.findById(productId);

        if (!product) {
            // Handle the case where the product is not found
            return res.status(404).send("Product not found");
        }

        // Assuming 'reviews' is an array field in your Product model
        const newReview = {
            user: "Sushant",
            rating: ratings,
            review: reviewText,
            reviewDate: date,
        };

        // Use $push to add the new review to the 'reviews' array
        await Product.updateOne({ _id: productId }, {
            $push: { reviews: newReview }
        });

        res.redirect(`/product/${productId}`);
    } catch (error) {
        console.log(error);
        res.status(500).send("Internal Server Error");
    }
};


module.exports = { getProductList, getProduct, postReviews };
