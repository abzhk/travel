const mongoose=require("mongoose")

const signupschema = new mongoose.Schema
({
    username:{type:String},
    password:{type:String},
    email:{type:String},
    pinCode:{type:Number},
    aadhar:{type:Number},
    image:{type:Object}
})

module.exports=new mongoose.model("login",signupschema)