var passport =require('passport');
var FacebookStrategy =require('passport-facebook').Strategy;
var InstagramStrategy =require('passport-instagram').Strategy;
var mongoose = require('mongoose');
var  User = mongoose.model('User');
	
	passport.serializeUser(function(user, done) {
		//console.log("In serializeUser");
		//console.log(user);
		done(null, user._id);
	});

	passport.deserializeUser(function(obj, done) {
		//console.log("In deserializeUser");
		//console.log(obj);
		done(null, obj);
	});
	
passport.use(new FacebookStrategy({
	clientID: '857581521001557', //Spandan
	clientSecret: '0e1cdebce300cc09763b88e9c157fe15', //Spandan
	//clientID: '799344473467471', //Aditya
    //clientSecret: 'bb23deaf1ed3b4f80108bf2134791b80', //Aditya
    //callbackURL: "/auth/facebook/callback"
    callbackURL: "http://104.236.1.23:9000/auth/facebook/callback"
	},
	function(accessToken, refreshToken, profile, done) {
			console.log("THE ACCESS TOKEN IS: ----------------------------------------");
            console.log(accessToken);
			User.findOne({providerId:profile.id}, function(err,user){
				if (err) {
      			return done(null, false, err);
   			} else {
                if(user){
                        console.log('The User already exists');
   						user.FBId = profile.id;
   						user.accessToken = accessToken;
   						user.save(function(err){
   						if(err){
							console.log("Unable to save user");
							return done(null, false, err);}
   						else{
							console.log('New Access Token');
							done(null,user);  							
   						}
   						
   						});
					  					
   					}
   				else{
   					console.log('Creating a user');
   					var newUser = new User({providerId: profile.id,
                                            accessToken: accessToken,
                                            displayName: profile.displayName,
                                            provider: profile.provider,
                                            gender: profile.gender,  
                                            json: profile._json});
   					newUser.save(function(err){
   						if(err){
								console.log('there is error'+err);					   							
   							return done(null, false, err);}
   						else{
									done(null,newUser);  							
   							}
   						
   						});
   				}
   			}
			 });
			
   }

));

passport.use(new InstagramStrategy({
    clientID:  	'6e4a57c9b0ea4d55a9103fd226609d86',
    clientSecret: '2fab98ac6d6a4656a2d16ac643813fe1',
    callbackURL: "http://localhost:9000/auth/instagram/callback"
  },
  function(accessToken, refreshToken, profile, done) {

    console.log(accessToken);
    User.findOne({providerId:profile.id}, function(err,user){
				if (err) {
      			return done(null, false, err);
   			} else {
   				if(user){
   						console.log('The User already exists');
   						user.accessToken = accessToken;
   						user.save(function(err){
   						if(err)return done(null, false, err);
   						else{
   								console.log('New Access Token');
									done(null,user);  							
   							}
   						
   						});
					  					
   					}
   				else{
   					console.log('Creating a user');
   					var newUser = new User({providerId:profile.id,accessToken:accessToken,displayName:profile.displayName,provider:profile.provider,gender:profile.gender,json:profile._json});
   					newUser.save(function(err){
   						if(err){
								console.log('there is error'+err);					   							
   							return done(null, false, err);}
   						else{
									done(null,newUser);  							
   							}
   						
   						});
   				}
   			}
			 });
			
   }
  
));
