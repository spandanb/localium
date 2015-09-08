var path = require('path');
var usernames =[];
var users ={};
var sockets ={};
var user = require('../controllers/user');
var post = require('../controllers/post');
var chat = require('../controllers/chat');
var mongoose = require('mongoose');
var Chat = mongoose.model('ChatPage');
module.exports = function(io){


io.on('connection', function(socket){
	
	console.log('Socket Connection is on');

 	socket.on('newUser', function(data){
    	console.log(' I am on' + data.username  );
    	socket.username = data.username;
	 	socket.userId = users.length;
	
		sockets[data.username] = socket;
  	});

  	socket.on('new message',function(data){
  		console.log(data);
      if(sockets[data.userId] == undefined || sockets[data.userId] == null ){
        socket.username = data.userId;
        sockets[data.userId] =socket.userId = users.length;
        sockets[data.userId] = socket;
      }else{
        sockets[data.userId] = socket;
      }
		  Chat.findOne({_id:data.chatId}).populate('creator postCreator' , 'displayName providerId displayName providerId').exec(function(err,chat){
			  if(err) console.log('Socket Chat is not working');
  			else{
  				 if(!chat) console.log('The chatId is messed up');
  				 //console.log(chat);
  				 if(data.username == chat.creator._id) {
            username = chat.creator.displayName; 
            userId =chat.creator._id; 
            providerId = chat.creator.providerId;
            }else {
              username = chat.postCreator.displayName; 
              userId = chat.postCreator._id;
              providerId = chat.postCreator.providerId;
            }
            var datenow = Date.now();
  				 chat.message.push({username:username,content:data.content,userId:userId,providerId:providerId,created:datenow});
  				 chat.save(function(err){
  				 		if(err)console.log('Couldnt save in the database');
  				 		else{
  				 			console.log('Its working');

  				 		}
  				 });

  			}

  			if(sockets[chat.postCreator._id] != undefined && sockets[chat.creator._id] != undefined){
				console.log('This basically means that the message is to the blogger');
				//console.log(chatPage.blogger.username);
				sockets[chat.postCreator._id].emit('privateMessage',{content:data.content, username:username ,userId:userId,providerId:providerId,created:datenow})	;
				sockets[chat.creator._id].emit('privateMessage',{content:data.content, username:username ,userId:userId,providerId:providerId,created:datenow})	;
			   }else{
				console.log(sockets[data.userId]);
        console.log(providerId);
         		sockets[data.userId].emit('privateMessage',{content:data.content, username:username ,userId:userId, providerId:providerId,created:datenow});
			   }


		  });

    });
  
 
  
  	socket.on('disconnect', function(data){
  		if(!socket.nickname) return;
  		delete users[socket.nickname];
  		
  		io.sockets.emit('usernames',users);
  	});
  	
});


}