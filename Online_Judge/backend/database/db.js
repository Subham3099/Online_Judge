const mongoose = require('mongoose');
const dotenv = require('dotenv');
dotenv.config();

const DBConnection = async ()=>{
    const MONGODB_URL = process.env.MONGODB_URI;
    try{
        await mongoose.connect(MONGODB_URL,{useNewUrlParser:true});
        console.log("Good MongoDB");
    }catch(error){
        console.log("Error MongoDB "+error);
    }
};

module.exports = {DBConnection};