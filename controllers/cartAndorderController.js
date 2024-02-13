const User = require("../models/user")
const Order = require("../models/order")

const stripe = require('stripe')("sk_test_51M6IM2SFS09Es6txKfm0VzTpJMZhI4NhUknRxjk8XKscatm5WnbdBxRsokEOEmwKaWMRijgR9lkqNlxiEf8tq4x900PGTm9ikm");


const paymentSuccess = async (req, res) => {
    try {
        const orderId = req.query.orderId;


        const user = await User.findById(req.user._id).populate('orders');


        const order = user.orders.find(order => order._id.equals(orderId));

        if (!order) {
            return res.status(404).json({ success: false, message: 'Order not found' });
        }


        order.orderStatus = 'Order Placed';
        order.paymentStatus = 'Completed';
        await order.save();

        // Redirect to a thank you page or any other page
        res.redirect('/user/orders');
    } catch (error) {
        console.error('Error:', error);
        res.status(500).json({ success: false, message: 'Failed to update order status' });
    }
};
const getCart = async (req, res) => {
    try {
        if (req.isAuthenticated()) {
            const userId = req.user._id;
            const foundUser = await User.findById(userId).populate({
                path: 'cart.product',
                model: 'Product',
            });

            let totalPrice = 0;
            const productsInCart = foundUser.cart;

            productsInCart.forEach(element => {
                totalPrice += element.product.discountedPrice * element.quantity;
            });

            const productsWithImages = productsInCart.map(element => ({
                ...element.toObject(),
                imagePath: `/resources/products/${element.product._id}/img1.png`,
            }));

            res.render('userCart', { products: productsWithImages, totalPrice });
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

const buyFn = async (req, res) => {

    if (req.isAuthenticated()) {

        const userId = req.user.id;
        const foundUser = await User.findById(userId).populate({
            path: 'cart.product',
            model: 'Product',
        });
        const products = foundUser.cart;
        res.render("buying", { products })
    }

    else {
        res.redirect('/user/login');
    }

}

const orderFn = async (req, res) => {
    try {
        const { address, paymentMethod, products } = req.body;

        if (paymentMethod === 'cashOnDelivery') {


            const newOrder = new Order({
                user: req.user._id,
                orderedProducts: products.map(item => ({ product: item.product._id, quantity: item.quantity })),
                address: address,
                paymentMethod: "Cash on Delivery",
                paymentStatus: "Pending",
                orderStatus: 'Order Placed',
            });

            await newOrder.save();

            await User.findByIdAndUpdate(req.user._id, { $push: { orders: newOrder._id } });
            const redirectUrl = '/user/orders'
            res.status(200).json({ redirect: redirectUrl });

        } else if (paymentMethod === 'payOnline') {

            const newOrder = new Order({
                user: req.user._id,
                orderedProducts: products.map(item => ({ product: item.product._id, quantity: item.quantity })),
                address: address,
                paymentMethod: "Online",
                paymentStatus: "Pending",

            });

            await newOrder.save();
            const orderId = newOrder._id;

            await User.findByIdAndUpdate(req.user._id, { $push: { orders: orderId } });


            const session = await stripe.checkout.sessions.create({
                payment_method_types: ['card'],
                line_items: products.map(product => ({
                    price: product.product.stripePriceId,
                    quantity: product.quantity
                })),
                mode: 'payment',
                success_url: `http://localhost:3000/payment-success?orderId=${orderId}`, // Redirect to success page after payment
                cancel_url: 'http://localhost:3000/user/cart',
            });

            const redirectUrl = `/checkout?sessionId=${session.id}`;
            res.status(200).json({ redirect: redirectUrl });

        }
    } catch (error) {
        console.error('Error:', error);
        res.status(500).json({ success: false, message: 'Failed to place order' });
    }
};

const showOrders = async (req, res) => {
    if (req.isAuthenticated()) {
        const userId = req.user.id;

        try {
            // Populate user's orders with product details
            const userFound = await User.findById(userId).populate({
                path: "orders",
                model: "Order",
                populate: {
                    path: 'orderedProducts.product',
                    model: 'Product'
                }
            });

            // Map each order's orderedProducts to include imagePath
            const ordersWithImages = userFound.orders.map(order => ({
                ...order.toObject(), // Convert order to plain object
                orderedProducts: order.orderedProducts.map(orderedProduct => ({
                    ...orderedProduct.toObject(), // Convert orderedProduct to plain object
                    product: {
                        ...orderedProduct.product.toObject(), // Convert product to plain object
                        imagePath: `/resources/products/${orderedProduct.product._id}/img1.png`
                    }
                }))
            }));
            const userOrderArray = ordersWithImages.reverse();
            res.render("userOrders", { orders: userOrderArray });
        } catch (error) {
            console.error(error);
            // Handle error
            res.status(500).send("Internal Server Error");
        }
    } else {
        res.redirect("/user/login");
    }
};




module.exports = { getCart, addToCart, deleteCartItem, updateCart, buyFn, orderFn, showOrders, paymentSuccess };