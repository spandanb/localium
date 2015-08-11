var mongoose = require('mongoose');
var User = mongoose.model('User');
var https = require("https");
var querystring = require("querystring");
var request = require('request');

//Get group data
exports.getGroupData = function(req, res, next){
	var query = User.findById(req.user);
	query.exec(function(err, user){
		if (err) {
			return next(err);
		}			
		var qstring = querystring.stringify({
			access_token:user.accessToken,
		});
		
		//My test group
		var GROUP_ID = "813272925411336";
		
		var path = 'https://graph.facebook.com/v2.2/' + GROUP_ID + '/feed?' + qstring; 
		request.get(path, {}, function(error, response, body){
			if (!error && response.statusCode == 200) {
				console.log(body);
				res.send(body);
			}
			else{
				console.log(response.statusCode);
				console.log(error);				
				res.sendStatus(response.statusCode);
			}
		});
	});
	
};

//posts to group
//TODO: Pass message as a param
exports.postToGroup = function(req, res, next, body){
	
	console.log("In PostTOGroup------------------------");
	console.log(req.message)
	console.log(req.body)
	console.log(body);
	//req.url 
	
	var query = User.findById(req.user);
	query.exec(function(err, user){
		if (err) {
			return next(err);
		}
		console.log(user.accessToken);
		var qstring = querystring.stringify({
			access_token:user.accessToken,
			message: "abc-1-2-3 !!"//req.message 
		});		
		//My test group
		var GROUP_ID = "813272925411336";
		
		//var path = 'https://graph.facebook.com/v2.2/feed?' + qstring; //On own wall
		var path = 'https://graph.facebook.com/v2.2/' + GROUP_ID + '/feed?' + qstring; //on group wall
		request.post(path, {}, function(error, response, body){
			if (!error && response.statusCode == 200) {
				console.log(body);
				res.send(body);
			}
			else{
				console.log(response.statusCode);
				console.log(error);				
				res.sendStatus(response.statusCode);
			}
		});
	});
};

//Posts HELLO WORLD message on wall
exports.postHelloWorld = function(req, res, next){
	console.log("In postHelloWorld---------------------------");
	var query = User.findById(req.user);
	query.exec(function(err, user){
		if (err) {
			return next(err);
		}
		var qstring = querystring.stringify({
			access_token:user.accessToken,
			message: "Hello, world" //POST
		});
		
		var path = 'https://graph.facebook.com/v2.2/feed?' + qstring;
		
		//Approach 1
		/*
		request.post(path).on('response', function(response){
			console.log(response);
		});
		*/
		
		//Approach 2
		request.post(path, {}, function(error, response, body){
			if (!error && response.statusCode == 200) {
				console.log(body);
				res.send(body);
			}
			else{
				console.log(response.statusCode);
				console.log(error);				
				res.sendStatus(response.statusCode);
			}
		});		
	});
};
		

//Get FB Profile		
exports.getFBProfile = function(req, res, next){
	console.log(req.user);
	console.log("IN here--------------------------");
	var query = User.findById(req.user);
	query.exec(function(err, user){
		if (err) {
			return next(err);
		}		
		var qstring = querystring.stringify({
			access_token:user.accessToken,
		});
		var path = '/v2.2/me?' + qstring;
		var options = {
			host: 'graph.facebook.com',
			path: path,
		}
		
		//Get Profile		
		var request = https.get(options, function(response) {
			console.log('STATUS: ' + response.statusCode);
			console.log('HEADERS: ' + JSON.stringify(response.headers));
		      
			// Buffer the body entirely for processing as a whole.
			var bodyChunks = [];
			response.on('data', function(chunk) {
			  // You can process streamed parts here...
			  bodyChunks.push(chunk);
			}).on('end', function() {
			  var body = Buffer.concat(bodyChunks);
			  console.log('BODY: ' + body);
			  res.send(body);
			  // ...and/or process the entire body here.
			})
	        });		
	        request.on('error', function(e) {
			console.log('ERROR: ' + e.message);
		});
		
	});
	
};
