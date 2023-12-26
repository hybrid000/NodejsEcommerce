const passport = require('passport');
const session = require('express-session');
const customLocalStrategy = require('./strategy.js'); // Import the custom local strategy
const User = require('../models/user.js');
const dotenv = require('dotenv');
dotenv.config();


const passportSetup = (app) => {
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

    app.use(
        session({
            secret: process.env.SESSION_SECRET,
            resave: false,
            saveUninitialized: false,
        })
    );
    app.use(passport.initialize());
    app.use(passport.session());
};

module.exports = passportSetup;
