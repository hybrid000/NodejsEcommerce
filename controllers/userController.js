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
        res.redirect('/user/register');
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
                console.log(err);
                return res.redirect('/login');
            }

            return res.redirect('/');
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
        res.redirect('/user/login')
    }
    else {
        res.render("userProfile", {
            logoutFunction,
            username: req.user.username,
            order
        })
    }


}




module.exports = { registerFunction, loginFunction, logoutFunction, userProfile};
