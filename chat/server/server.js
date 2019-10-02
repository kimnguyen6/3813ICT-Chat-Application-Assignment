const express = require('express');
const app = express();
const cors = require('cors');
const http = require('http').Server(app);
var fs = require('fs');
//const io = require('socket.io')(http);
//const socket = require('./socket.js');
const path = require('path');
var bodyParser = require('body-parser');
//const MongoClient = require('mongodb').MongoClient;
//const formidable = require('formidable');

//const PORT = 3000;

app.use(express.static(path.join(__dirname, '../dist/chat')));
//app.use('/image', express.static(path.join(__dirname, './image.js')));
app.use(bodyParser.json());

app.use(cors());

 require("./routes/api-login.js")(app, path);

// const url = 'mongodb://localhost:27017';
// MongoClient.connect(url, {poolSize:10, useNewUrlParser: true, useUnifiedTopology: true}, function(err, client){
//     if (err) {return console.log(err)}
//     const dbName = "assessment2";
//     const db = client.db(dbName);

//     require("./routes/api-login.js")(db, app, path);
// });

app.listen(3000, "127.0.0.1", function() {
    console.log("server starting");
});