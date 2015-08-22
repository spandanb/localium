var passport = require('passport');

var path = require('path');
var user = require('../controllers/user');
var post = require('../controllers/post');
var survey = require('../controllers/survey');
var chat = require('../controllers/chat');
var auth = require('../config/auth');
var fb = require('../controllers/fb');
var offer = require('../controllers/offer');

module.exports = function(app){

//Useful for debugging
app.all('*', function(req, res, next){
        //Output string
        /*req.session.ip_addr = req.connection.remoteAddress;
        var output = "\n" + req.method + " " + req.url;
        if (!!req.body && Object.keys(req.body).length) { //Contains passed in params
            output += ", " + JSON.stringify(req.body);
        }
        output += "; IP ADDR: " + req.connection.remoteAddress;*/
        //console.log(output);
        next();
});

//app.get('/fb/test', fb.postToGroup);

//app.get('/auth/facebook', passport.authenticate('facebook', { scope: ['user_friends', 'email', 'user_groups', 'publish_actions'] }));
app.get('/auth/facebook', 
        passport.authenticate('facebook', 
            {
             //authType: 'reauthenticate', display: 'touch',
             scope: ['email'] }));

//request extended permissions
//app.get('/auth/facebook_extend_permissions', passport.authenticate('facebook', { scope: ['user_groups', 'publish_actions'] }));

//This is the callback FB uses
//This works
//app.get('/auth/facebook/callback', 
//  passport.authenticate('facebook', { successRedirect: '/home', //person/me/feed', //'/home',
//                                    failureRedirect: 'http://localhost:8100/#/login' }));

/*app.get('/auth/facebook/callback', function(req, res, next){
    var querystring = require('querystring');
    
    console.log(req.session.passport); 
    console.log("----------------------------------------");
    passport.authenticate('facebook', function(err, user, info) {
    console.log(req.session.passport); 
    //if (err) { return next(err); }
    //if (!user) { return res.redirect('/login'); }
    req.logIn(user, function(err) {
      //if (err) { return next(err); }
      //return res.redirect('/users/' + user.username);

        
        var response = {userId: null} 
        if(!!req.user && !!req.user._id){
            response.userId = req.user._id;
        }
        console.log(req.user);
        console.log("Login successful. Replying with: "); 
        //console.log(response);
        //res.json(response); //For old way return url
        
        //url doesn't matter; need to encode userid in url, 
        // and be consistent with what the client expects, since
        //it will be intercepted by client 
       
        var path = "";
        //TODO: investigate why we need if cond.
        if(!!req.user){
            path = '/home/person?userId='+ req.user._id ; //new way
        }
        res.redirect(path);
    });
  })(req, res, next);
});*/

app.get('/auth/facebook/callback', 
  passport.authenticate('facebook', { successRedirect: '/#/home',
                                      failureRedirect: '/#/login' }));
/*
Hack to send {userId: <userId>} to url with that page
*/
app.get('/home/person?', function(req, res, next){
    console.log("In userId route *******************************")
    //parser only matches url; not query params
    //therefore, manually parse url
    var url = req.originalUrl;
    //Extracts userId; only works for urls like
    // /home/person?userId=550f931b65ba097d455d1f8e
    var userId = url.split("?")[1].split("=")[1];
    console.log(userId)
    res.json({userId: userId});
});

app.get('/ensureAuthenticated', auth.ensureAuthenticated);

app.delete('/session',user.logOut);
app.get('/session',user.session);

/*app.get('/home',auth.ensureAuthenticated,function(req,res){
	console.log("In route.js:/home/------------------");
	console.log(req.session.passport.user);
	console.log(req.user);
	var id = req.user;	
	res.redirect('http://localhost:8100/#/home/person/'+ id+ '/feed');
});*/
app.get('/auth/instagram', passport.authenticate('instagram'));

app.get('/auth/instagram/callback', 
  passport.authenticate('instagram', { successRedirect: '/home',
                                      failureRedirect: '/#/login' }));

app.post('/postToFB', auth.ensureAuthenticated, post.postToGroup);
//app.post('/postToFB', auth.ensureAuthenticated, fb.postToGroup); //Doesn't work!

app.post('/signup',user.createUser);
app.post('/login', user.findUser); 

app.post('/survey', auth.ensureAuthenticated, survey.recordResponse); 

//Create new item
app.post('/posts', auth.ensureAuthenticated, post.createPost); 

//Get all items
app.get('/posts', post.loadFeed);

//Get filtered items
app.post('/posts/filter', auth.ensureAuthenticated, post.filter);

//Get one item
app.get('/posts/:id',auth.ensureAuthenticated, post.findById);
//update an item
app.post('/posts/:postId',auth.ensureAuthenticated, post.update);
app.post('/comments', auth.ensureAuthenticated, post.createComment);
app.post('/chat' , auth.ensureAuthenticated, chat.createChat);
app.get('/chat', auth.ensureAuthenticated, chat.getChat);
app.get('/getMessage',auth.ensureAuthenticated, chat.message);
app.get('/user/:userId',auth.ensureAuthenticated,user.profile);
app.get('/mypost/:userId',auth.ensureAuthenticated,post.findByUser);
app.post('/offerPrice',auth.ensureAuthenticated,post.offerPrice);
app.post('/acceptOffer',auth.ensureAuthenticated,post.acceptOffer);
app.post('/cancelOffer', auth.ensureAuthenticated,post.cancelOffer);
//load more, inifnte scrolling 
app.get('/loadMore',auth.ensureAuthenticated,post.loadMore);

app.get('/offers', auth.ensureAuthenticated, offer.getOffers);

};

