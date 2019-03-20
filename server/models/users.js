const mongoose = require('mongoose');
const validator = require('validator');

var UsersSchema = new mongoose.Schema({
    nick: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: false,
        minlength: 1,
        trim: true,
        validate:{
            validator: validator.isEmail,
            message: '{VALUE} is not a valid email'
        }
    },
    password:{
        type: String,
        required: true,
        minlength: 5
    },
    tokens:[{
        access: {
            type: String,
            required: true
        },
        token: {
            type: String,
            required: true
        }
    }]
});


var Users = mongoose.model('users', UsersSchema);
module.exports = {Users};