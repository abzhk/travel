const mongoose = require("mongoose")

const packageschema = new mongoose.Schema
({
    location:{type:String},
    mode_of_travel:{type:String},
    days:{type:String},
    pic:{type:Object},
    price:{type:String},
    agencyId:{
        type:mongoose.Schema.Types.ObjectId,
        required:true,
        ref:'agent'
    }
})
module.exports = new mongoose.model("package",packageschema)