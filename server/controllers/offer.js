var mongoose = require('mongoose'),
  User = mongoose.model('User'),
  Post = mongoose.model('Post'),
  Offer = mongoose.model('Offer');

exports.getOffers = function(req,res){
    Offer.find({by: req.body.personId},
        function(err, offers){
            if(err){
                res.sendStatus(500);
            }
            else{
                res.status(200).send(offers);
            }
        }
    );
};
