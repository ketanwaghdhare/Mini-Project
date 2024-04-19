const express = require("express");
const Blog = require("../models/Blog.model.js");
const verifyToken = require('../utils/verifyToken.js')
const fetchUser = require('../utils/fetchUser.js')

const updateRouter = express.Router() 

updateRouter.post('/',async(req,res)=>{
    try{
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


       const blog = await Blog.findByIdAndUpdate(req.body.blogId,{title: req.body.title,body: req.body.body},{new: true});
       return res.json({
        success: "ok",
        message: "selected blog updated!"
   })

    }
    catch(err){
        console.log(err)
        return res.status(400).json({
            error: "Internal Server Error"
        })
    }
})
module.exports = updateRouter;