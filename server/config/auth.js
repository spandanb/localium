'use strict';

/**
 *  Route middleware to ensure user is authenticated.
 */
exports.ensureAuthenticated = function ensureAuthenticated(req, res, next) {
    console.log("ensureAuthenticated being called ");
    //console.log(req.session);
    if (req.isAuthenticated()) { 
        return next(); 
    }else {//res.redirect(401,'/#/login');
        res.send(401);
    }
};

exports.getUser = function(req, res, next){
    
    
}
