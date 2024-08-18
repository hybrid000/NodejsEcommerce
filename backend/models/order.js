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
    paymentMethod: String,
    paymentStatus: {
        type: String,
        enum: ['Completed', 'Pending', 'Failed', 'Cash on Delivery'],
        default: 'Pending' // Optional: Set a default value if needed
    },

    shippingCost: {
        type: Number,
        default: 0,
    },

    transactionID: String,
    orderDate: {
        type: String,
        default: function () {
            const date = new Date();
            const day = date.getDate();
            const month = date.toLocaleString('default', { month: 'long' }); // Get full month name
            const year = date.getFullYear();
            return `${day} ${month} ${year}`;
        }
    },

    orderStatus: {
        type: String,
        enum:['Order Placed', 'Failed','Processing', 'Shipped', 'Out for Delivery', 'Delivered'],
        default: "Order Placed",
    },
    expectedDeliveryDate: String,
    deliveryDate: String
});

const Order = mongoose.model('Order', orderSchema);

module.exports = Order;
