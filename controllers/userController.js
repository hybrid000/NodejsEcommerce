const express = require('express');
const passport = require('passport');
const passportLocalMongoose = require('passport-local-mongoose');
const User = require('../models/user');

const registerFunction = async (req, res, next) => {
    const { username, email, password } = req.body;

    try {
        // Create a new user instance
        const newUser = new User({ username, email, password });

        // Use Passport-local-mongoose register method to handle password encryption and storage
        await User.register(newUser, password, async (err, registeredUser) => {
            if (err) {
                console.error(err);
                // Handle registration error, you might want to redirect to the registration page
                return res.redirect('/register');
            }

            // Log in the registered user
            await req.login(registeredUser, (err) => {
                if (err) {
                    return next(err);
                }

                // Redirect to the home page or any desired location after successful registration
                return res.redirect('/');
            });
        });
    } catch (err) {
        // Handle any unexpected errors during registration
        console.error(err);
        res.redirect('/register');
    }
};

// Login an existing user
const loginFunction = (req, res, next) => {
    // Use Passport to authenticate the user
    passport.authenticate('local', (err, user, info) => {

        // If user authentication fails, redirect to the login page
        if (!user) {
            return res.redirect('/login');
        }

        // Log in the authenticated user
        req.login(user, (err) => {
            if (err) {
                return next(err);
            }


            // Redirect to the home page or any desired location after successful login
            return res.redirect('/');
        });
    })(req, res, next);
};


const logoutFunction = (req, res) => {
    req.logout();
    res.redirect('/');
};

module.exports = { registerFunction, loginFunction, logoutFunction };
