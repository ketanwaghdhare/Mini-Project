const express = require("express");
const verifyOtp = express.Router();
const Otp = require('../models/Otp.model.js');
const User = require("../models/User.model.js");
const verifyToken = require('../utils/verifyToken.js')


verifyOtp.post('/',async(req,res)=>{
    try{
        if(!req.body.otp){
            return res.status(400).json({
                "error": "Invalid otp!"
            })
        }
        const result = verifyToken(req);
        if(!result){
            return res.status(400).json({
                error:"Invalid user token"
            })
        }

        const user = await User.findById(result.data);
        
        const otp = await Otp.findOne({user: user.email});
        if(!otp){
            return res.status(400).json({
                error: "Internal Server Error!"
            })
        }

        if(otp.otp == req.body.otp){
            user.isVerified = true;
            await user.save();
            await Otp.findByIdAndDelete(otp._id);

            return res.json({
                success: 'Ok',
                action: "user verified!"
            })
        }
        else{
            return res.status(400).json({
                error: "Invalid Otp!"
            })
        }

    }
    catch(err){
        console.log(err)
        return res.status(400).json({
            error: "Internal Server Error!"
        })
    }

})

module.exports = verifyOtp