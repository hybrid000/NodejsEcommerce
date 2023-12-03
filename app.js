const express = require("express");
const mongoose = require("mongoose");

const app = express();
const connectdb = require("./db.js");
connectdb();
const PORT = 3000;

// Set EJS as the view engine
app.set("view engine", "ejs");

// Parse URL-encoded bodies for form data
app.use(express.urlencoded({ extended: true }));

// Serve static files from the 'public' directory
app.use(express.static("public"));




const indexRouter = require('./routes/homeRoutes.js');
const categoryRouter = require('./routes/categoryRoutes.js');
const userRouter = require('./routes/userRoutes.js')
const productRouter=require("./routes/productRoutes.js")


app.use('/', indexRouter);
app.use('/category', categoryRouter);
app.use('/user', userRouter);
app.use('/product',productRouter);



// Start the server
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
