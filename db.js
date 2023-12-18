const mongoose = require("mongoose");

const connectdb = async () => {
    try {
        await mongoose.connect("mongodb+srv://slsadcbit:mjPRP6sdTYkIpfIT@justbuy.n33hygd.mongodb.net/JustBuy");
        console.log("DB connected successfully");
    } catch (err) {
        console.error(err);
    }
};

module.exports = connectdb;
