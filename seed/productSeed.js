const mongoose = require("mongoose");
const connectdb = require("../db");

async function createProducts() {
    try {
        // Connect to the database
        await connectdb();

        const Product = require("../models/product");
        const Category = require("../models/category");

        const laptopCategory = await Category.findOne({ categoryName: "Laptops" });
        const smartphoneCategory = await Category.findOne({ categoryName: "Smartphones" });
        const audiodevicesCategory = await Category.findOne({ categoryName: "Audio_Devices" });
        const smartwearablesCategory = await Category.findOne({ categoryName: "Smart_Wearables" });
        const accessoriesCategory = await Category.findOne({ categoryName: "Accessories" });
        const tabletsCategory = await Category.findOne({ categoryName: "Tablets" });


        const productEntry = [
            {
                productName: "Lenovo Ideapad Gaming 3",
                productPrice: 56000,
                discountedPrice: 48000,
                offers: ["10% off using ICICI card", "NO cost EMI upto 12 months"],
                category: laptopCategory, // Use the _id of the category
                description: "A crazy gaming laptop with powerful specs.",
                descriptionPoints: [
                    "Intel i5 10th Gen",
                    "Nvidia 1650",
                    "15 inch full backlit keyboard",
                ],
                warranty: "1 year warranty on product",
                reviews: [], // You can add reviews later if needed
                numberofOrders: 0,
                stock: 1000,
            },
            // Add more products if needed
        ];

        // Insert products and wait for the operation to complete
        await Product.insertMany(productEntry);
    } catch (error) {
        console.error('Error:', error);
    } finally {
        // Close the connection after all operations
        mongoose.connection.close();
    }
}

// Call the createProducts function
createProducts();
