const User = require("../models/user")
const mongoose = require("mongoose");
const { Schema } = mongoose;
const { ObjectId } = Schema.Types;


const getCart = async (req, res) => {
    try {
        if (req.isAuthenticated()) {
            const userId = req.user._id;
            const foundUser = await User.findById(userId).populate({
                path: 'cart.product',
                model: 'Product',
            });

            console.log("triggered")

            let totalPrice = 0;
            const productsInCart = foundUser.cart;

            productsInCart.forEach(element => {
                totalPrice += element.product.discountedPrice * element.quantity;
            });

            const productsWithImages = productsInCart.map(element => ({
                ...element.toObject(),
                imagePath: `/resources/products/${element.product._id}/img1.png`,
            }));

            res.render('cart', { products: productsWithImages, totalPrice });
        } else {
            res.redirect('/user/login');
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

            const userFound = await User.findById(userId);

            // Check if the product is already in the cart
            const isProductInCart = userFound.cart.some(item => item.product.equals(productId));

            if (!isProductInCart) {
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

                res.json({ message: "item added to cart" });
            } else {
                res.json({ message: 'This item is already in your cart.' });
            }
        }
        else {
            console.log("user not logged in");
            // res.send("done")
            res.redirect('/user/login');
        }
    } catch (error) {
        console.error('Error adding product to cart:', error);
        res.status(500).send('Internal Server Error');
    }
};

const deleteCartItem = async (req, res) => {
    const userId = req.user._id;
    const productId = req.params.productId;

    try {

        const result = await User.updateOne(
            { _id: userId },
            { $pull: { 'cart': { product: productId } } }
        );

        if (result.nModified === 0) {
            return res.status(404).json({ error: 'Product not found in the cart' });
        }

        res.json({ message: 'Product deleted from cart' });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
};

const updateCart = async (req, res) => {
    try {
        const userId = req.user._id;
        const productId = req.params.productId;
        const newQuantity = req.body.quantity;
        console.log("quantity", newQuantity)
        // Update the cart asynchronously
        await User.updateOne(
            { _id: userId, 'cart.product': productId },
            { $set: { 'cart.$.quantity': newQuantity } }
        );

        // Retrieve the user after the update
        const foundUser = await User.findById(userId).populate({
            path: 'cart.product',
            model: 'Product',
        });

        // Calculate total price
        let totalPrice = 0;
        foundUser.cart.forEach(element => {
            totalPrice += element.product.discountedPrice * element.quantity;
        });

        res.json({ totalPrice });
    } catch (err) {
        console.error('Error updating quantity:', err);
        res.status(500).json({ error: 'Internal Server Error' });
    }
};

const checkoutFn = async (req, res) => {

    if (req.isAuthenticated()) {

        const productCheckout = req.params.productId;

        const user = req.user.id;
        console.log(`User ${user} is trying to checkout the product with id ${productCheckout}`);

        res.render("checkout", { product: productCheckout });
    }
    else {
        res.redirect('/user/login');
    }





}







module.exports = { getCart, addToCart, deleteCartItem, updateCart, checkoutFn };