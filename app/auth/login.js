const express = require("express");
const loginRouter = express.Router();
const User = require("../models/User.model.js");
const { check, validationResult } = require("express-validator");
const generateToken = require("../utils/generateToken.js");
const bcrypt = require("bcryptjs");

loginRouter.post(
    "/",
    check("email", "Email length should be 8 to 30 characters")
        .isEmail()
        .isLength({ min: 8, max: 30 }),
    check("password", "Password length should be 8 to 10 characters").isLength({
        min: 8,
        max: 10,
    }),
    async(req, res) => {
        try {
            const errors = validationResult(req);

            if (!errors.isEmpty()) {
                return res.json(errors);
            }

            const _user = await User.findOne({ email: req.body.email });

            if (!_user) {
                return res.status(400).json({
                    error: "User with this email doesn't exists!",
                });
            }

            const result = bcrypt.compareSync(req.body.password, _user.password);
            if (!result) {
                return res.status(400).json({
                    error: "Email and password combination doesn't match!",
                });
              }

            const token = generateToken(_user._id);
            const expiresInDays = 27;
            const expirationTimeInMillis = expiresInDays * 24 * 60 * 60 * 1000;

            const expirationDate = new Date(Date.now() + expirationTimeInMillis);

            res.cookie("token", token, {
                expires: expirationDate,
                httpOnly: true,
            });

            return res.json({
                success: "ok",
                action: "User authenticated",
            });

        }
        catch (err) {
            console.log(err);
            return res.status(400).json({
                error: "Internal Server Error",
            });
        }
    }
);

module.exports = loginRouter;
