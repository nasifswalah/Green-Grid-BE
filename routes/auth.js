var express = require('express');
const { doSignup, doLogin } = require('../controllers/authControllers');
var router = express.Router();

/* GET home page. */
router.post('/dosignup', doSignup);
router.post('/dologin', doLogin);

module.exports = router;
