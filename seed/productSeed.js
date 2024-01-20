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
                productName: "APPLE 2020 Macbook Air M1 - (8 GB/512 GB SSD/Mac OS Big Sur) MGNE3HN/A (13.3 inch, Gold, 1.29 kg)",
                discountedPrice: 117900,
                productPrice: 120990,
                offers: [" No Cost EMI available "
                    , "Bank Offer 10% instant discount on ICICI Cards, up to ₹9,000 on orders of ₹1,0000 and aboveT&C"],
                category: laptopCategory, // Use the _id of the category
                description: "This Apple’s notebook is super slim and lightweight and can get charged quickly with the Apple M1 chip.Handle your projects at ease with the super fast 8-core CPU.Elevate your high- end games and graphics - intensive apps to the next level with its GPU of up to 8 - core.Powered with a 16 - core Neural Engine, accelerate your machine learning tasks with this laptop.This laptop is impressive with its fanless design and operates silently.Has a powerful battery capacity that can last up to 18 hours.Empower your day with this MacBook Air that is portable and is easy to carry around.",
                descriptionPoints: [
                    "Thin and Light Laptop",
                    "13.3 inch Quad LED Backlit IPS Display (227 PPI, 400 nits Brightness, Wide Colour (P3), True Tone Technology)",
                    "Upto 15 Hours",
                ],
                warranty: "1 Year Warranty + 1 Year Premium Care + 1 Year ADP",
                reviews: [],
                numberofOrders: 0,
                stock: 1000,
            },

            {
                productName: "REDMI Note 11 SE (Thunder Purple, 64 GB) (6 GB RAM)",
                productPrice: 16999,
                discountedPrice: 14999,
                offers: ["Get extra ₹2000 off (price inclusive of cashback/coupon)"
                    , "Freebie: Spotify Premium - 3M at ₹119"],
                category: smartphoneCategory, // Use the _id of the category
                description: "Discover new perspectives and take advantage of seamless performance with the Redmi Note 11 SE, which is packed with a number of exceptional features.The Helio G95 HyperEngine Game Technology, which powers this phone, enables spectacular gameplay and outstanding graphic quality.Also offering stutter- free streaming and fluid navigation is its 16.33 cm(6.42) Super AMOLED display.Moreover, the 64 MP quad - camera setup and 13 MP selfie camera on this smartphone provide speedy image processing while capturing stunning landscapes all around you.",
                descriptionPoints: [
                    "6 GB RAM | 64 GB ROM | Expandable Upto 512 GB", "6.33 cm (6.43 inch) Full HD+ Display", "Mediatek Helio G95 Octa Core Processor"
                ],
                warranty: "1 Year Warranty + 1 Year Premium Care + 1 Year ADP",
                reviews: [],
                numberofOrders: 0,
                stock: 1000,
            },


            {
                productName: "POCO X4 Pro 5G (Laser Black, 128 GB) (8 GB RAM)",
                productPrice: 21999,
                discountedPrice: 18999,
                offers: ["FreebieSpotify Premium - 12M at ₹699"
                    , "Special PriceGet extra ₹4000 off (price inclusive of cashback/coupon"],
                category: smartphoneCategory, // Use the _id of the category
                description: "Break the barriers holding back your creativity and explore your innovative side with the POCO X4 Pro 5G that is packed with incredible features.This smartphone features a 16.91 cm(6.67) 120 Hz Super AMOLED display with a touch sampling rate of 360 Hz delivering a silky smooth user experience.Furthermore, the triple camera set- up of this phone boasts a 64 MP main camera and an 8 MP Ultra - wide camera that expands the horizon to give a 118 - degree field of vision.Additionally, the POCO X4 Pro 5G comes with a 16 MP selfie camera that captures breathtaking selfies with incredible clarity.",
                descriptionPoints: [
                    "8 GB RAM | 128 GB ROM | Expandable Upto 1 TB",
                    "16.94 cm (6.67 inch) Full HD+ Super AMOLED Display",
                    "Qualcomm Snapdragon 695 5G Processor"
                ],
                warranty: "One Year for Handset, 6 Months for Accessories ",
                reviews: [],
                numberofOrders: 0,
                stock: 1000,
            },


            {
                productName: "APPLE iPad Pro 2021 (3rd Generation) 16 GB RAM 1 TB ROM 11 inches with Wi-Fi Only (Silver)",
                productPrice: 138999,
                discountedPrice: 131316,
                offers: ["Buy this Tablet & Get Extra ₹2400 Off on Microsoft Subscription"
                    , "Special PriceGet extra 2% off (price inclusive of cashback/coupon)"],
                category: tabletsCategory, // Use the _id of the category
                description: "Apple Ipad",
                descriptionPoints: [
                    "Apple M1 chip for next-level performance",
                    "Stunning 11-inch Liquid Retina display with ProMotion, True Tone, and P3 wide color",
                    "Stay connected with ultrafast Wi-Fi 6"
                ],
                warranty: "1 Year Warranty",
                reviews: [],
                numberofOrders: 0,
                stock: 1000,
            }, {
                productName: "realme TechLife Watch S100 1.69 HD Display with Temperature Sensor & Lightweight Smartwatch(Black Strap, Free Size)",
                productPrice: 2099,
                discountedPrice: 1499,
                offers: ["Partner OfferBuy this product and get upto ₹500 off on any android tablet"],
                category: smartwearablesCategory, // Use the _id of the category
                description: "Say hello to the new age trend with unique realme smartwatches.This watch comes with an attractive dial that lets you access minute details with flawless clarity.Additionally, this watch notifies you of every message, reminder, and latest news keeping you on par with the competition.Sporting an innovative PPG sensor you can seamlessly monitor your heart rate and blood oxygen levels with precision.",
                descriptionPoints: [
                    "4.3 cm(1.69 inch) TFT - LCD Super Bright HD Colour Display",
                    "Battery Life: Up to 12 days (depending on usage) ",
                    "24x7 Heart Rate Monitor | 110+ New Watch Faces"
                ],
                warranty: "1 Year Carry-in Warranty",
                reviews: [],
                numberofOrders: 0,
                stock: 1000,
            },
            {
                productName: "realme Buds Air 3 Neo with up to 30 hours Playback & Fast Charge Bluetooth Headset  (Starry Blue, True Wireless)",
                productPrice: 2999,
                discountedPrice: 1999,
                offers: ["Partner OfferBuy this product and get upto ₹500 off on any android tablet"],
                category: audiodevicesCategory, // Use the _id of the category
                description: "Enjoy flawless sound clarity and groove into your favourite song with the realme Air 3 Neo Bluetooth Headset that drives you towards excellence.This headset sports a 10 mm bass driver that delivers crisp vocals and exceptional bass, elevating your music experience.Furthermore, the AI- driven ENC technology eliminates the ambient noise and propels crystal clear communication.Moreover, with the exquisite audiovisual synchronisation of the realme Buds Air 3 Neo, you can seamlessly experience lag - free music and enjoy every nuance of your favourite song.",
                descriptionPoints: [
                    " Battery life: 30 hrs | Charging time: 2 hrs",
                    "10mm Bass Boost Drivers | Dolby Audio(on supported devices)",
                    "IPX5 Water Resistant | Super Low Latency Gaming Mode"
                ],
                warranty: "1 Year Carry-in Warranty",
                reviews: [],
                numberofOrders: 0,
                stock: 1000,
            },
            {
                productName: "HP KM300F Gaming Keyboard and Mouse Combo Combo Set",
                productPrice: 2999,
                discountedPrice: 1599,
                offers: ["Get No Cost EMI on IT and Gaming Accessories"],
                category: accessoriesCategory, // Use the _id of the category
                description:
                    "Stylish design, integrated metal panel, not easy to rust, scratch resistant",
                descriptionPoints: [
                    "Durable build quality",
                    "Braided cables and Compact Size",
                    
                ],
            warranty: "3 months Carry-in Warranty",
                reviews: [],
                numberofOrders: 0,
                stock: 1000,
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
