const express = require("express");
const app = express();
const cors = require("cors")
const path = require('path')
const cookieParser = require("cookie-parser")

app.use(cors({
    credentials: true,
    origin: 'http://localhost:3000'
}));
app.use(express.json());
app.use(cookieParser())

app.use(express.static(path.join(__dirname,'..','public')));

app.get('/',(req,res)=>{
    return res.send("campuSphere Server OK");
})

app.use('/signup',require('./auth/signup.controller.js'));
app.use('/login',require('./auth/login.controller.js'));
app.use('/logout',require('./auth/logout.controller.js'));
app.use('/verifyotp',require('./auth/verifyOtp.controller.js'));
app.use('/getuser',require('./routes/fetchUser.js'))
app.use('/createblog',require('./blogs/createBlog.js'))
app.use('/getblog',require('./blogs/getBlog.js'))
app.use('/getblogs',require('./blogs/getAllBlogs.js'))
app.use('/getmyblogs',require('./blogs/myBlogs.js'))
app.use('/deletemyblog',require('./blogs/deleteBlog.js'))
app.use('/updateblog',require('./blogs/updateBlog.js'))

module.exports = app;