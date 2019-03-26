const mongoose = require('mongoose');

var NotesSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true,
    },
    text: {
        type: String,
        required: true
    },
    author: {
        type: String,
        required: true
    },
    date:{
        type: Date,
        default: Date.now
    },
//     _createdBy:{
//         type: mongoose.Schema.Types.ObjectId,
//         required: true
//    },
});

var Notes = mongoose.model('notes', NotesSchema)
module.exports = {Notes};