let mongoose=require("mongoose")

let memberSchema=mongoose.Schema({
    name:{
        type:String,
        required:(true,"Name must be Required")
    },
    phone:{
        type:String,
        required:(true,"Phone Number is required")
    },
    email:{
        type:String,
        required:(true,"Email is Required")
    },
    month:{
        type:Number,
        required:(true,"Month is required"),
        
    },
    remind:{
        type:String,
        
        
    }
},{timestamps:true})

module.exports=mongoose.model("member",memberSchema)