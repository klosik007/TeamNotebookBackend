const mongoose = require('mongoose');

var NotesSchema = new mongoose.Schema({
    _createdBy:{
        type: mongoose.Schema.Types.ObjectId,
        required: true
    },
    manufacturer: {
        type: String,
        minlength: 1,
        required: true,
    },
    model: {
        type: String,
        minlength: 1,
        required: true
    },
    component:{
        type: String,
        minlength: 1,
        required: true
    },
    moduleid:{
        type: String,
        minlength: 1,
        required: true
    },
    type: {
        type: String,
        minlength: 1,
        required: false
    },
    description:{
        type: String,
        minlength: 1,
        required: false
    },
    date:{
        type: Date,
        default: Date.now
    },
    identification:{
        type: Boolean,
        required: false
    },
    parameters:{
        type: Boolean,
        required: false
    },
    activations:{
        type: Boolean,
        required: false
    },
    adaptations:{
        type: Boolean,
        required: false
    },
    basicsettings:{
        type: Boolean,
        required: false
    },
    codings:{
        type: Boolean,
        required: false
    },
    login:{
        type: Boolean,
        required: false
    },
    freezeframes:{
        type: Boolean,
        required: false
    },
    improvements:{
        type: Boolean,
        required: false
    }
});

var Notes = mongoose.model('notes', NotesSchema)
module.exports = {Notes};