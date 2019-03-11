require('./config/config');
const express = require('express');
const bodyparser = require('body-parser');
const _ = require('lodash');
const {ObjectID} = require('mongodb');

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

app.patch('/editNote/:id', (req, res)=>{
    //get id
    var id = req.params.id;

    var body = _.pick(req.body, ['author', 'title', 'text', 'date' ]);

    //save new body replacing current note
    Notes.findByIdAndUpdate({_id: id}, {$set: body}, {new: true}).then((note)=>{
        if(!note){
            return res.status(400).send();
        } 

        res.send({note});
    }).catch((e)=>{res.status(400).send(e)});
});

app.delete('/deleteNote/:id', (req, res) =>{
    var id = req.params.id;

    if(!ObjectID.isValid(id)){
        return res.status(400).send();
    }

    Notes.findByIdAndRemove({_id: id}).then((note)=>{
        if(!note){
            return res.status(400).send();
        }

        res.status(200).send();
    }).catch((e)=>res.status(400).send(e));
});

app.listen(port, () =>{
    console.log('Started at port: ', port);
});

module.exports = {app};