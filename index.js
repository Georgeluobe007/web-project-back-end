const express = require('express');
const app = express();
const cors = require('cors')
const CookiePasser = require("cookie-parser")
app.use(cors());
const dotenv = require("dotenv")
dotenv.config({path: './.env.development'})

const path = require("path")
app.set("view engine", "ejs");
const viewPath = path.join(__dirname,"views")
app.set("views", viewPath);
app.use(express.urlencoded({extended:false}));
app.use(express.static(path.join(__dirname,"public")))
app.use(express.json())
app.use(CookiePasser());
const fileUpload = require("express-fileupload")
app.use(fileUpload())
const database = require("./models");

const UserAuth = require("./TableCodes/UserAuthCodes");
app.use("/user",UserAuth);
const UserEdit = require("./TableCodes/EditProfile");
app.use("/editProfile",UserEdit);
const Post = require("./TableCodes/Post");
app.use("/UserPost",Post);
database.sequelize.sync().then(() => {
    app.listen(3002, () => {
        console.log("app is reunning on port 3002");
     })
})

