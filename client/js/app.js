"use strict";

angular.module('prada',['ngResource',
                        'ui.bootstrap',
                        'ui.router',
                        'mgcrea.ngStrap',
                        'mgcrea.ngStrap.helpers.dimensions',
                        'mgcrea.ngStrap.alert',
                        'ngMaterial',
                        'app.directives',
                        'app.controllers',
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
    templateUrl:'../views/detail.html',
    controller:'detailCtrl'
})

$urlRouterProvider.otherwise("/home");
});
