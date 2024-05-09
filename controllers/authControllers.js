const USERS = require('../models/userModels')
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const doSignup = (req,res) => {
    bcrypt.hash(req.body.password, parseInt(process.env.SALT_ROUNDS),function(err,hash){
        USERS({
            firstName:req.body.firstName,
            lastName:req.body.lastName,
            email:req.body.email,
            mobileNumber:req.body.mobileNumber,
            password:hash
        }).save()
        .then((response)=>{
            res.status(200).json({message:'Signup Successfully'});
        })
        .catch((error)=>{
            console.log(error);
            if (error.code===11000) {
                res.status(500).json({message:`${req.body.email} is already existing`})
            } else {
                res.status(500).json({message:'Something went wrong'})
            }
        })
    })
}

const doLogin = async (req,res) => {
    try {
        const {email,password} = req.body
        userData = await USERS.findOne({email:email})
        if(userData) {
            bcrypt.compare(password,userData.password,(err,result)=>{
                if (result) {
                    userData.password=undefined
                    const options = {
                        expiresIn:"2d",
                        algorithm:"HS256"
                    }

                    const token = jwt.sign({...userData},process.env.JWT_PASSWORD, options)
                    res.status(200).json({user:userData, token})
                }else {
                    res.status(401).json({message:'Invalid credentials'})
                }
            })
        }
    } catch (error) {
        res.status(401).json({message:'Invalid credentials'})
    }
}

module.exports = {doSignup,doLogin}