const express = require('express');
const app = express();
const cors = require('cors');
const http = require('http').Server(app);
var fs = require('fs');
const io = require('socket.io')(http);
const socket = require('./socket.js');
const path = require('path');
var bodyParser = require('body-parser');
const MongoClient = require('mongodb').MongoClient;
var ObjectID = require('mongodb').ObjectID;
const formidable = require('formidable');

app.use(express.static(path.join(__dirname, '../dist/chat')));
app.use('/images', express.static(path.join(__dirname, './userImages')));
app.use(bodyParser.json());


const PORT = 3000;

app.use(cors());

socket.connect(io, PORT);

const url = 'mongodb://localhost:27017';
MongoClient.connect(url, {poolSize:10, useNewUrlParser: true, useUnifiedTopology: true}, function(err, client){
    if (err) {return console.log(err)}
    const dbName = "dbas2";
    const db = client.db(dbName);

    require("./listen.js")(http);
    require("./routes/api-login.js")(db, app, path, ObjectID, formidable);
});