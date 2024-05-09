var express = require('express');
var router = express.Router();
const {userAuth} = require('../middlewares/authorization');
const { getAllCourtData, getSingleCourtData, getSlotsData } = require('../controllers/userControllers');

router.get('/getallcourtdata', userAuth, getAllCourtData);
router.get('/getsinglecourtdata', userAuth, getSingleCourtData);
router.get('/getslotsdata', userAuth, getSlotsData);

module.exports = router;
