'use strict'

angular.module('megaTradingApp',['ngResource','ui.bootstrap','app.controllers','ui.router'])
.config(function($stateProvider,$urlRouterProvider){
$stateProvider
.state('home',{ 
  url:'/home',
  templateUrl:'../views/home.html',
  controller:'homeCtrl'
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
.state('demo', {
    url:'/demo',
  templateUrl:'../views/demo.html',
  controller:'demoCtrl'
})
.state('detail', {
    url:'/detail',
  templateUrl:'../views/detail.html',
  controller:'detailCtrl'
})

$urlRouterProvider.otherwise("/home");
});