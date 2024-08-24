const passport = require('passport');
const User = require('../models/user.js');
const bcrypt = require('bcrypt');


const registerFunction = async (req, res, next) => {
    try {
        const { username, email, password, confirmPassword } = req.body;

        if (password !== confirmPassword) {
            return res.status(400).json({ error: { confirmPassword: "Passwords do not match" } });
        }

        const existingUser = await User.findOne({ email });
        if (existingUser) {
            return res.status(400).json({ error: { email: "Email already exists" } });
        }

        const hashedPassword = await bcrypt.hash(password, 10);
        const newUser = new User({ username, email, password: hashedPassword });
        await newUser.save();

        req.login(newUser, (err) => {
            if (err) {
                console.error("Error during login:", err);
                return res.status(500).json({ error: { login: "An error occurred during login." } });
            }
            return res.status(200).json({ success: true }); 
        });
    } catch (error) {
        console.error("Unexpected error:", error);
        return res.status(500).json({ error: { unexpected: "An unexpected error occurred" } });
    }
};


const loginFunction = (req, res, next) => {

    passport.authenticate('custom-local', (err, user, info) => {
        if (err) {
            console.error(err);
            return res.status(500).json({ message: 'Internal Server Error' });
        }

        if (!user) {
            return res.status(401).json({ message: 'Invalid email or password' });
        }

        req.login(user, (err) => {
            if (err) {
                console.error(err);
                return res.status(500).json({ message: 'Login failed' });
            }
            return res.json({ success: true, redirect: '/' });
        });
    })(req, res, next);
};



const logoutFunction = (req, res, next) => {

    req.logout((err) => {
        if (err) { return next(err); }
        res.redirect('/');
    });
};


const userProfile = (req, res) => {
    if (req.isAuthenticated()) {
        // Send JSON response with user data
        res.json({
            username: req.user.username,
        });
    } else {
        // Send an error response if not authenticated
        res.status(401).json({ message: 'Unauthorized' });
    }
};


 

module.exports = { registerFunction, loginFunction, logoutFunction, userProfile};
