var express = require('express');
var app = express();
var http = require('http');
var socket =require('socket.io');
var server = http.createServer(app);
var io = socket.listen(server);
var path = require('path');
var fs = require('fs');
var passport = require('passport');
var mongoose = require('mongoose');
var session = require('express-session');
var mongoStore = require('connect-mongo')(session);
var config = require('./server/config/config'); 
var bodyParser = require('body-parser');
var db = require('./server/db/mongo').db;
var modelsPath = path.join(__dirname, 'server/models');
var cookieParser = require('cookie-parser');
app.use(bodyParser.json({limit: '50mb'}));
app.use(cookieParser());
//Getting all the models from the server/models folder
fs.readdirSync(modelsPath).forEach(function (file) {
  require(modelsPath + '/' + file);
});

app.use(session({
  secret: 'MEAN',
  saveUninitialized: false, //true 
  resave: false, //true
  store: new mongoStore({
    url: config.db,
    collection: 'sessions',
    
  })
}));
var pass = require('./server/config/pass.js');
//
app.use(passport.initialize());
app.use(passport.session());


app.use('/*', function(req, res, next) {
    //req.get("Access-Control-Allow-Origin", "*");
    //res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Origin", "http://localhost:8100");
    res.header('Access-Control-Allow-Methods', 'OPTIONS,GET,POST,PUT,DELETE');
    res.header('Access-Control-Allow-Credentials', 'true');
    //res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type,Authorization, Accept");
    next();
});


app.use(express.static(path.join(__dirname, 'client')));
app.set('port', process.env.PORT || 9000);

require('./server/config/route')(app);
require('./server/config/socketRoute')(io);
server.listen(app.get('port'), function () {
    console.log('Express server listening on port ' + app.get('port'));
});
