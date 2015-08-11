'use strict';

var mongoose = require('mongoose'),
  Schema = mongoose.Schema;

var CommentSchema = new Schema({
  creator: {
    type: Schema.ObjectId,
    ref: 'User'
  },
  created:{
  	type:Date,
  	default:Date.now
  	},
  updated:{
  	type:Date,
  	default:Date.now
  	},
  message:String,
  
  post:{ 
    type: Schema.ObjectId, 
    ref: 'Post'
  }

});

mongoose.model('Comment', CommentSchema);
