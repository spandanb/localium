'use strict';

var mongoose = require('mongoose'),
  Schema = mongoose.Schema,
  crypto = require('crypto');

var UserSchema = new Schema({
  email: {
    type: String
  },
  password:String,
  displayName:String,
  providerId:String,
  gender:String,
  picture:String,
  provider: String,
  accessToken:String,
  json: Object,
  offers: [{ //Offers made
    type: Schema.Types.ObjectId,
    ref: 'Offer'
  }]
});

mongoose.model('User', UserSchema);
