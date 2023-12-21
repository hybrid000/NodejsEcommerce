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
    res.render('support', { activePage: 'Support',
        contactAddressLink: 'https://www.google.com/maps/place/Lyon,+France/@45.7579211,4.7527293,12z/data=!3m1!4b1!4m6!3m5!1s0x47f4ea516ae88797:0x408ab2ae4bb21f0!8m2!3d45.764043!4d4.835659!16zL20vMGRwcmc?hl=fr&entry=ttu',
    contactNumber: 7088226647,
        contactAddress: 'Lyon',
    contactEmail: 'neekplaysitbest@gmail.com',


});
});

module.exports = router;
