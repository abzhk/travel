const mongoose=require("mongoose");
mongoose.connect("mongodb://localhost:27017/pratice");
var db = mongoose.connection
db.on("error",console.error.bind("error"))
db.once("open",function(){
    console.log("pratice db created");
})
module.exports=db