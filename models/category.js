const mongoose = require('mongoose');

const categorySchema = new mongoose.Schema({
    categoryName: {
        type: String,
        required: true,
        unique: true,
    },
    categoryDescription: String,

    categoryAllProducts: [{  
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Product',
    }],
});

const Category = mongoose.model('Category', categorySchema);

module.exports = Category;
