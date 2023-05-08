const express = require("express")
const {post} = require("../models")
const {validationToken} = require('../JWT/JwebToken');
const { where } = require("sequelize");
const router = express.Router();


router.post("/post",validationToken, async (req,res) => {
    const posts = req.body;
    const username = req.user.UserName;
    const image = req.user.UserImage;
    posts.image = image;
    posts.username = username;
    await post.create(posts);
    res.json(posts);
   
  });

router.get('/getPost', async (req,res) => {
  const getPost = await post.findAll({});
  
  res.json(getPost);
  console.log(getPost);
})
router.get('/editPost/:id', async (req,res) => {
  const id = req.params.id;
  const postWork = await post.findByPk(id);
res.json(postWork);
  
})
router.put("/update/:id",  async (req,res) => {
  const editNote = req.body.post;
  const id = req.params.id;
  console.log(editNote,id);
 await post.update({post:editNote},{where:{id:id}});
  res.json(editNote);
})
router.delete("/delete/:id",  async (req,res) => {
  const id = req.params.id;
  await post.destroy({where:{id:id}});
  res.json("post was deleted");
})
module.exports = router;