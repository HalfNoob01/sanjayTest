import mongoose from "mongoose";

const schemaData = mongoose.Schema({
    name: String,
    email : String
},{
    timestamps:true
})

export const userModel = mongoose.model("user",schemaData)


