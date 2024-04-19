const express = require("express");
const signupRouter = express.Router();
const User = require("../models/User.model.js");
const { check, validationResult } = require("express-validator");
const generateToken = require("../utils/generateToken.js");
const bcrypt = require('bcryptjs');
const nodemailer = require("nodemailer");
const sendMail = require('../utils/sendMail.js')

const USER_NAME = process.env.MAIL;
const APP_PASSWORD = process.env.APP_PASSWORD;



const transporter = nodemailer.createTransport({
    service: "Gmail",
    host: "smtp.gmail.com",
    port: 465,
    secure: true,
    auth: {
        user: USER_NAME,
        pass: APP_PASSWORD,
    },
});



signupRouter.post(
    "/",
    check("email", "Email length should be 8 to 30 characters")
        .isEmail()
        .isLength({ min: 8, max: 30 }),
    check("name", "Name length should be 3 to 20 characters").isLength({
        min: 3,
        max: 20,
    }),
    check("password", "Password length should be 8 to 10 characters").isLength({
        min: 8,
        max: 10,
    }),
    async (req, res) => {
        try {
            const errors = validationResult(req);
            let sentMail = false;

            if (!errors.isEmpty()) {
                return res.json(errors);
            }

            const _user = await User.find({ email: req.body.email });

            if (_user.length > 0) {
                return res.status(400).json({
                    error: "User with this email already exists!",
                });
            }

            const salt = bcrypt.genSaltSync(10);
            const hashedPassword = bcrypt.hashSync(req.body.password, salt);
            req.body.password = hashedPassword;

            const user = await User.create({
                name: req.body.name,
                email: req.body.email,
                password: req.body.password,
            });

            const mailResult = await sendMail(transporter,req.body.email);
            if(mailResult){
                sentMail = true;
            }


            const token = generateToken(user._id);
            const expiresInDays = 27;
            const expirationTimeInMillis = expiresInDays * 24 * 60 * 60 * 1000;

            const expirationDate = new Date(Date.now() + expirationTimeInMillis);

            res.cookie("token", token, {
                expires: expirationDate,
                httpOnly: true,
            });

            if(sentMail){
                return res.json({
                    success: "ok",
                    action: "User Created!",
                    email: "Otp sent to email!"
                });
            }

            return res.json({
                success: "ok",
                action: "User Created!",
            });


        } catch (err) {
            console.log(err)
            return res.status(400).json({
                error: "Internal Server Error",
            });
        }
    }
);

module.exports = signupRouter;
