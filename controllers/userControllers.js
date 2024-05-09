const COURTS = require('../models/courtModels');
const COURT_SCHEDULES = require('../models/courtScheduleModel')
const ObjectId = require('mongoose').Types.ObjectId

const getAllCourtData=((req,res,next)=>{
    try {
        COURTS.find()
        .then((result)=>{
            res.status(200).json(result)
        })
        .catch((err)=>{
            next()
        })
    } catch (error) {
        next()
    }
});

const getSingleCourtData=( async (req,res,next)=>{
    try {
        const courtData = await COURTS.findOne({_id:req.query.courtId})
        res.status(200).json(courtData)
    }
    catch (error) {
        next()
    }
})

const getSlotsData=(req,res)=>{
    let currentHour = 0
    let currentDate = new Date(req.query.date)
    if (new Date(new Date().setUTCHours(0,0,0,0))===currentDate) {
        currentHour = new Date().getHours()
    }
    console.log({currentHour},{currentDate})
    console.log(new Date(new Date().setUTCHours(0,0,0,0)),currentDate);
    COURT_SCHEDULES.aggregate([
        {
            $match:{
                courtId:new ObjectId(req.query.courtId),
                date:currentDate,
                'slot.id':{$gte:currentHour}
            }
        },
        {
            $project:{
                _id:1,
                date:1,
                slot:1,
                cost:1,
                bookedBy:1
            }
        }
    ])
    .then((result)=>{
        console.log(result);
        res.status(200).json(result)
    })
    try {
        
    } catch (error) {
        
    }
}

module.exports={getAllCourtData, getSingleCourtData,getSlotsData}