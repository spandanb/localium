"use strict";

angular.module('prada',['ngResource',
                        'mgcrea.ngStrap',
                        'mgcrea.ngStrap.helpers.dimensions',
                        'ui.bootstrap.carousel',
                        'ui.bootstrap.collapse',
                        'ui.bootstrap.dropdown',
                        'ui.bootstrap.modal',
                        'ui.bootstrap.pagination',
                        'ui.router',
                        'ngMaterial',
                        'app.directives',
                        'app.controllers',
                        'app.ctrl.listing',
                        'app.ctrl.postItem',
                        'duScroll',
                        'app.ctrl.nav',
                        'app.services',
                        'pc035860.scrollWatch',
                        'angularFileUpload' //For file upload

                        ])
.config(function($stateProvider,$urlRouterProvider){
$stateProvider
.state('home',{ 
    url:'/home',
    views:{
        'navbar': {
            templateUrl: '../views/navbar.html',
            controller: 'navCtrl'
        },
        'main': {
            templateUrl:'../views/home.html',
            controller: 'homeCtrl',
        }
    }
})
.state('listing', {
    url:'/listing',
    abstract: true,
    views: {
        'navbar': {
            templateUrl: '../views/navbar.html',
            controller: 'navCtrl'
        },
        'main':{
            template: '<div ui-view="specific"></div>'
        },
        'footer':{
            templateUrl: '../views/footer.html'
        },
    }
})
.state('listing.clothing', {
    url:'/clothing',
    views: {
        'specific@listing':{
            templateUrl: '../views/listing.html',
            controller: 'clothingCtrl'
        },
        'sidebar@listing.clothing':{
            templateUrl: '../views/sidebarClothing.html',
        }
    }
})
.state('listing.books', {
    url:'/books',
    views: {
        'specific@listing':{
            templateUrl: '../views/listing.html',
            controller: 'booksCtrl'
        },
        'sidebar@listing.books':{
            templateUrl: '../views/sidebarBooks.html',
        }
    }
})
.state('listing.electronics', {
    url:'/electronics',    
    views: {
        'specific@listing':{
            templateUrl: '../views/listing.html',
            controller: 'electronicsCtrl'
        },
        'sidebar@listing.electronics':{
            templateUrl: '../views/sidebarElectronics.html',
        }
    }
})
.state('listing.furniture', {
    url:'/furniture',    
    views: {
        'specific@listing':{
            templateUrl: '../views/listing.html',
            controller: 'furnitureCtrl'
        },
        'sidebar@listing.furniture':{
            templateUrl: '../views/sidebarFurniture.html',
        }
    }
})
.state('post', {
    url:'/post',
    views:{
        'navbar': {
            templateUrl: '../views/navbar.html',
            controller: 'navCtrl'
        },
        'main':{
            templateUrl: '../views/postItem.html',
            controller: 'postItemCtrl'
        },
        'footer':{
            templateUrl: '../views/footer.html'
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
