const express = require("express");
const router = express.Router();
const cloudinary = require('cloudinary');
const {UserAuthentication} = require('../models');

const {validationToken} = require("../JWT/JwebToken") 

router.put("/editImage", validationToken, async (req,res) => {
    const {newImage,id} = req.body;
    await UserAuthentication.cloudinary.v2.uploader.destroy({UserImage:newImage},{where:{id:id}});
    await UserAuthentication.update({UserImage:newImage},{where:{id:id}});
    res.json(newImage);
})


module.exports = router;