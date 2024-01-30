const express = require('express');
const dotenv = require('dotenv');
const mongoose = require("mongoose");
const passport = require('passport');
const session = require('express-session');
const bcrypt = require('bcrypt');
const LocalStrategy = require('passport-local').Strategy;
const User = require('./models/user.js');
const cookieParser = require('cookie-parser'); 

const mainRouter = require('./routes/mainRoutes.js');
const userRouter = require('./routes/userRoutes.js');
const productRouter = require('./routes/productRoutes.js');
const authMiddleware=require("./middleware/authMiddleware.js")

const app = express();

dotenv.config();

const connectdb = async () => {
    try {
        await mongoose.connect(process.env.MONGO_URI)
        console.log("mongoDB connected successfully");
    } catch (err) {
        console.error(err);
    }
};

connectdb();

const PORT = process.env.PORT;

app.set('view engine', 'ejs');
app.use(express.static('public'));
// Middleware to parse cookies
app.use(cookieParser());



// Custom passport local strategy
const customLocalStrategy = new LocalStrategy({ usernameField: 'email' }, async (email, password, done) => {
    try {
        const user = await User.findOne({ email: email });
        if (!user) {
            return done(null, false, { message: 'Incorrect email.' });
        }

        const passwordMatch = await bcrypt.compare(password, user.password);

        if (!passwordMatch) {
            return done(null, false, { message: 'Incorrect password.' });
        }

        return done(null, user);
    } catch (err) {
        return done(err);
    }
});

passport.use('custom-local', customLocalStrategy);

passport.serializeUser((user, done) => {
    done(null, user.id);
});

passport.deserializeUser(async (id, done) => {
    try {
        const user = await User.findById(id);
        done(null, user);
    } catch (err) {
        done(err);
    }
});

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.use(
    session({
        secret: process.env.SESSION_SECRET,
        resave: false,
        saveUninitialized: true,
    })
);
app.use(passport.initialize());
app.use(passport.session());

app.use(authMiddleware);


// Middleware to store previous URL in a cookie
app.use((req, res, next) => {
    if (!req.isAuthenticated() && req.url !== '/user/login' && req.url !== '/user/register') {
        res.cookie('returnTo', req.originalUrl, { maxAge: 90000, httpOnly: true });
    }
    next();
});

app.use('/', mainRouter);
app.use('/product', productRouter);
app.use('/user', userRouter);

// Login route


// Start the server
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
