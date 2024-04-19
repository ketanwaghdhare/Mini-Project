const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema({
    name:{
        type: String,
        required: [true,"name is required!"],
        trim: true
    },
    email:{
        type: String,
        required: [true,"email is required!"],
        unique: true,
        trim: true
    },
    password:{
        type: String,
        required: [true,"Password is required!"]
    },
    role:{
        type: String,
        enum: ['Admin','Student','Teacher'],
        default: 'Student'
    },
    status:{
        type: String,
        enum: ['online','offline'],
        default: 'offline'
    },
    profileImgUrl:{
        type: String,
    },
    isVerified:{
        type: Boolean,
        default: false
    }
},{timestamps: true})


const User = mongoose.model('user',UserSchema);

module.exports = User;