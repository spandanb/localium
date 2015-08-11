'use strict'

var mongoose = require('mongoose'),
  Schema = mongoose.Schema;

var SurveySchema = new Schema({
    creator: {
        type: Schema.ObjectId,
        ref: 'User'
    },
    response: Object
});


mongoose.model('Survey', SurveySchema);
