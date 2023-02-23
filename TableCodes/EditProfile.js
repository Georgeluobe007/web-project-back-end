const express = require("express");
const router = express.Router();
const cloudinary = require('cloudinary');
const {UserAuthentication} = require('../models');

const {validationToken} = require("../JWT/JwebToken") 


module.exports = router;