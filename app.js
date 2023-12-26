const express = require('express');
const connectdb = require('./db.js');
const mainRouter = require('./routes/mainRoutes.js');
const categoryRouter = require('./routes/categoryRoutes.js');
const productRouter = require('./routes/productRoutes.js');
const authMiddleware = require('./middleware/authMiddleware');
const passportSetup = require('./middleware/passportSetup.js');
const dotenv=require('dotenv');
dotenv.config()

const userRouter=require('./routes/userRoutes.js');


const app = express();
const PORT = process.env.PORT;

// Set EJS as the view engine
app.set('view engine', 'ejs');

// Parse URL-encoded bodies for form data
app.use(express.urlencoded({ extended: true }));

// Serve static files from the 'public' directory
app.use(express.static('public'));


connectdb();
passportSetup(app);
// Authentication middleware for user
app.use(authMiddleware);


// Connect to the database
// Routers
app.use('/', mainRouter);
app.use('/category', categoryRouter);
app.use('/product', productRouter);
app.use('/user', userRouter);

// Start the server
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
