require('./config/config');
const express = require('express');
const bodyparser = require('body-parser');

var {mongoose} = require('./db/mongoose');
var {Notes} = require('./models/notes');
var {Users} = require('./models/users');

var app = express();
var port = process.env.PORT || 3000;

app.use(bodyparser.json()); //provides POST operations + json request body support

//app requests
app.post('/addNote', (req, res) =>{
    var note = new Notes({
        title: req.body.title,
        text: req.body.text,
        author: req.body.author,
        date: req.body.date
    });

    note.save().then((note)=>{
        res.send(note);
    }, (e)=>{
        res.status(400).send(e);
    });
});

app.patch('/editNote', (req, res)=>{
    
})

app.listen(port, () =>{
    console.log('Started at port: ', port);
});

module.exports = {app};