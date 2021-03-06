'use strict';

var mongoose = require('mongoose'),
  Schema = mongoose.Schema;

var ChatPageSchema = new Schema({

  message: {
    type: [],
    username: String,
    content: String,
    userId:String,
    providerId:String,
    created: Date,
    trim: true
  },
  created: Date,
  updated: [Date],
  lastModify: Date,
  creator: {
    type: Schema.ObjectId,
    ref: 'User'
  },
  postId:{
  	type: Schema.ObjectId,
    ref: 'Post'
  }, 
  postCreator:{
  	type: Schema.ObjectId,
    ref: 'User'
  }
});

ChatPageSchema.pre('save', function(next, done){
 console.log('Its coming here');
  if (this.isNew)
    this.created = Date.now();

  this.updated.push(Date.now());
  this.lastModify = Date.now();
  next();
});

ChatPageSchema.statics = {
  load: function(id, cb) {
    this.findOne({
      _id: id
    }).populate('creator postId postCreator').exec(cb);
  }
};

mongoose.model('ChatPage', ChatPageSchema);