import mongoose from "mongoose";

export const connnectDB = async () =>{
    try{
        await mongoose.connect("mongodb://127.0.0.1:27017/sanjayTest")
        console.log("database connected")
    }catch(error) {
        console.log(error)
    }
}



