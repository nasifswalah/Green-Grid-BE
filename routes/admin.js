var express = require('express');
var router = express.Router();
const multer = require('multer');
const { adminAuth } = require('../middlewares/authorization');
const { createnewcourt, createCourtSchedules } = require('../controllers/adminControllers');

const storage=multer.diskStorage({
  destination:function(req,file,cb){
    cb(null,'public/assets')
  },
  filename:function(req,file,cb){
    cb(null,file.fieldname+'-'+Date.now()+file.originalname)
  }
})

const upload = multer({storage:storage})
router.post('/createnewcourt', adminAuth,upload.array('files'), createnewcourt);
router.post('/createschedules', adminAuth, createCourtSchedules);

module.exports = router;
