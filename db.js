const mongoose = require("mongoose");

const connectdb = async () => {
    try {

        await mongoose.connect('mongodb://127.0.0.1/JustBuy');
        console.log("DB connected successfully");
    } 
    catch (err) {
        console.error(err);
    }
}
module.exports = connectdb;
