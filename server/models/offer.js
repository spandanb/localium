'use strict';

var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var OfferSchema = new Schema({
    post:{
        type: Schema.Types.ObjectId,
        ref: 'Post',
    },
    by:{
        type: Schema.Types.ObjectId,
        ref: 'User',
    },
    amount: String, 
    status: {type: String, enum: ['placed', 'accepted', 'rejected']}
})

mongoose.model('Offer', OfferSchema);

