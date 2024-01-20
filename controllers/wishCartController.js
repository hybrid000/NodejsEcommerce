const User = require("../models/user")

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

            res.render('cart', { products: productsWithImages, totalPrice });
        } else {
            res.redirect('/user/login');
        }
    } catch (err) {
        console.error(err);
        res.status(500).send('Internal Server Error');
    }
};


const getWishlist = async (req, res) => {
    try {
        if (req.isAuthenticated()) {
            const userId = req.user._id;

            const foundUser = await User.findById(userId).populate({
                path: 'wishlist',
                model: 'Product',
            });

            const productsinWishlist = foundUser.wishlist; // Use foundUser.cart directly

            res.render('wishlist', { products: productsinWishlist })
        } else {
            res.redirect('/user/login');
        }
    } catch (err) {
        console.error(err);
        res.status(500).send('Internal Server Error');
    }
};

const addToWishlist = async (req, res) => {
    try {
        if (req.isAuthenticated()) {
            const userId = req.user._id;
            const userFound = await User.findById(userId);
            const productId = req.params.productId;

            // Check if the product already exists in the wishlist
            const isProductInWishlist = userFound.wishlist.includes(productId);

            if (!isProductInWishlist) {
                // If the product is not in the wishlist, add it
                userFound.wishlist.push(productId)
                await userFound.save();
                res.json({ message: 'Product added to wishlist'});
            } else {
                // If the product is already in the wishlist, remove it
                await User.updateOne({ _id: userId }, { $pull: { wishlist: productId } }); // Fix: Use userFound instead of User
                res.json({ message: 'Removed from wishlist'});
            }
        } else {
            res.redirect('/user/login');
        }
    } catch (error) {
        console.error('Error adding/removing product to/from wishlist:', error);
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
        } else {
            res.redirect('user/login');
        }
    } catch (error) {
        console.error('Error adding product to cart:', error);
        res.status(500).send('Internal Server Error');
    }
};

const wishlistCheck = async (req, res) => {
    console.log("triggered");
    try {
        const userId = req.user._id;
        const user = await User.findById(userId);
        const productId = req.params.productId;

        // Check if the product already exists in the wishlist
        const isProductInWishlist = user.wishlist.includes(productId);

        console.log(isProductInWishlist)

        // Return the result as JSON 
        res.json({ isProductInWishlist });

    } catch (error) {
        console.error('Error checking wishlist:', error);
        res.status(500).json({ error: 'Internal Server Error' });
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








module.exports = { getCart, addToCart, addToWishlist, getWishlist, wishlistCheck, deleteCartItem };