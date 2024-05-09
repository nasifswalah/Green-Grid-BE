const COURTS = require('../models/courtModels');
const COURTSCHEDULES = require('../models/courtScheduleModel');

const createnewcourt = (req,res)=>{
    const {
        name,
        location,
        type,
        address3,
        address2,
        address1,
        landMark,
        pin,
        contactNumber,
        description
    }=req.body
    const pics = req.files.map((file)=>{return{name:file.filename,type:file.mimetype}})
    COURTS({
        name,
        location,
        type,
        address3,
        address2,
        address1,
        landMark,
        pin,
        contactNumber,
        description,
        courtPics:pics
    }).save().then((resp)=>{
        res.status(200).json({message:'Court added successfully'})
    })
    .catch((err)=>{
        console.log(err);
        res.status(500)
    })
}

const createCourtSchedules=(req,res )=>{
    try {
        const {courtId,startDate,endDate,cost,selectedSlots} = req.body
        let currentDate = new Date(new Date(startDate).setUTCHours(0,0,0,0))
        let lastDate = new Date(new Date(endDate).setUTCHours(0,0,0,0))
        const slotObjects=[]
        while(currentDate<=lastDate){
            for(let data of selectedSlots){
                slotObjects.push({
                    date: JSON.parse(JSON.stringify(currentDate)),
                    slot:{
                        name:data.name,
                        id:data.id
                    },
                    cost,
                    courtId
                })          
            }
            currentDate.setDate(currentDate.getDate()+1)
        }
        console.log(slotObjects);
        COURTSCHEDULES.insertMany(slotObjects)
        .then((resp)=>{
            res.status(200).json({message:'New schedule addedd successfully'})
        })
        .catch((err)=>{
            if (err.code===11000) {
                res.status(500).json({message:` Duplicating the existing schedule`})
            } else {
                res.status(500).json({message:'Something went wrong'})
            }
        })
    } catch (error) {
        
    }
} 

module.exports={createnewcourt, createCourtSchedules}