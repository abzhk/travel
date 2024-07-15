const express = require('express');
const app=express()
const route=express.Router()
route.get('/abi',(req,res)=>{
 let name=req.body.name
 res.send("myname"+name)

})
module.exports=route