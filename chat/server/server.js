const express = require('express');
const app = express();
const cors = require('cors');
const http = require('http').Server(app);
var fs = require('fs');
//const io = require('socket.io')(http);
//const socket = require('./socket.js');
const path = require('path');
var bodyParser = require('body-parser');
//const formidable = require('formidable');

//const PORT = 3000;

app.use(express.static(path.join(__dirname, '../dist/chat')));
//app.use('/image', express.static(path.join(__dirname, './image.js')));
app.use(bodyParser.json());

app.use(cors());

app.listen(3000, "127.0.0.1", function() {
    console.log("server starting");
});

require("./routes/api-login.js")(app, path);