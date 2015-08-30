'use strict';

var mongoose = require('mongoose'),
  Chat = mongoose.model('ChatPage');
var Post = mongoose.model('Post');
var ObjectId = mongoose.Types.ObjectId;
/**
 * Find chat by id
 */
exports.chatPage = function(req, res, next, id) {
  Chat.load(id, function(err, chatPage) {
    if (err) return next(err);
    if (!chatPage) return next(new Error('Failed to load chats ' + id));
    req.chatPage = chatPage;
    next();
  });
};



/**
 * Create a chat
 */
exports.createChat = function(req, res) {
  console.log(req.body);
  Chat.findOne({creator:req.body.creator,postId:req.body.postId}, function(err,chat){
    if(err){
      res.json(500,err);
    }else{
      console.log(chat);
      if(!chat){
        console.log('creating chat');
        var newChat = new Chat({creator:req.body.creator,postId:req.body.postId,postCreator:req.body.postCreator});
        newChat.save(function(err){
          if(err){
            res.json(500,err);
          }else{
              newChat.populate('creator postCreator postId','displayName displayName providerId title',function(err)
              {
                console.log(newChat);
                res.send(newChat);
              });
           }
        });

      }else{
      console.log('chat already exists')
        //Chat.update({_id:chat._id}, {$set: {lastModify:Date.now()}});
       chat.populate('creator postCreator postId','displayName displayName providerId title',function(err)
              {
                console.log(chat);
                res.json(chat);
              });     
      }
    }

  });
};

 exports.getChat = function(req, res) {
  console.log('Getting the chat List');
  console.log(req);
/*  Chat.find({ $or:[ {'creator._id':req.body.personId}, {'postCreator._id':req.body.personId} ]}, function(err,chats){
      if(err){
          res.json(500,err);
      }else{
          res.json(chats);
      }

  });*/
  var personId = new ObjectId(req.query.personId);
  Chat.find({ "$or":[ {"creator":personId}, {"postCreator":personId} ]}).populate('creator postCreator postId','displayName displayName providerId title').sort({lastModify:1}).exec(function(err,chats){
       if(err){
          res.json(500,err);
        }else{
          res.json(chats);
        }
    });
 };


exports.message = function(req,res){
  console.log(req);
  Chat.findOne({_id:req.query.chatId} , function(err, chat) {
    if (err) {
      res.json(500, err);
    } else {
      console.log(chat);
      //console.log('Holy shitt its working');
      if(chat){
      res.json(chat.message);
      }
    }
  });
};
