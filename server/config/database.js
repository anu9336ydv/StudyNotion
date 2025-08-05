const mongoose = require("mongoose")
require("dotenv").config();

exports.connect = async() => {
    await mongoose.connect(process.env.MONGODB_URL)
    .then(()=>console.log("DB Connected succesfully"))
    .catch( (error)=>{
        console.log("DB Connection is failed");
        console.error(error);
        process.exit(1); 
    })
}