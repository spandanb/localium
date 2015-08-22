var mongoose = require('mongoose'),
  User = mongoose.model('User'),
  passport = require('passport'),
  ObjectId = mongoose.Types.ObjectId;
  
var auth = require('../config/auth');

exports.createUser = function(req,res){
	console.log(req.body);
		var newUser = new User({email: req.body.email,
                                password: req.body.password
                             });
   	newUser.save(function(err){
   		if(err){
				console.log('there is error'+err);
				res.send(err);				   							
   			}
   		else{
				//done(null,newUser);
				res.send(newUser); 							
   			}
   						
   		});
};

exports.findUser = function(req,res){
	console.log(req.body);
	 User.findOne({email:req.body.email}, function(err,user){
	 			console.log(user);
	 			res.send(user);
	 	});
};

//Doesn't work- doesn't  
//invalidate Facebook token
exports.logOut2 = function(req, res){
  if(req.user) {
    req.logout();
    res.send(200);
  } else {
    res.send(400, "Not logged in");
  }
}

exports.logOut = function(req,res){
  var request = require('request');
  var querystring = require('querystring');
  
  console.log("In logout");
  if(req.user) {
    console.log("User found");
    console.log(req.user);
	User.findOne({_id: req.user}, 
        function(err, user){
            if(!err){
                console.log(user);
                console.log(user.accessToken);
                
                //Invalidate the access_token
                var qstring = querystring.stringify({
                    access_token: user.accessToken
                });
                var path = "https://graph.facebook.com/v2.3/me/permissions?" + qstring;
                //console.log(path);
                request.del(path, {}, function (error, response, body){
                    console.log("Deleting Token");
                    console.log(error);
                    console.log(body);
                });
                
                //Log user out of FB
                qstring = querystring.stringify({
                   //confirm: '1',
                   next: 'http://45.55.156.158:9000',
                   access_token: user.accessToken
                });
                path = "https://www.facebook.com/logout.php?" + qstring; 
                request.post(path, {}, function (error, response, body){
                    console.log("Logging out of FB");
                    console.log(error);
                    //console.log(response);
                    //console.log(body);
                });
                
            }
        });
    console.log("Destroying session");
    req.session.destroy();
    req.logout();
    res.sendStatus(200);
  } else {
    res.send(400, "Not logged in");
  }
};

exports.profile = function(req,res){
	console.log("Profile being called");
	//console.log(req);
	User.findOne({_id:req.user}, function(err,user){
	 			console.log(user);
	 			res.status(200).send(user);
	 	});
};

exports.session = function(req,res,next){
	console.log("session method is being called");
	console.log(req.session);
	//next({personId:req.user});
	//res.send({personId:req.user});
  User.findOne({_id:req.user}, function(err,user){
        console.log(user);
        res.status(200).send(user);
    });
};

