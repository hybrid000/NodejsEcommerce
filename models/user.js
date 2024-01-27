const mongoose = require('mongoose');

const addressSchema = new mongoose.Schema({
    streetOne: String,
    streetTwo: String,
    city: String,
    state: String,
    pincode: Number,
    contactNumber: Number,
    altConntactNumber: Number,
});

const userSchema = new mongoose.Schema({
    username: { type: String, required: true },
    email: {
        type: String,
        required: true,
        unique: true,
    },
    password: {
        type: String,
        required: true,
    },
    orders: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Order' }],
    wishlist: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Product',
    }],
    cart: [
        {
            product: {
                type: mongoose.Schema.Types.ObjectId,
                ref: 'Product',
                required: true,
            },
            quantity: {
                type: Number,
                required: true,
            },
        }
    ],

    address: [addressSchema]
});

const User = mongoose.model('User', userSchema);

module.exports = User;
