const mongoose = require('mongoose');
const addressSchema = require('./address');

// Define a schema for ratings and comments
const ratingAndreviewSchema = new mongoose.Schema({
    productID: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Product',
        required: true,
    },
    rating: {
        type: Number,
        required: true,
    },
    comment: {
        type: String,
        required: true,
    },
});

// Define a schema for order items
const orderItemSchema = new mongoose.Schema({
    productID: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Product',
        required: true,
    },
    quantity: {
        type: Number,
        required: true,
    },
    // Additional product-related fields can be added here
});

// Define a schema for orders
const orderSchema = new mongoose.Schema({
    products: [orderItemSchema],
    // Additional order-related fields can be added here
});

// Define a schema for cart items
const cartItemSchema = new mongoose.Schema({
    productID: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Product',
        required: true,
    },
    quantity: {
        type: Number,
        required: true,
        default: 1,
    },
    // Additional cart-related fields can be added here
});

// Define a schema for wishlist items
const wishlistItemSchema = new mongoose.Schema({
    productID: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Product',
        required: true,
    },
    // Additional wishlist-related fields can be added here
});

// Define the main user schema
const userSchema = new mongoose.Schema({
    loginID: {
        type: String,
        required: true,
        unique: true,
    },
    email: {
        type: String,
        required: true,
        unique: true,
    },
    firstName: {
        type: String,
        required: true,
    },
    lastName: {
        type: String,
        required: true,
    },
    age: {
        type: Number,
        required: true,
    },
    ratingsAndreviews: [ratingAndreviewsSchema],
    orderHistory: [orderSchema],
    cart: [cartItemSchema],
    wishlist: [wishlistItemSchema],
    addresses: [{
        address: addressSchema,
        addressType: {
            type: String,
            enum: ['billing', 'shipping'],
            required: true,
        },
    }],
});

// Create the User model
const User = mongoose.model('User', userSchema);

// Export the User model
module.exports = User;
