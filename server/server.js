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

//notes
app.post('/addNote', (req, res) =>{
    var note = new Notes({
        title: req.body.title,
        text: req.body.text,
        author: req.body.author,
        date: req.body.date,
        //_createdBy: req.user._id
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
    Notes.findByIdAndUpdate({_id: id /*_createdBy: req.user._id*/}, {$set: body}, {new: true}).then((note)=>{
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

    Notes.findByIdAndRemove({_id: id, /*_createdBy: req.user._id*/}).then((note)=>{
        if(!note){
            return res.status(400).send();
        }

        res.status(200).send();
    }).catch((e)=>res.status(400).send(e));
});

app.get('/loadNotes', (req, res)=>{
    Notes.find({/*_createdBy: req.user._id*/}).then((notes)=>{
        res.send({notes});
    }, (e) =>{
        res.status(400).send(e);
    });
});

app.get('/loadNote/:id', (req, res)=>{
    var id = req.params.id;

    if(!ObjectID.isValid(id)){
        return res.status(404).send();
    }

    Notes.findOne({
        _id: id,
        //_createdBy: req.user._id
    }).then((note)=>{
        if (!note){
            return res.status(404).send({});
        } 

        res.send({note});
    }).catch((e)=> res.status(400).send(e));
});

//============================================================
//users
//============================================================
app.post('/addUser', (req, res) =>{
    var body = _.pick(req.body, ['nick', 'email', 'password']);
    var user = new Users(body);

    user.save().then((user)=>{
        res.send(user);
    }, (e)=>{
        res.status(400).send(e);
    });
});

app.patch('/editUser/:id', (req, res)=>{
    //get id
    var id = req.params.id;

    var body = _.pick(req.body, ['nick', 'email', 'password']);

    //save new body replacing current user
    Users.findByIdAndUpdate({_id: id}, {$set: body}, {new: true}).then((user)=>{
        if(!user){
            return res.status(400).send();
        } 

        res.send({user});
    }).catch((e)=>{res.status(400).send(e)});
});

app.delete('/deleteUser/:id', (req, res) =>{
    var id = req.params.id;

    if(!ObjectID.isValid(id)){
        return res.status(400).send();
    }

    Users.findByIdAndRemove({_id: id}).then((user)=>{
        if(!user){
            return res.status(400).send();
        }

        res.status(200).send();
    }).catch((e)=>res.status(400).send(e));
});

app.get('/loadUsers', (req, res)=>{
    Users.find({/*_createdBy: req.user._id*/}).then((users)=>{
        res.send({users});
    }, (e) =>{
        res.status(400).send(e);
    });
});

app.get('/loadUser/:id', (req, res)=>{
    var id = req.params.id;

    if(!ObjectID.isValid(id)){
        return res.status(404).send();
    }

    Users.findOne({_id: id}).then((user)=>{
        if (!user){
            return res.status(404).send({});
        } 

        res.send({user});
    }).catch((e)=> res.status(400).send(e));
});

app.post('/user/login', (req, res)=>{

});

app.listen(port, () =>{
    console.log('Started at port: ', port);
});

module.exports = {app};