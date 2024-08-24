const User = require("../models/user")

const getOrders = async (req, res) => {
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

            res.json(userOrderArray);
        } catch (error) {
            console.error(error);
            res.status(500).json({ error: "Internal Server Error" });
        }
    } else {
        res.status(401).json({ error: "Not authenticated" });
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

            const productsWithImages = productsInCart.map(element => {
                const productTotalPrice = element.product.discountedPrice * element.quantity;
                totalPrice += productTotalPrice;

                return {
                    ...element.toObject(),
                    imagePath: `/resources/products/${element.product._id}/img1.png`,
                    totalProductPrice: productTotalPrice,
                };
            });

            res.status(200).json({ products: productsWithImages, totalPrice });
        } else {
            res.status(401).json({ message: 'User not authenticated' });
        }
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: 'Internal Server Error' });
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
                const quantity = req.body.quantity || 1;
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

                res.json({ message: "Item added to cart" });
            } else {
                res.json({ message: 'This item is already in your cart.' });
            }
        }
        else {
            res.redirect('/user/login');
        }
    } catch (error) {
        console.error('Error adding product to cart:', error);
        res.status(500).send('Internal Server Error');
    }
};

const deleteCartItem = async (req, res) => {
    try {
        if (req.isAuthenticated()) {
            const { productId } = req.params;
            const userId = req.user._id;

            const foundUser = await User.findById(userId);
            foundUser.cart = foundUser.cart.filter(item => !item.product.equals(productId));

            await foundUser.save();

            // Recalculate total price
            let totalPrice = 0;
            foundUser.cart.forEach(element => {
                totalPrice += element.product.discountedPrice * element.quantity;
            });

            res.status(200).json({ message: 'Item removed from cart', totalPrice });
        } else {
            res.status(401).json({ message: 'User not authenticated' });
        }
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: 'Internal Server Error' });
    }
};

const updateCart = async (req, res) => {
    try {
        if (req.isAuthenticated()) {
            const { productId } = req.params;
            const { quantity } = req.body;
            const userId = req.user._id;

            const foundUser = await User.findById(userId);
            const cartItem = foundUser.cart.find(item => item.product.equals(productId));

            if (cartItem) {
                cartItem.quantity = quantity;
                await foundUser.save();

                // Recalculate total price
                let totalPrice = 0;
                foundUser.cart.forEach(element => {
                    totalPrice += element.product.discountedPrice * element.quantity;
                });

                res.status(200).json({ totalPrice });
            } else {
                res.status(404).json({ message: 'Product not found in cart' });
            }
        } else {
            res.status(401).json({ message: 'User not authenticated' });
        }
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: 'Internal Server Error' });
    }
};





module.exports = { getCart, addToCart, deleteCartItem, updateCart, getOrders };