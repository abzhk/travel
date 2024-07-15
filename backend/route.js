const express= require('express') 
const route = express.Router()

const login = require('./signup/signupcontroller')
const agent = require('./agency/agencycontroller')
const package = require('./agency/packagecontroller')

//registration
route.post('/detail',login.upload,login.detail)
route.post('/userlogin',login.userlogin)
route.get('/export',login.viewuser)
route.get('/delete/:id',login.remuser)
route.get('/app/:id',login.viewone)

//agency
route.post('/news',agent.upload,agent.newdetail) 
route.post('/agentlogin',agent.agentlogin)
route.get('/viewagency',agent.viewagency)
route.get('/approveagency/:id',agent.approveagency)
route.get('/remove/:id',agent.remove)

//package
route.post('/pack/:_id',package.upload,package.newpackage)
route.get('/viewpackage',package.viewapproved)
route.get('/app/:id',package.approvedpack)


module.exports=route