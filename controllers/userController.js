const express = require('express');
const passport = require('passport');
const User = require('../models/user.js');
const bcrypt = require('bcrypt');

const registerFunction = async (req, res, next) => {
    const { username, email, password } = req.body;

    try {
        const hashedPassword = await bcrypt.hash(password, 10);
        const newUser = new User({ username, email, password: hashedPassword });

        await newUser.save();

        await req.login(newUser, (err) => {
            if (err) {
                return next(err);
            }

            return res.redirect('/');
        });
    } catch (err) {
        console.error(err);
        res.redirect('/register');
    }
};

const loginFunction = (req, res, next) => {
    passport.authenticate('custom-local', (err, user, info) => {
        if (err) {
            console.error(err);
            return res.redirect('/login');
        }

        if (!user) {
            return res.redirect('/login');
        }

        req.login(user, (err) => {
            if (err) {
                console.log(err);
                return res.redirect('/login');
            }

            return res.redirect('/');
        });
    })(req, res, next);
};

const logoutFunction = (req, res) => {
    req.logout();
    res.redirect('/');
};

module.exports = { registerFunction, loginFunction, logoutFunction };
