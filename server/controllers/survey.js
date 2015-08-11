var mongoose = require('mongoose'),
  User = mongoose.model('User'),
  Survey = mongoose.model('Survey');


exports.recordResponse = function(req,res){
   console.log("In record survey method");
   var survey = new Survey({creator: req.body.personId, 
                                response: req.body.response
                                });
   survey.save(function(err){
        if(err){
            console.log(err);
            res.status(500).send(err);
        }else{
            console.log("success");
            res.sendStatus(200);
        }
   });
};

