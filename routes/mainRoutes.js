const express = require('express');
const passport = require('passport');
const router = express.Router();

// Import the User model
const User = require('../models/user');

// Home route
router.get('/', (req, res) => {
    if (req.isAuthenticated()) {
        const username = req.user.username; // Use req.user to access the logged-in user
        return res.render('index', { activePage: 'Home', username });
    } else {
        // Handle non-authenticated users
        res.render('index', { activePage: 'Home' });
    }
});

// Seller route
router.get('/seller', (req, res) => {
    res.render('seller', { activePage: 'Seller' });
});

// Support route
router.get('/support', (req, res) => {
    res.render('support', { activePage: 'Support' });
});

// Login route
router.get('/login', (req, res) => {
    res.render('userLogin');
});

router.post('/login', (req, res, next) => {
    passport.authenticate('local', (err, user, info) => {
        if (err) {
            return next(err);
        }
        if (!user) {
            return res.redirect('/login');
        }

        // Log in the user and redirect with username
        req.logIn(user, (err) => {
            if (err) {
                return next(err);
            }
            const username = user.username; // Replace with the actual field name for the username
            return res.redirect(`/?username=${username}`);
        });
    })
});

router.get('/register', (req, res) => {
    res.render('userRegister', { error: null, username: '' });
});

router.post('/register', async (req, res, next) => {
    const { username, email, password } = req.body;

    try {
        // Check if email is already in use
        const existingUser = await User.findOne({ email });
        if (existingUser) {
            return res.render('userRegister', { error: 'Email is already in use', username, email });
        }

        // Create a new user
        const newUser = new User({ username, email });
        await User.register(newUser, password);

        // Log in the user after successful registration
        req.login(newUser, (err) => {
            if (err) {
                return next(err);
            }
            const username = newUser.username;
            return res.redirect(`/?username=${username}`);
        });
    } catch (err) {
        console.error(err);
        res.redirect('/register');
    }
});

// Logout route
router.get('/logout', (req, res) => {
    req.logout();
    res.redirect('/');
});

module.exports = router;
