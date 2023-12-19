const express = require('express');
const passport = require('passport');
const passportLocalMongoose = require('passport-local-mongoose');
const session = require('express-session');

const User = require('../models/user.js');

const passportSetup = (app) => {
    passport.use(User.createStrategy());
    passport.serializeUser(User.serializeUser());
    passport.deserializeUser(User.deserializeUser());

    // Initialize authentication middleware
    app.use(
        session({
            secret: 'systumm',
            resave: false,
            saveUninitialized: false,
        })
    );
    app.use(passport.initialize());
    app.use(passport.session());
};

module.exports = passportSetup;
