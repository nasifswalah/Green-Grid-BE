var express = require('express');
const { orders, verify } = require('../controllers/paymentControllers');
const {userAuth} = require('../middlewares/authorization')

var router = express.Router();


router.post('/orders', userAuth, orders);
router.post('/verify', userAuth, verify);

module.exports = router;
