var mongoose = require('mongoose'),
  User = mongoose.model('User'),
  Post = mongoose.model('Post'),
  Comment = mongoose.model('Comment'),
  passport = require('passport'),
  ObjectId = mongoose.Types.ObjectId;
   var Chat = mongoose.model('ChatPage');
var AWS = require('aws-sdk');

AWS.config.update({accessKeyId:'AKIAIMBDS5HNB5MNHJNQ',secretAccessKey:'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'});
var s3 = new AWS.S3(); 

var https = require("https");
var querystring = require("querystring");
var request = require('request');  
  
exports.createPost = function(req,res){
    console.log("Post being created");
    //console.log(req.body.categories);
    //console.log(req.body.size);
    
    var imageUrl =[];
    var eTag = [];
    
      s3.createBucket({Bucket:'haberdashery'}, function(){
        for(var i=0; i<req.body.images.length; i++){
          var buf = new Buffer(req.body.images[i].replace(/^data:image\/\w+;base64,/, ""),'base64');
          var title = req.body.title.split(' ').join('_');     
          var dateId = Date.now().toString();
          var key =  [dateId, title, Math.random()].join('_');
          imageUrl.push("https://s3.amazonaws.com/haberdashery/" +key);
          var params = {
            Bucket: 'haberdashery', 
            Key: key, 
            Body:buf,
            ContentEncoding:'base64',
            ContentType:'image/jpeg' };

  	      s3.putObject(params, function(err, data) {

            if (err) console.log(err);     
      	    else{ 
      		    console.log("Successfully uploaded data to haberdashery/myKey");   
      		   // console.log(data);
              eTag.push(data);
              console.log(req.body.images.length);
              console.log(eTag.length);

              if(req.body.images.length == eTag.length){
                  var post = new Post({
                       creator:req.body.personId,
                       imageUrl:imageUrl, //The url for Amazon
                       description:req.body.description,
                       title:req.body.title,
                       price:req.body.price,
                       size:req.body.size,
                       category:req.body.category,

                       tags: req.body.tags,
                       condition: req.body.condition,

                       //Category specific fields
                       brand: req.body.brand,
                       year: req.body.year,
                       size: req.body.size,
                       bookTitle: req.body.bookTitle,
                       author: req.body.author, 
                       course: req.body.course,
                       edition:req.body.edition,
                       manufacturer:req.body.manufacturer

                  });
                  post.save(function(err){
                    if(err){
                        console.log('there is error'+err);
                        res.send(err);                        
                    }
                    else{
                        //done(null,newUser);
                        res.send(post);               
                    } 
                  });
              }
      	    }
   	      });
        }

      });
};

exports.search = function(req, res){
    //TODO: Extend this search tags and other fields
    var searchText = req.body.searchText;
    Post.find(
        {"title": 
            {"$regex" : searchText, "$options": "i"} 
        },
        function(err, posts){
            console.log(posts)
            res.send(posts);
        }
    )
}

exports.filter = function(req,res){
    console.log("In filter");
    /*
     //query must be of the form
     Post.find()
      .and([
          { $or: [{a: 1}, {b: 1}] },
          { $or: [{c: 1}, {d: 1}] }
      ])
      .exec(function (err, results) {
          ...
      });
    */

    //Construct query 
    var query = [];
    if(req.body.categories.length){
        var category_select = [];
        for(var i=0; i<req.body.categories.length; i++){
            category_select.push({'categories': req.body.categories[i] });
        }
        query.push({ $or: category_select} );
    }
    
    if(req.body.size.length){
        var size_select = [];
        for(var i=0; i<req.body.size.length; i++){
            category_select.push({'size': req.body.size[i] });
        }
        query.push({ $or: size_select} );
    }

    Post.find()
        .and(query)
        .populate('creator',
                  'providerId displayName')
        .sort({updated:-1})
    .exec(function(err, posts){
        if(err){
            console.log(err);
            res.status(500).json(err);
        }else {
            res.status(200).json(posts)
        }
    });
}

//Get total number of posts
exports.count = function(req, res){
    var category = req.query.category; 
    Post.count({category:category}, function(err, count){
        if(!err){
           res.json({count:count});
        }
    });
}

exports.loadFeed = function(req,res){
    //@param count: number of documents requested, (optional; default=all)
    //@param offset: offset for the number of document 
    console.log("In loadFeed");
    var category = req.query.category; 
    //Basic query
    var query = Post.find({category: category})
                .populate('creator','providerId displayName')
                .populate('comments');

    var count = req.query.count;
    if(!!count){
        count = parseInt(count);
        var offset = req.query.offset || 0;

        query = query.sort({updated: -1})
        .limit(count)
        .skip(offset)
    }

    query.exec(function(err, posts){
        if (err) {
           res.status(500).send(err);
        } else {
           res.status(200).json(posts);
        }
    });
};

exports.loadMore = function(req,res){
  console.log('Calling more posts');
  console.log(req.query.postId);
  var oid = new ObjectId(req.query.postId);

  Post.find({"_id":{$lt:oid}}).populate('creator','providerId displayName').sort({updated:-1}).limit(10).exec(function(err,posts){
          if (err) {
            console.log(err);
               res.json(500, err);
            } else {
              //console.log(posts);
               res.json(posts);
            }
  });
};

//Finds an item with the mathching id
exports.findById = function (req, res, next) {
    console.log("Getting item with id: " + req.params.id);	
    var query = Post.findById(req.params.id);
    query
    //.populate('comments offerPrice.username consumer','displayName')
    .populate('creator', 'providerId displayName')
    .populate('comments')
    .populate('offerPrice.username','displayName')
    .exec(function (err, post){
        if (err) { return next(err); }
        if (!post) { return next(new Error("can't find item")); }

        req.post = post;
        res.send(post);
    
    });
};

exports.findByUser = function (req, res) {
	console.log(req.params);
	 Post.find({creator:req.params.userId}).populate('creator','providerId displayName')
                .populate('comments').sort({created:-1}).exec(function(err,post){
	 			console.log(post);
	 			res.send(post);
	 	});
};


exports.createComment = function(req, res, next){
	//console.log("In create comment");
	console.log(req.body);

	var comment = new Comment({creator:req.body.personId,
				message:req.body.message,
				post:req.body.postId,
        displayName:req.body.displayName,
        providerId:req.body.providerId
				});
	comment.save(function(err){
		if(err){return next(err);}
		else{
			//console.log("Comment created");
			//console.log(comment);
			//Add comment to post object
			var query = Post.findById(req.body.postId);

			console.log(req.body.postId);			
			query.exec(function(err, post){
				//console.log("here2");
				if(err){return next(err);}
				if (!post) {
					console.log("Can't find post with id: " + req.body.postId);
				}
				//console.log("here");
				post.comments.push(comment._id);
				
				post.save(function(err, post){
					if(err){ return next(err); }
				
					//console.log(post);
					//res.json(post);
					//console.log("Save successful");
				});
			    res.send(comment); 							
			})
		 }
	});
};

exports.update = function(req,res){
    console.log('going to the update method');
    console.log(req.body);

	 Post.findOne({_id:req.params.postId}, function(err, post){
	 		if(err) {res.json(500, err);}
  			else{
  				 if(!post) console.log('The postId is messed up');
  				 //console.log(post);
  				 post.title = req.body.title;
  				 post.message = req.body.message;
  				 post.price = req.body.price;
  				 post.status = req.body.status;
  				 console.log(post);
  				 post.save(function(err,post){
  				 		if(err) res.json(500, err);
  				 		else{
  				 			console.log('Its working');
  				 			res.send(200);
  				 		}
  				 });
  				}
	 	});

};

exports.makeOffer = function(req, res){
    
    var offer = new Offer({
       post: req.body.postId,
       by: req.body.personId,
       amount: req.body.offerPrice,
       status: 'placed'
    });
    offer.save(function(err){
        if(err){
            console.log("ERROR: " + err);
            res.sendStatus(500);
        }else{
            //Update post
	        Post.findOne({_id: req.body.postId},
                function(err,post){
                    if(!err){
                        post.offers.push(offer);
                    }
                }
             );
            //Update user
	        User.findOne({_id: req.body.personId},
                function(err,user){
                    if(!err){
                        user.offers.push(offer);
                    }
                }
            );
            res.sendStatus(200);
        }
    });
}


//TODO: replace with makeoffer
exports.offerPrice = function(req,res){
	console.log(req.body);
	Post.findOne({_id:req.body.postId},function(err,post){
		if(err){res.json(500,err)}
		else{
			if(!post)console.log('The POSTID is messed up');
			//TODO: User offer
            post.offerPrice.push({username:req.body.personId,price:req.body.offerPrice});//Remove
			post.save(function(err){
  				 		if(err)console.log('Couldnt save in the database');
  				 		else{
  				 			console.log('Its working');
  				 			res.send(200);
  				 		}
  				 });
		}
	});
};

exports.getFBUserId = function(req, res, next){
    //Returns the Facebook user-id of the current user
	query.exec(function(err, user){
		if (err) {
			return next(err);
		}
        res.send({"user_fbId": user.FBId});
    });
}

exports.postToGroup = function(req, res, next){
	
	console.log("In PostTOGroup------------------------");	
	var query = User.findById(req.user);
	query.exec(function(err, user){
		if (err) {
			return next(err);
		}
		console.log(user.accessToken);
		var qstring = querystring.stringify({
			access_token:user.accessToken,
			message: req.body.message 
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
}

exports.acceptOffer = function(req,res){

	console.log(req.body);
	Post.findOne({_id:req.body.postId},function(err,post){
		if(err){res.json(500,err)}
		else{
			if(!post)console.log('The POSTID is messed up');
			post.consumer = req.body.consumer._id;

            //Update status
            for(var i=0; i<post.offers.length; i++){
                var offer = post.offers[i];
                if(offer.by == req.body.consumer._id){
                    offer.status = "accepted"
                }
                else{
                    offer.status = "rejected"
                }
            }

			post.status = 'On Hold';
			post.save(function(err){
  				 if(err)console.log('Couldnt save in the database');
  				 else{
  				 		console.log('accept offer saved the post');
  				 		//res.send(200);
  				 	}
  			});
  			//chat.createChat(req,res);
  			Chat.findOne({postCreator:req.body.postCreator,postId:req.body.postId}, function(err,chat){
    			if(err){
     			 res.json(500,err);
    			}else{
      				console.log(chat);
      				if(!chat){
        			console.log('creating chat in the acceptOffer');
        			var newChat = new Chat({creator:req.body.consumer._id,postId:req.body.postId,postCreator:req.body.postCreator});
        			newChat.save(function(err){
          			if(err){
           				 res.json(500,err);
          			}else{
             			res.send(newChat);}
        			});

      				}else{
      					console.log('chat already exists in the acceptOffer')
      					res.json(post);
      				}
    			}

  			});
		}
	});
};

exports.cancelOffer = function(req,res){
console.log('going to the cancel offer method');
console.log(req.body);
     
	 Post.findOne({_id:req.body.postId}, function(err, post){
	 		if(err) {res.json(500, err);}
  			else{
  				 if(!post) console.log('The postId is messed up');
  				 //console.log(post);
  				 post.consumer = null;
  				 post.status = 'Available';
  				 console.log(post);
  				 post.save(function(err,post){
  				 		if(err) res.json(500, err);
  				 		else{
  				 			console.log('Its working');
  				 			res.send(post);
  				 		}
  				 });
                //Update status
                for(var i=0; i<post.offers.length; i++){
                        var offer = post.offers[i].status = 'placed';
                    }
  				}
	 	});
};
