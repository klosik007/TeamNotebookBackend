const mongoose = require('mongoose');

var NotesSchema = new mongoose.Schema({
    title: {
        type: String,
        minlength: 1,
        required: true,
    },
    text: {
        type: String,
        minlength: 1,
        required: true
    },
    author: {
        type: String,
        required: false
    },
    date:{
        type: Date,
        default: Date.now
    }
});

var Notes = mongoose.model('notes', NotesSchema)
module.exports = {Notes};