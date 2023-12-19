const express = require('express');
const router = express.Router();
const userController = require("../controllers/userController");

router.get('/', (req, res) => {
    res.render('index', { activePage: 'Home' });
});

router.get('/login', (req, res) => {
    res.render('userLogin');
});

router.get('/register', (req, res) => {
    res.render('userRegister');
});

router.post('/login', userController.loginFunction);

router.post('/register', userController.registerFunction);

router.get('/logout', userController.logoutFunction);

router.get('/seller', (req, res) => {
    res.render('seller', { activePage: 'Seller' });
});

router.get('/support', (req, res) => {
    res.render('support', { activePage: 'Support' });
});

module.exports = router;
