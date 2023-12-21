const express = require('express');
const passport = require('passport');
const User = require("../models/user")
const Product = require('../models/product')

const getCart = async (req, res) => {
    try {
        if (req.isAuthenticated()) {
            const userId = req.user._id;

            const foundUser = await User.findById(userId).populate({
                path: 'cart.product',
                model: 'Product',
            });

            const productsInCart = foundUser.cart; // Use foundUser.cart directly
            res.render('cart', { products: productsInCart });
        } else {
            res.redirect('/login');
        }
    } catch (err) {
        console.error(err);
        res.status(500).send('Internal Server Error');
    }
};


const getWishlist = async (req, res) => {
    try {
        if (req.isAuthenticated()) {
            const userId = req.user._id;

            const foundUser = await User.findById(userId).populate({
                path: 'wishlist',
                model: 'Product',
            });

            const productsinWishlist = foundUser.wishlist; // Use foundUser.cart directly
            console.log("your wishlist product", products);
            res.render('wishlist', { products: productsinWishlist })
        } else {
            res.redirect('/login');
        }
    } catch (err) {
        console.error(err);
        res.status(500).send('Internal Server Error');
    }
};

const addToCart = async (req, res) => {
    try {
        if (req.isAuthenticated()) {
            const userId = req.user._id;
            const productId = req.params.productId;

            // Assuming you have a quantity parameter in your request body
            const quantity = req.body.quantity || 1;

            // Update the user model to add the product to the cart array
            const updatedUser = await User.findByIdAndUpdate(
                userId,
                {
                    $addToSet: {
                        cart: {
                            product: productId,
                            quantity: quantity,
                        }
                    }
                },
                { new: true }
            );

            console.log('Product added to cart:', updatedUser);

            res.redirect('/user/cart');
        } else {
            res.redirect('/login');
        }
    } catch (error) {
        console.error('Error adding product to cart:', error);
        res.status(500).send('Internal Server Error');
    }
};

const addToWishlist = async (req, res) => {
    try {
        if (req.isAuthenticated()) {
            const userId = req.user._id;

            const productId = req.params.productId;

            const updatedUser = await User.findByIdAndUpdate(userId, {
                $addToSet: {
                    wishlist: productId
                }
            },
                { new: true }

            );
            console.log("added to wishlist", updatedUser)
            res.send("Added to wishlist");
        }
        else {
            res.redirect('/login');
        }
    }
    catch (error) {
        console.error('Error adding product to cart:', error);
        res.status(500).send('Internal Server Error');
    }

}



module.exports = { getCart, addToCart, addToWishlist, getWishlist };