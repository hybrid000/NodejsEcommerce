const fs = require('fs').promises;
const path = require('path');
const Product = require("../models/product");
const Category = require("../models/category");


const getProduct = async (req, res) => {

    // Function to convert average rating to a color style
    const getBackgroundColorStyle = (averageRating) => {
        if (averageRating >= 4) return 'background-color: green';
        if (averageRating >= 3) return 'background-color: rgb(5, 189, 2)';
        if (averageRating >= 2) return 'background-color: rgb(240, 158, 4)';
        if (averageRating >= 1) return 'background-color: red';
        return 'background-color: grey'; // Default background color
    };

    // Function to calculate average rating
    const averageCalculator = (numbers) => {
        if (numbers.length === 0) return 0;
        const sum = numbers.reduce((acc, num) => acc + num, 0);
        return sum / numbers.length;
    };

    // Function to round numbers to one decimal place
    const roundToOneDecimalPlace = (number) => parseFloat(number.toFixed(1));

    try {
        const productId = req.params.productId;
        const product = await Product.findById(productId).populate('category');

        if (!product) {
            return res.status(404).json({ error: 'Product not found' });
        }

        const imgPath = `/resources/products/${product._id}`;
        const folderPath = path.join('public', 'resources', 'products', productId);

        // Function to read image files from the directory
        const filesReader = async (path) => {
            try {
                const files = await fs.readdir(path);
                return files;
            } catch (err) {
                console.error(err);
                throw err;
            }
        };

        const imgFiles = await filesReader(folderPath);
        console.log(imgFiles)
        const numberOfRatings = product.reviews.length;

        let numberOfReviews = 0;
        let averageRating = 0;
        product.reviews.forEach(element => {
            if (element.review) numberOfReviews++;
            averageRating += parseInt(element.rating);
        });

        averageRating = numberOfRatings > 0 ? averageRating / numberOfRatings : 0;

        const ratingTocomment = {
            1: "Pathetic",
            2: "Not good",
            3: "It's Okay",
            4: "Good",
            5: "Love it",
        }

        res.json({
            product,
            averageCalculator,
            roundToOneDecimalPlace,
            ratingTocomment,
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
        res.status(500).json({ error: `Internal Server Error: ${error.message}` });
    }
};


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

        res.json({ products: productsWithImages, categoryName });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: `Internal Server Error: ${error.message}` });
    }
};




const postReviews = async (req, res) => {
    try {

        if(req.isAuthenticated()){

        const productId = req.params.productId;
        const { rating, reviewText } = req.body;

        const product = await Product.findById(productId);

        if (!product) {
            return res.status(404).send("Product not found");
        }

        const newReview = {
            user: req.userame,
            rating,
            review: reviewText,
            reviewDate: new Date(),
        };

        product.reviews.push(newReview);
        await product.save();

        res.status(200).json({ product });

    }
    else{
        res.readdir('/user/login')
    }
    } catch (error) {
        console.error(error);
        res.status(500).send("Internal Server Error");
    }
};



const searchProducts= async (searchTerm)=>{
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

module.exports = { getProductList, getProduct, postReviews, searchProducts };
