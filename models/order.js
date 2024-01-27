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

const orderSchema = new mongoose.Schema({
    user: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
    orderedProducts: [
        {
            product: { type: mongoose.Schema.Types.ObjectId, ref: 'Product' },
            quantity: Number,
        }

    ],
    address: addressSchema,
    status: {
        type: Boolean,
        default: false,
    },
    paymentMethod: String,
    paymentStatus: String,
    shippingCost: {
        type: Number,
        default: 0,
    },

    transactionID: String,
    orderDate: String,

    deliveryStatus: {
        type: String,
        default:"Order Placed",
    },
    expectedDeliveryDate: String,
    deliveryDate: String
});

const Order = mongoose.model('Order', orderSchema);

module.exports = Order;
