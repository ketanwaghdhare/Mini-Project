const express = require("express");
const Blog = require("../models/Blog.model.js");

const getAllBlogRouter = express.Router();

getAllBlogRouter.get('/',async(req,res)=>{
    try{
    const blogs = await Blog.find();
    return res.json(blogs);
    }
    catch(err){
        console.log(err)
        return res.status(400).json({
            error: "Internal Server Error!"
        })
    }
})

module.exports = getAllBlogRouter;