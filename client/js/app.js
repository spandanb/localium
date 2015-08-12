"use strict";

angular.module('prada',['ngResource',
                        'ui.bootstrap',
                        'app.controllers',
                        'ui.router',
                        'mgcrea.ngStrap',
                        'mgcrea.ngStrap.helpers.dimensions',
                        'ngMaterial'])
.config(function($stateProvider,$urlRouterProvider){
$stateProvider
.state('home',{ 
    url:'/home',
    templateUrl:'../views/home.html',
    controller:'homeCtrl'
})
.state('listing', {
    url:'/listing',
    templateUrl:'../views/listing.html',
    controller:'listingCtrl'
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
