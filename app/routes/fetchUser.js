const express = require('express')
const fetchUserRouter = express.Router();
const verifyToken = require('../utils/verifyToken.js')
const User = require('../models/User.model.js');


fetchUserRouter.get('/', async (req, res) => {
    try {
        const result = verifyToken(req);
        if (!result) {
            return res.json({
                success: false,
                message: 'token not found!'
            })
        }

        const user = await User.findById(result.data);
        return res.json({_id: user._id,email: user.email,name: user.name,success: true,isVerified: user.isVerified,role:user.role});
    }
    catch (err) {
        console.log(err)
        return res.status(400).json({
            error: "Internal Server Error"
        })
    }

})

module.exports = fetchUserRouter;