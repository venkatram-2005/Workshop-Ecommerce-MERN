const mongoose = require("mongoose")
require("dotenv").config()

const connectDB = async ()=>{
    try{
        await mongoose.connect(process.env.MONGODB_URL).then(()=>{
            console.log("MongoDB Connected Successfully")
        })
    }
    catch(error){
        console.log("Error while connecting to database", error)
    }
}
module.exports = connectDB