const fs = require('fs').promises;
const path = require('path');
const Product = require("../models/product");
const Category = require("../models/category");


const getProductList = async (req, res) => {
    try {
        const categoryName = req.params.categoryName;

        // Find the category by name to get its _id
        const category = await Category.findOne({ categoryName });

        if (!category) {
            return res.status(404).send('Category not found');
        }

        // Use the category _id to query products
        const products = await Product.find({ category: category._id });


        const productsWithImages = products.map(product => ({
            ...product.toObject(),
            imagePath: `/resources/products/${product._id}/img1.png`,
        }));

        res.render('productList', { products: productsWithImages, activePage: "Categories", categoryName });
    } catch (error) {
        console.error(error);
        res.status(500).send(`Internal Server Error: ${error.message}`);
    }
};


const getProduct = async (req, res) => {
    // function 
    const ratingTocomment = {
        1: "Pathetic",
        2: "Not good",
        3: "It's Okay",
        4: "Good",
        5: "Love it",
    };
    // function
    const averageCalculator = (numbers) => {

        if (numbers.length > 0) {

            const sum = numbers.reduce((acc, num) => acc + num, 0);

            const average = sum / numbers.length;

            return average;
        } else {
            return 0;
        }
    }
    // function
    const roundToOneDecimalPlace = (number) => {
        const roundedNumber = number.toFixed(1);
        return parseFloat(roundedNumber);
    }

    try {
        const productId = req.params.productId;
        const product = await Product.findById(productId).populate({
            path: 'category',
            model: 'Category',
        });

        if (!product) {
            return res.status(404).send('Product not found');
        }

        const imgPath = `/resources/products/${product._id}`;
        const folderPath = path.join('public', 'resources', 'products', productId);
        const filesReader = async (path) => {
            try {
                const files = await fs.readdir(path); // Using fs.promises to handle promises
                return files;
            } catch (err) {
                console.error(err);
                throw err;
            }
        };
        const imgFiles = await filesReader(folderPath); // Wait for the result of the asynchronous function

        const numberOfRatings = product.reviews.length;

        let numberOfReviews = 0;
        let averageRating = 0;
        product.reviews.forEach(element => {
            if (element.review) {
                numberOfReviews++;
            }
            averageRating += parseInt(element.rating);
        });

        averageRating = averageRating / product.reviews.length;

        const getBackgroundColorStyle = (averageRating) => {
            let backgroundColor;

            if (averageRating >= 4) {
                backgroundColor = 'background-color: green';
            } else if (averageRating >= 3) {
                backgroundColor = ' background-color:  rgb(5, 189, 2)';
            } else if (averageRating >= 2) {
                backgroundColor = 'background-color: rgb(240, 158, 4);';
            } else if (averageRating >= 1) {
                backgroundColor = 'background-color: red;';
            } else {
                backgroundColor = 'grey'; // Default background color if none of the conditions match
            }

            return backgroundColor;
        }


        res.render('product', {
            product,
            averageCalculator,
            roundToOneDecimalPlace,
            ratingTocomment,
            folderPath,
            imgPath,
            imgFiles,
            numberOfRatings,
            numberOfReviews,
            averageRating,
            getBackgroundColorStyle,
            productId
        });
    } catch (error) {
        console.error(error);
        res.status(500).send(`Internal Server Error: ${error.message}`);
    }

};
const postReviews = async (req, res) => {
    try {
        const getCurrentDate = () => {
            const currentDate = new Date();
            return currentDate;
        };

        const productId = req.params.productId;
        const ratings = req.body.rating;
        const reviewText = req.body.reviewText;

        // Assuming you have a Mongoose model called Product
        const product = await Product.findById(productId);

        if (!product) {
            // Handle the case where the product is not found
            return res.status(404).send("Product not found");
        }

        // Assuming 'reviews' is an array field in your Product model
        const newReview = {
            user: "Sushant",
            rating: ratings,
            review: reviewText,
            reviewDate: getCurrentDate(), // Call the function to get the current date
        };

        // Use $push to add the new review to the 'reviews' array
        await Product.updateOne({ _id: productId }, {
            $push: { reviews: newReview }
        });

        res.redirect(`/product/${productId}`);
    } catch (error) {
        console.log(error);
        res.status(500).send("Internal Server Error");
    }
};

// Assuming you have already imported your Product and Category models

async function searchProducts(searchTerm) {
    try {
        // Search by product name
        const productsByName = await Product.find({ productName: { $regex: searchTerm, $options: 'i' } }).populate('category');

        // Search by category name
        const category = await Category.findOne({ categoryName: { $regex: searchTerm, $options: 'i' } });
        const productsByCategory = category ? await Product.find({ category: category._id }).populate('category') : [];

        // Combine and return the results
        const combinedResults = [...productsByName, ...productsByCategory];
        console.log(combinedResults);
        return combinedResults;
    } catch (error) {
        console.error(error);
        throw new Error('Search failed');
    }
}

// // Example usage:
// searchProducts('searchTerm')
//     .then(products => console.log(products))
//     .catch(error => console.error(error));

module.exports = { getProductList, getProduct, postReviews, searchProducts};
