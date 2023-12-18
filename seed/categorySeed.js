const connectdb = require("../db");
const mongoose=require("mongoose");
connectdb();

const Category = require("../models/category");
const Product = require("../models/product");

const createCategory = async () => {
    const categories = [
        { categoryName: "Laptops" },
        { categoryName: "Smartphones" },
        { categoryName: "Audio_Devices" },
        { categoryName: "Tablets" },
        { categoryName: "Accessories" },
        { categoryName: "Smart_Wearables" },
    ];

    try {
        const result = await Category.insertMany(categories);
        console.log("Categories created", result);
    } catch (error) {
        console.error("Error creating categories", error);
    }
};

// Uncomment the line below to create categories
// createCategory();

const linkProductsToCategories = async () => {
    try {
        // Get products for each category
        const laptopCategory = await Category.findOne({ categoryName: "Laptops" });
        const phonesCategory = await Category.findOne({ categoryName: "Smartphones" });
        const tabletsCategory = await Category.findOne({ categoryName: "Tablets" });
        const audioCategory = await Category.findOne({ categoryName: "Audio Devices" });
        const wearablesCategory = await Category.findOne({ categoryName: "Smart Wearables" });
        const accessoriesCategory = await Category.findOne({ categoryName: "Accessories" });

        const laptopProducts = await Product.find({ category: laptopCategory._id });
        const phonesProducts = await Product.find({ category: phonesCategory._id });
        const tabletsProducts = await Product.find({ category: tabletsCategory._id });
        const audioProducts = await Product.find({ category: audioCategory._id });
        const wearablesProducts = await Product.find({ category: wearablesCategory._id });
        const accessoriesProducts = await Product.find({ category: accessoriesCategory._id });

        await Category.findOneAndUpdate(
            { categoryName: "Laptops" },
            {
                $set: {
                    description: "These are our laptops",
                    categoryAllProducts: laptopProducts.map(product => product._id),
                },
            }
        );

        await Category.findOneAndUpdate(
            { categoryName: "Smartphones" },
            {
                $set: {
                    description: "These are our smartphones",
                    categoryAllProducts: phonesProducts.map(product => product._id),
                },
            }
        );

        await Category.findOneAndUpdate(
            { categoryName: "Smartphones" },
            {
                $set: {
                    description: "These are our smartphones",
                    categoryAllProducts: phonesProducts.map(product => product._id),
                },
            }
        );

        await Category.findOneAndUpdate(
            { categoryName: "Smartphones" },
            {
                $set: {
                    description: "These are our smartphones",
                    categoryAllProducts: phonesProducts.map(product => product._id),
                },
            }
        );

        await Category.findOneAndUpdate(
            { categoryName: "Smartphones" },
            {
                $set: {
                    description: "These are our smartphones",
                    categoryAllProducts: phonesProducts.map(product => product._id),
                },
            }
        );

        await Category.findOneAndUpdate(
            { categoryName: "Smartphones" },
            {
                $set: {
                    description: "These are our smartphones",
                    categoryAllProducts: phonesProducts.map(product => product._id),
                },
            }
        );

        // Now, populate the categoryAllProducts field
        const populatedCategories = await Category.find().populate('categoryAllProducts');

        console.log(populatedCategories);
    } catch (err) {
        console.error(err);
    } finally {
        // Close the connection after all operations
        mongoose.connection.close();
    }
};

// Call the function to link products to categories
// linkProductsToCategories();


const getProducts = async () => {
    const categoryName = "Laptops";

    // Find the category by name
    const category = await Category.findOne({ categoryName }).populate('categoryAllProducts');

    if (!category) {
        throw new Error('Category not found');
    }

    // Access the populated products
    const products = category.categoryAllProducts;

    return products;
};

const fetchAndLogProducts = async () => {
    try {
        const ans = await getProducts();
        console.log(ans);
    } catch (error) {
        console.error(error.message);
    }
};

// Call the asynchronous function
// fetchAndLogProducts();
