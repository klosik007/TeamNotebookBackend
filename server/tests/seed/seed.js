const {ObjectID} = require('mongodb');

const {Notes} = require('./../../models/notes');
const {Users} = require('./../../models/users');

var note1ID = new ObjectID();
var note2ID = new ObjectID();
var user1ID = new ObjectID();
var user2ID = new ObjectID();

var notes = [{
    _id: note1ID,
    title: "How begin to programming?",
    text: "JUST CLAP YOUR FINGERS ON KEYBOARD AND DO NOT HESITATE!",
    author: "Przemysław Kłos",
    date: new Date(2019, 1, 31)
},
{
    _id: note2ID,
    title: "How to have a rest?",
    text: "Less phone, more meetings with people. Less internet, more fresh air",
    author: "Przemysław Kłos",
    date: new Date(2018, 12, 31)
}];

var users =[{
    _id: user1ID,
    nick: "klosik007",
    email: "pklos1992@gmail.com",
    password: "password8765",
    tokens:[{
        access: "authi",
        token: "token1"
    }]
},
{
    _id: user2ID,
    nick: "pklos",
    email: "premius@op.pl",
    password: "qwertyuiop12345678",
    tokens:[{
        access: "authi",
        token: "token2"
    }]
}];

const populateNotes = ((done)=>{
    Notes.remove({}).then(()=>{
        Notes.insertMany(notes);
    }).then(()=>done());
});

const populateUsers = ((done)=>{
    Users.remove({}).then(()=>{
        Users.insertMany(users);
    }).then(()=>done());
});

module.exports = {notes, populateNotes, users, populateUsers};