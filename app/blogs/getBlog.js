const express = require("express");
const Blog = require("../models/Blog.model.js");

const getBlogRouter = express.Router();

getBlogRouter.get('/:id',async(req,res)=>{
    try{
        const id = req.params.id;
        const blog = await Blog.findById({_id:id});
        if(!blog){
            return res.json({
                success: "ok",
                message: "no blog found!"
        })
        }

        return res.json(blog)

    }
    catch(err){
        return res.status(400).json({
            error: "Internal Server Error!"
        })
    }
})

module.exports = getBlogRouter;