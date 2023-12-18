const mongoose = require('mongoose');

const reviewSchema = new mongoose.Schema({
    user: {
        // type: mongoose.Schema.Types.ObjectId,
        // ref: 'User',
        type:String,
    },
    rating: {
        type: Number,
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
    category: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Category',
    },
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
    stock: Number,
});

const Product = mongoose.model('Product', productSchema);

module.exports =Product;
