"use strict";

angular.module('prada',['ngResource',
                        'ui.bootstrap',
                        'app.controllers',
                        'ui.router',
                        'mgcrea.ngStrap',
                        'app.directives',
                        'mgcrea.ngStrap.helpers.dimensions',
                        'ngMaterial',
                        'app.listing'])
.config(function($stateProvider,$urlRouterProvider){
$stateProvider
.state('home',{ 
    url:'/home',
    views:{
        
        'main': {
            templateUrl:'../views/home.html',
            controller: 'homeCtrl',
        }
    }
})
.state('listing', {
    url:'/listing',
    views: {
        'navbar': {
            templateUrl: '../views/navbar.html'
        },
        'main':{
            templateUrl: '../views/listing.html',
            controller: 'listingCtrl',
        }
    }
})
.state('login', {
    url:'/login',
    templateUrl:'../views/login.html',
    controller:'loginCtrl'
})
.state('signUp', {
    url:'/signUp',
    templateUrl:'../views/signUp.html',
    controller:'loginCtrl'
})
.state('detail', {
    url:'/detail',
        views: {
        'navbar': {
            templateUrl: '../views/navbar.html'
        },
        'main':{
           templateUrl:'../views/detail.html',
           controller:'detailCtrl'
        }
    }

})
.state('chatPage', {
    url:'/chatPage',
        views: {
        'navbar': {
            templateUrl: '../views/navbar.html'
        },
        'main':{
           templateUrl:'../views/chatPage.html',
           controller:'chatPageCtrl'
        }
    }

})
$urlRouterProvider.otherwise("/home");
});
