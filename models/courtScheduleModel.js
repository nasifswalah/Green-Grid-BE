const mongoose = require('mongoose');

const schema = mongoose.Schema({
    date:{
        type:Date,
        required:true
    },
    slot:{
        type:Object,
        required:true
    },
    cost:{
        type:Number,
        required:true
    },
    bookedBy:{
        type:mongoose.Types.ObjectId,
        ref:'users'
    },
    courtId:{
        type:mongoose.Types.ObjectId,
        required:true
    },
    orderId:{
        type:mongoose.Types.ObjectId,
        ref:'orders'
    },
});
const courtSchedules = mongoose.model('courtSchedules',schema)
schema.index({date:1,'slot.id':1,courtId:1},{unique:true})
module.exports=courtSchedules