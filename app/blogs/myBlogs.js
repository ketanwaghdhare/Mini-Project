const express = require("express");
const Blog = require("../models/Blog.model.js");
const verifyToken = require('../utils/verifyToken.js')
const fetchUser = require('../utils/fetchUser.js')

const myBlogsRouter = express.Router();

myBlogsRouter.get('/',async(req,res)=>{
    try{
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

        const blogs = await Blog.find({authorId: user._id});
        return res.json({
            blogs:blogs, success: "ok"
        })
    }
    catch(err){
        console.log(err)
        return res.status(400).json({
            error: "Internal Server Error!"
        })
    }
})

module.exports = myBlogsRouter;

