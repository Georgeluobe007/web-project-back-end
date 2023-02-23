const express = require('express');
const router = express.Router();
const Bcrypt = require("bcrypt");
const {validationToken} = require("../JWT/JwebToken")
const jwt = require("jsonwebtoken")
const nodemailer = require('nodemailer');

const {UserAuthentication} = require('../models');



router.post("/userRegister", async(req,res) => {
  const {photo,name,userName,password,email} = req.body;
   const singleUser = await UserAuthentication.findOne({where:{UserName:userName,Email:email}})
if(singleUser){
    return res.status(400).json({error:"user already exist"});
}

Bcrypt.hash(password, 10).then((hash) => {
    UserAuthentication.create({
  UserImage:photo,
  UserName:userName,
  Email:email,
  Name:name,
 Password:hash
    });
res.json({Message:"you have successfully logged in"})
  })
})

router.post("/login", async (req,res) => {
   const {userName,password} = req.body;
    
  UserAuthentication.findOne({where:{UserName:userName}}).then(user => {
    if (!user) return res.status(400).json({usermessage: "User name not correct"})

    Bcrypt.compare(password,user.Password,(err,data) => {
        if (err) throw err
        if(data){

          const accessWebToken = jwt.sign({
            UserName: user.UserName,
            id: user.id,
            Name: user.Name,
            UserImage: user.UserImage 
         },process.env.jwtkey
          );
            return res.status(200).json({
              token1: accessWebToken,
              UserName: user.UserName,
              Name: user.Name,
              id: user.id,
             UserImage: user.UserImage 
            })
        }else{
            return res.status(401).json({ message: "wrong user name and password combination" })
        }
    })
 })
})
router.get('/auth', validationToken,(req,res) => {

res.json(req.user);
console.log(req.user);
})
const JWT_SECRETE = process.env.jwtkey;
router.post("/forgetPassword",async(req,res) => {
  const {email} = req.body;
   try {
    const oldUser = await UserAuthentication.findOne({where:{Email:email}});
    if(!oldUser){
      return res.send({recovery:"user does not exist"});
    }
    const secrete = JWT_SECRETE + oldUser.Password;
    const payload = {email:oldUser.Email,id:oldUser.id,username:oldUser.UserName,Password:oldUser.Password}
    const token = jwt.sign(payload,secrete,{expiresIn:"5min"});
    const link = `http://localhost:3002/user/reset-password/${oldUser.id}/${token}`;
    var transporter = nodemailer.createTransport({
      service: 'hotmail',
      auth: {
        user: process.env.outlookuser,
        pass: process.env.outlookpassword
      }
    });
    
    var mailOptions = {
      from: process.env.outlookuser,
      to: oldUser.Email,
      subject: 'password reset',
      text: link
    };
    
    transporter.sendMail(mailOptions, function(error, info){
      if (error) {
        console.log(error);
      } else {
        console.log('Email sent: ' + info.response);
      }
    });
   res.json({usermail:"please follow the link is was sent to your email......"})
   console.log(link);
   } catch (error) {
    
   }
});
router.get("/reset-password/:id/:token", async(req, res) => {
const {id,token} = req.params;
console.log(req.params);
const oldUser = await UserAuthentication.findOne({where:{id:id}});
if(!oldUser){
  return res.send({status:"user does not exist"});
}
const secrete = JWT_SECRETE + oldUser.Password;
try {
  const verify = jwt.verify(token, secrete);
res.render("index", {email: verify.email, status:"not verified"});
               
} catch (error) {
  console.log(error);
  res.send("not verify");
}

});
router.post("/reset-password/:id/:token", async(req, res) => {
  const {id,token} = req.params;
  const {password} = req.body;
  console.log(req.params);
  const oldUser = await UserAuthentication.findOne({where:{id:id}});
  if(!oldUser){
    return res.send({status:"user does not exist"});
  }
  const secrete = JWT_SECRETE + oldUser.Password;
  try {
    const verify = jwt.verify(token, secrete);
    const encrepted =  await Bcrypt.hash(password, 10);
    await UserAuthentication.update({Password:encrepted},{where:{id:id}})
//oldUser.Password = password;
 // res.json({status:"password updated"});
  res.render("index", {email: verify.email, status:"verified"});        
  } catch (error) {
    console.log(error);
    res.json({status:"something went wrong"})
  }
  
  });


module.exports = router;