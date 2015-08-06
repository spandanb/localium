var express = require('express');
var app = express();
var http = require('http');
//var socket =require('socket.io');
server = http.createServer(app);
//var io = socket.listen(server);
var path = require('path');
var fs = require('fs');


app.use('/*', function(req, res, next) {
    //req.get("Access-Control-Allow-Origin", "*");
    //res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Origin", "http://localhost:8100");
    res.header('Access-Control-Allow-Methods', 'OPTIONS,GET,POST,PUT,DELETE');
    res.header('Access-Control-Allow-Credentials', 'true');
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type,Authorization, Accept");
    next();
});


app.use(express.static(path.join(__dirname, 'client')));
app.set('port', process.env.PORT || 9000);

//require('./server/config/route')(app);
//require('./server/config/socketRoute')(io);
server.listen(app.get('port'), function () {
    console.log('Express server listening on port ' + app.get('port'));
});
    

