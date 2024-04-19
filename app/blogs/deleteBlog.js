const express = require('express');
const deletemyBlogRouter = express.Router();
const Blog = require('../models/Blog.model.js');
const verifyToken = require('../utils/verifyToken.js')
const fetchUser = require('../utils/fetchUser.js')


deletemyBlogRouter.post('/',async(req,res)=>{
    try{
        console.log("Server Run")
        let user =  verifyToken(req);

        if(!user){
            return res.json({
                error: "Invalid user token!"
            })
        }
        user = await fetchUser(user.data);
        if(!user){
            return res.json({
                error: "Invalid user token!"
            })
        }

        await Blog.findByIdAndDelete(req.body.blogId);
        return res.json({
             success: "ok",
             message: "selected blog deleted!"
        })
    }
    catch(err){
        console.log(err)
        return res.status(400).json({
            error: "Internal Server Error!"
        })
    }
})

module.exports = deletemyBlogRouter