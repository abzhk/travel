const mongoose=require("mongoose")

const agencyschema = new mongoose.Schema
({
    Agency_name:{type:String},
    pwd:{type:String},
    aadhar:{type:String},
    address:{type:String},
    mobile_no:{type:String},
    logo:{type:Object},
    e_mail:{type:String},
    location:{type: String},
    isactive:{type:Boolean,
        default:false
    }
})

module.exports=new mongoose.model("agent",agencyschema)