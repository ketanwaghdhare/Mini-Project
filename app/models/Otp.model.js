const mongoose = require('mongoose');

const OtpSchema = new mongoose.Schema({
    user:{
        type: String,
        required: true
    },
    otp:{
        type: String,
        required: true,
        unique: true
    }
},{timestamps: true});


const Otp = mongoose.model('otp',OtpSchema);

module.exports = Otp;