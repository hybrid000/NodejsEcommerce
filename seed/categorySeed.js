const connectdb = require("../db");

connectdb();

const Category = require("../models/category");
const Product = require("../models/product");


// Category.insertMany(
//     [
//         { categoryName: "Laptops" },
//         { categoryName: "Smartphones" },
//         { categoryName: "Audio_Devices" },
//         { categoryName: "Tablets" },
//         { categoryName: "Accessories" },
//         { categoryName: "Smart_Wearables" },
//     ]
// );
async function getProducts() {
    try {
        const laptopProducts = await Product.find({ category: "Laptops" });
        const phonesProducts = await Product.find({ category: "Smartphones" });
        const tabletsProducts = await Product.find({ category: "Tablets" });
        const audioProducts = await Product.find({ category: "Audio Devices" });
        const wearablesProducts = await Product.find({ category: "Smart Wearables" });
        const accessoriesProducts = await Product.find({ category: "Accessories" });

        await Category.findOneAndUpdate({ categoryName: "Laptops" }, {
            $set: {
                description: "These are our laptops",
                categoryAllProducts: laptopProducts
            }
        });

        await Category.findOneAndUpdate({ categoryName: "Smartphones" }, {
            $set: {
                description: "These are our smartphones",
                categoryAllProducts: phonesProducts
            }
        });

        await Category.findOneAndUpdate({ categoryName: "Audio Devices" }, {
            $set: {
                description: "These are our audio devices",
                categoryAllProducts: audioProducts
            }
        });

        await Category.findOneAndUpdate({ categoryName: "Tablets" }, {
            $set: {
                description: "These are our tablets",
                categoryAllProducts: tabletsProducts
            }
        });

        await Category.findOneAndUpdate({ categoryName: "Accessories" }, {
            $set: {
                description: "These are our accessories",
                categoryAllProducts: accessoriesProducts
            }
        });

        await Category.findOneAndUpdate({ categoryName: "Smart Wearables" }, {
            $set: {
                description: "These are our smart wearables",
                categoryAllProducts: wearablesProducts
            }
        });

    } catch (err) {
        console.error(err);
    }
}

// Call the function to execute it
getProducts();
