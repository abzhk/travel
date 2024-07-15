const login = require("./signupmodel");
const multer = require("multer");

const storage = multer.diskStorage({
  destination: function (req, res, cb) {
    cb(null, "./uploads");
  },
  filename: function (req, file, cb) {
    cb(null, file.originalname);
  },
});

const upload = multer({ storage: storage }).single("image");

const detail = (req, res) => {
  const detailone = new login({
    username: req.body.username,
    password: req.body.password,
    email: req.body.email,
    pincode: req.body.pincode,
    aadhar: req.body.aadhar,
    image: req.file,
  });

  detailone
    .save()
    .then((result) => {
      res.json({
        status: 200,
        msg: result,
      });
    })
    .catch((err) => {
      res.json({
        status: 500,
        msg: "user not found",
      });
    });
};

const userlogin = (req, res) => {
  let email = req.body.email;
  let password = req.body.password;

  login
    .findOne({ email: email })
    .then((data) => {
      console.log(data);
      if (password === data.password) {
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

const remuser =(req,res)=>{
  login.findByIdAndDelete({_id:req.params.id})
  .then((result)=>{
    res.json({
    msg:"deleted",
    status:200
    })
  })
}

const viewone =((req,res)=>{
  login.findById({_id:req.params.id})
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


const viewuser = (req, res) => {
  login.find()
  .then((result) => {
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

module.exports = { detail, upload, userlogin, viewuser ,remuser,viewone};
