const mongoose = require("mongoose");
const dotenv = require('dotenv');
dotenv.config()
const connectdb = async () => {
    try {
        await mongoose.connect(process.env.MONGO_URI)
        console.log("DB connected successfully");
    } catch (err) {
        console.error(err);
    }
};

module.exports = connectdb;
