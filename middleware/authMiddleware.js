const authUser = (req, res, next) => {
 
    if (req.isAuthenticated()) {
        res.locals.isAuthenticated = true;
        res.locals.username = req.user ? req.user.username : null;
    } else {
        res.locals.isAuthenticated = false;
        res.locals.username = null;
    }

    next();
};

module.exports = authUser;
