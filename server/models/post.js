'use strict';

var mongoose = require('mongoose'),
  Schema = mongoose.Schema,
  crypto = require('crypto');

var PostSchema = new Schema({
  creator: {
    type: Schema.Types.ObjectId,
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
  imageData:String,
  imageUrl:[String],
  title:String,
  price:String,
  message:String,
  status:String,
  size: String,
  categories: [String],
  offerPrice: [{
    username:{
      type:Schema.Types.ObjectId,
      ref:'User'
    },
    price: String
  }],
  consumer:{ //Holder of the offer
    type:String,
    ref:'User'
  },
  comments:[{
    type: Schema.Types.ObjectId,
    ref: 'Comment'
  }],
  offers:[{
    type: Schema.Types.ObjectId,
    ref: 'Offer'
  }]
});

mongoose.model('Post', PostSchema);
