const express = require("express");

const logoutRouter = express.Router();

logoutRouter.get("/", async (req, res) => {
    try {
        res.cookie('token','',{
            httpOnly: true, expires: new Date(0)
        });
        return res.status(200).json({success:'ok',action:'user logged out'});
    } 
    catch (err) {
        console.log(err);
        return res.status(400).json({
            error: "Internal Server Error",
        });
    }
});
module.exports = logoutRouter;