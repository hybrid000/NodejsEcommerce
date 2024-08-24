const express = require('express');
const dotenv = require('dotenv');
const path = require('path');
const mongoose = require('mongoose');
const passport = require('passport');
const session = require('express-session');
const bcrypt = require('bcrypt');
const LocalStrategy = require('passport-local').Strategy;
const User = require('./models/user.js');
const cookieParser = require('cookie-parser');
const mainRouter = require('./routes/mainRoutes.js');
const userRouter = require('./routes/userRoutes.js');
const productRouter = require('./routes/productRoutes.js');
const cors = require('cors');

dotenv.config();

const app = express();

// CORS configuration
const corsOptions = {
    origin: 'http://localhost:3000', // React app URL
    credentials: true, // Allow cookies to be sent and received
    optionsSuccessStatus: 200, // For legacy browser support
};

app.use(cors(corsOptions));

// Middleware to parse cookies
app.use(cookieParser());

// Serve static files
app.use('/resources', express.static(path.join(__dirname, 'public/resources')));

// Session Configuration
app.use(session({
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: false, // Only create sessions for logged-in users
    cookie: {
        httpOnly: true,
        secure: false, // Set to true if using HTTPS
        maxAge: 24 * 60 * 60 * 1000, // 1 day
    },
}));

// Passport Local Strategy for login
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

app.use(passport.initialize());
app.use(passport.session());

// Middleware to parse request bodies
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// Ensure authenticated middleware


// Routes
app.use('/', mainRouter);
app.use('/product', productRouter); // Protect product routes
app.use('/user', userRouter);

// Connect to database
const connectdb = async () => {
    try {
        await mongoose.connect(process.env.MONGO_URI);
        console.log('MongoDB connected successfully');
    } catch (err) {
        console.error(err);
    }
};

connectdb();

// Start the server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
