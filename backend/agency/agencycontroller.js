const agent = require("./agencymodel");
 const multer = require("multer")

 const storage = multer.diskStorage({
  destination: function (req, res, cb) {
    cb(null, "./uploads")
  },
  filename: function (req, file, cb) {
    cb(null, file.originalname)
  }
})

const upload=multer({ storage:storage}).single('logo')

console.log (upload);

const newdetail = (req, res) => 
  {
  const getdetail = new agent({
    Agency_name: req.body.Agency_name,
    pwd: req.body.pwd,
    aadhar: req.body.aadhar,
    address: req.body.address,
    mobile_no: req.body.mobile_no,
    logo: req.file,
    e_mail: req.body.e_mail,
    location: req.body.location,
  })
  getdetail.save()
  .then((result)=>{
    console.log(result)
    res.json({
    status:200,
  msg:result
})
    })
    .catch((error)=>{
console.log(error);
res.json({status:404,
  msg:"no detail added"})
    })
  }

  const agentlogin = (req, res) => {
    let e_mail = req.body.e_mail;
    let pwd = req.body.pwd;
  
    agent
      .findOne({ e_mail: e_mail })
      .then((data) => {
        console.log(data);
        if (pwd === data.pwd) {
          res.json({
            status: 200,
            msg: "login successful",
            data:data
          });
        } else {
          res.json({
            status: 500,
            msg: "failed",
          });
        }
      })
      .catch((err) => {
        console.log(err);
        res.json({
          status: 409,
          msg: "user not found",
        });
      });
  };

  const viewagency = (req, res) => {
    agent.find({isactive:false})
    .then((result) => {

      console.log(result);
      res.json({
          status: 200,
          msg: result,
        })
  
      })
      .catch((err) => {
        console.log(err);
        res.json({
          status: 409,
          msg: "user not found",
        });
      });
  };

  const approveagency =(req,res)=>{
    agent.findByIdAndUpdate({_id:req.params.id},{isactive:true})
    .then((result)=>{
      res.json({
      status:200,
      msg:result,
      })
    })
      .catch((err)=>{
        console.log(err);
       res.json({
        status:409,
        msg:"cant approve"
    
      })
    })
  }

  const remove =(req,res)=>{
    login.findByIdAndDelete({_id:req.params.id})
    .then((result)=>{
      res.json({
      msg:"deleted",
      status:200
      })
    })
    .catch((err)=>{
      res.json({
        status:404,
        msg:('error')
      })
    })
  }


module.exports = {newdetail,upload,agentlogin,viewagency,approveagency,remove}
