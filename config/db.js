const mongoose = require('mongoose');
const connectDB = async ()=>{
    try {
        await mongoose.connect('mongodb+srv://nasifswalah:bs1RVXFS1pXSTat0@cluster0.u5nk8.mongodb.net/')
    console.log('Connected to mongoDB');
    } catch (error) {
        console.log(error);
    }
  
}

module.exports=connectDB;