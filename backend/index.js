import express from "express"
import cors from "cors"
import { connnectDB } from "./database.js"
import { userModel } from "./schema.js"

const app = express()

app.use(cors())
app.use(express.json())

//read
app.get('/', async (req,res) =>{
    const data = await userModel.find({})
    res.json({success : true , data : data})
})

//save data to db
app.post("/create", async (req,res)=>{
    console.log(req.body)
    const data = new userModel(req.body)
    await data.save()
    res.send({success:true, message : "data save successfully"})
})

//update data
app.put("/update", async(req,res)=>{
    console.log(req.body)
    const {id, ...rest} =  req.body
    await  userModel.updateOne({_id: id},rest)
    res.send({success:true, message:"data updated"})
})

//delete
app.delete('/delete/:id', async (req,res)=>{
    const id =  req.params.id
    console.log(id) 
    const data = await userModel.deleteOne({_id : id})
    res.send({success: true, message : "data deleted successfully"})
})

connnectDB()
app.listen(8000, ()=>console.log("server is runing"))

