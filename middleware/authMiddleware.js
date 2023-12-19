const passport = require('passport');
const passportLocalMongoose = require('passport-local-mongoose');

const authUser = (req, res, next) => {
    if (req.isAuthenticated) {
        res.locals.isAuthenticated = req.isAuthenticated();
        res.locals.username = req.isAuthenticated() ? req.user.username : null;
    }
    next();
};

module.exports = authUser;
