const passport = require('passport');


// just to show user name in webpages, if user is loggedin.


const authUser = (req, res, next) => {
    if (req.isAuthenticated()) {
        res.locals.isAuthenticated = true; // Set to true if authenticated
        res.locals.username = req.user ? req.user.username : null; // Check if user object exists
    } else {
        res.locals.isAuthenticated = false; // Set to false if not authenticated
        res.locals.username = null;
    }

    next();
};

module.exports = authUser;
