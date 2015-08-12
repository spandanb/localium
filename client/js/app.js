"use strict";

angular.module('prada',['ngResource',
                        'ui.bootstrap',
                        'app.controllers',
                        'ui.router',
                        'mgcrea.ngStrap',
                        'app.directives',
                        'mgcrea.ngStrap.helpers.dimensions',
                        'ngMaterial'])
.config(function($stateProvider,$urlRouterProvider){
$stateProvider
.state('home',{ 
    url:'/home',
    controller: 'homeCtrl',
    views:{
        'main': {
            templateUrl:'../views/home.html'
           
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
    templateUrl:'../views/detail.html',
    controller:'detailCtrl'
})

$urlRouterProvider.otherwise("/home");
});
