const mongoose = require('mongoose');

const courtSchema = mongoose.Schema({
    name:{
        type:String
    },
    type:{
        type:String
    },
    address1:{
        type:String
    },
    address2:{
        type:String
    },
    address3:{
        type:String
    },
    location:{
        type:String
    },
    landMark:{
        type:String
    },
    pin:{
        type:String
    },
    contactNumber:{
        type:String
    },
    courtPics:{
        type:Array
    },
    description:{
        type:String
    },
    timeStamp:{
        type:Date,
        default:new Date()
    },
})

const court = mongoose.model('courts', courtSchema);
module.exports=court;