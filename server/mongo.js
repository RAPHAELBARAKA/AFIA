const mongoose = require ('mongoose')
mongoose.connect('mongodb+srv://health:health@health.8tfdnav.mongodb.net/health?retryWrites=true&w=majority&appName=health')
.then(() =>{
    console.log("connected");
})
.catch(() => {
    console.log('failed');
})


const newSchema = new mongoose.Schema({
    name:{
        type:String,
        required:true
    },
    email:{
        type:String,
        required:true},
    phone:{
            type:String,
            required:true},  
    id:{
             type:String,
            required:true}, 
    password:{
                type:String,
                required:true},  
    confirm:{
                 type:String,
                required:true},   
     otp: {
                    type: String  }          
})

const collection=mongoose.model("collection", newSchema)
module.exports=collection
