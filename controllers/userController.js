const passport = require('passport');
const User = require('../models/user.js');
const bcrypt = require('bcrypt');


const registerFunction = async (req, res, next) => {
    try {
        const { username, email, password, confirmPassword } = req.body;

        if (password !== confirmPassword) {
            return res.status(400).json({ error: "Passwords do not match" });
        }

        const hashedPassword = await bcrypt.hash(password, 10);
        const newUser = new User({ username, email, password: hashedPassword });
        await newUser.save();

        req.login(newUser, (err) => {
            if (err) {
                console.error("Error during login:", err);
                return res.status(500).json({ error: "An error occurred during login." });
            }
            return res.redirect('/');
        });
    } catch (error) {
        if (error.code === 11000) {
            return res.status(400).json({ error: "Email already exists" });
        }

        console.error("Unexpected error:", error);
        return res.status(500).json({ error: "An unexpected error occurred" });
    }
};


const loginFunction = (req, res, next) => {
    passport.authenticate('custom-local', (err, user, info) => {
        if (err) {
            console.error(err);
            return res.redirect('/user/login');
        }

        if (!user) {
            return res.redirect('/user/login');
        }

        req.login(user, (err) => {
            if (err) {
                console.error(err);
                return res.redirect('/user/login');
            }

            // Retrieve the returnTo value from the cookie
            const returnTo = req.cookies.returnTo || '/';

            res.clearCookie('returnTo');

            // Redirect the user to the returnTo value after successful login
            return res.redirect(returnTo);
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

        res.render("userProfile", {
            logoutFunction,
            username: req.user.username,
        })
    }
    else {
        res.redirect('/user/login')
   
    }


}

 

module.exports = { registerFunction, loginFunction, logoutFunction, userProfile};
