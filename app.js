const express = require('express');
const mongoose = require('mongoose');
const passport = require('passport');
const passportLocalMongoose = require('passport-local-mongoose');
const session = require('express-session');
const connectdb = require('./db.js');
const mainRouter = require('./routes/mainRoutes.js');
const categoryRouter = require('./routes/categoryRoutes.js');
const productRouter = require('./routes/productRoutes.js');
const User = require('./models/user');

const app = express();
const PORT = 3000;

// Set EJS as the view engine
app.set('view engine', 'ejs');

// Parse URL-encoded bodies for form data
app.use(express.urlencoded({ extended: true }));

// Serve static files from the 'public' directory
app.use(express.static('public'));

app.use(
    session({
        secret: 'systumm',
        resave: false,
        saveUninitialized: false,
    })
);
app.use(passport.initialize());
app.use(passport.session());

// Passport configuration
passport.use(User.createStrategy());
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

connectdb();

app.use('/', mainRouter);
app.use('/category', categoryRouter);
app.use('/product', productRouter);

// Start the server
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
