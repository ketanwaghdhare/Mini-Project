const express = require('express');
const createBlogRouter = express.Router();
const Blog = require('../models/Blog.model.js')
const multer = require('multer')
const verifyToken = require('../utils/verifyToken.js');
const fetchUser = require('../utils/fetchUser.js')
const path = require('path')

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, path.join(__dirname,"..","..","public"));
    },
    filename: function (req, file, cb) {
      const fileName = `${Date.now()}-${file.originalname}`;
      cb(null, fileName);
    },
  });
  const upload = multer({storage})




createBlogRouter.post('/',upload.single('coverImg'),async(req,res)=>{
    try{
        console.log("OK")
        let user = null;

        if(req.cookies){
            const result = verifyToken(req);
            if(result){
                user = await fetchUser(result.data)
            } 
            else{
                return res.status(400).json({
                    error: "Invalid token!"
                })
            }
        }
        if(req.file?.filename){
            const blog = await Blog.create({title: req.body.title,body: req.body.body,coverImg:'http://localhost:8000/'+req.file?.filename,authorId:user._id,authorName:user.name});
            return res.redirect('http://localhost:3000/blogs');
        }
        const blog = await Blog.create({title: req.body.title,body: req.body.body,coverImg:req.file?.filename,authorId:user._id,authorName:user.name});
        return res.redirect('http://localhost:3000/blogs');

    }
    catch(err){
        console.log(err)
        return res.status(400).json({
            error: "Internal Server Error"
        })
    }

})

module.exports = createBlogRouter;