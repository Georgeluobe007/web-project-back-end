const express = require("express");
const router = express.Router();
const cloudinary = require('cloudinary').v2;
const {UserAuthentication} = require('../models');

const {validationToken} = require("../JWT/JwebToken") 

cloudinary.config({ 
  cloud_name: process.env.cloud_name, 
  api_key: process.env.api_key, 
  api_secret: process.env.api_secret
}); 
router.put('/editImage',validationToken, async (req,res) => {
  const {newImage,id} = req.body;
  try {
    const public = await UserAuthentication.findOne({where:{id:id}});
    const imageId = public.UserImage;
    console.log(imageId);
    await cloudinary.uploader.destroy(imageId);
    
    await UserAuthentication.update({UserImage:newImage},{where:{id:id}});
    res.status(200).json({
      status:true,
      message:"uploaded"
    })
  } catch (error) {
    
  }
})





module.exports = router;