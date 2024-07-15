const package = require("./packagemodel")

const multer = require("multer")

 const storage = multer.diskStorage({
  destination: function (req, res, cb) {
    cb(null, "./uploads")
  },
  filename: function (req, file, cb) {
    cb(null, file.originalname)
  }
})
const upload=multer({ storage:storage}).single('pic')

console.log (upload);

const newpackage = ((req,res)=>{
    const pack = new package({
        location:req.body.location,
        mode_of_travel:req.body.mode_of_travel,
        days:req.body.days,
        pic:req.file,
        price:req.body.price,
        agencyId:req.params._id
    })
    pack.save()
    .then((result)=>{
        console.log(result);
        res.json({
            status:200,
            msg:result
        })
        .catch((err)=>{
            res.json({
                status:404,
                msg:"err"
            })
        })
    })
})


const viewapproved=((req,res)=>{
    package.find({})
    .then((result) => {
      res.json({
          msg: result,
          status: 200
        })
  
      })
      .catch((err) => {
        console.log(err);
        res.json({
          status: 404,
          msg: "not detail found",
        })
      })
  })

  const approvedpack=((req,res)=>{
    package.findByIdAndUpdate({_id:req.params.id},{isactive:true})
    .then((result)=>{
      res.json({
        status:200,
        msg:result
      })
    })
    .catch((err)=>{
      console.log(err);
      res.json({
        status:404,
        msg:('no package updated till')
      })
    })
  })


module.exports ={newpackage,upload,viewapproved,approvedpack}