const mongoose = required('mongoose');
const validator = required('validator');

var UsersSchema = new mongoose.Schema({
    nick: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
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