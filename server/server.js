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


app.listen(port, () =>{
    console.log('Started at port: ', port);
});