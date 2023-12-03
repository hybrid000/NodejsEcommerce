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
        const smartwearablesCategory = await Category.findOne({ categoryName: "Smart Wearables" });
        const accessoriesCategory = await Category.findOne({ categoryName: "Accessories" });
        const tabletsCategory = await Category.findOne({ categoryName: "Tablets" });


        const productEntry = [{
            productName: "Lenovo Ideapad Gaming 3",
            productPrice: 56000,
            discountedPrice: 48000,
            offer: ["10% off using ICICI card",
                "NO cost EMI upto 12 months"
            ],
            category: laptopCategory.categoryName,
            description: "A crazy crazy gaming laptops sdfkllkj lkdjsfkljd kdlsfjlksdfkk kfdj sjkdfllj kjldslfsdjkdjjfklsdklf sjklfdjk sdfkljsdklfdklfksdk sdf",
            descriptionPoints: [
                "Intel i5 10th Gen",
                "Nvidia 1650",
                "15 inch full backlit keyboard",

            ],
            warranty: "1 year warranty on product",
            reviews: [{
                user: "Johnny Sins",
                rating: 4,
                review:" daskfhkdsjfkl kljfkdsjkflj dlkfj kdj fk"

            },
            {
                user: "Susan Smith",
                rating: 5,
                review: " Goated Product kdjfklj f kdjfkdsfjjk jkdlsjflkj ljdfjdklj jlfdlk kldjfkld jdlfjkdlsj ",
            },
            {
                rating: 4
            },
            {
                rating: 5
            },
            {
                rating: 5
            },
            {
                rating: 4
            },
            {
                rating: 4
            }],
            numberofOrders: 10,
        },


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
