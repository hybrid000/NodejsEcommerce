const mongoose = require('mongoose');

const reviewSchema = new mongoose.Schema({
    user: {
        type: String,  // You can use ObjectId if you have a separate User model
    },
    rating: {
        type: Number,
        required: true,
        min: 1,
        max: 5,
    },
    review: String,
    reviewDate: Date,
});

const productSchema = new mongoose.Schema({
    productName: {
        type: String,
        required: true,
    },
    productPrice: {
        type: Number,
        required: true,
    },
    discountedPrice: Number,
    offers: [{
        type: String,
    }],
    category: { type: String },
    description: {
        type: String,
        required: true,
    },
    descriptionPoints: [{
        type: String,
    }],
    warranty: String,
    reviews: [reviewSchema],
    numberofOrders: Number,
});

const Product = mongoose.model('Product', productSchema);

module.exports = Product;
