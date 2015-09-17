"use strict";

angular.module('app.ctrl.listing', [])
.controller('listingCtrl', function($scope, 
                                    $state,
                                    $rootScope,
                                    $location,
                                    Mock,
                                    Posts){

    /*$scope.navbarCollapsed = true;*/
    //Called when top dropdown toggled
    $scope.toggled = function(open) {
        //console.log('Dropdown is now: ', open);
    };
    
    //Get items
    $scope.items = Posts.query({count: 9, category: $rootScope.category}); 
    console.log($scope.items);

    Posts.count().$promise.then(function(data){
        $scope.totalItems = data.count;
    });

    //For paginator
    $scope.currentPage = 1;
    $scope.pageChanged = function(){
        var offset = ($scope.currentPage - 1) * 9;
        $scope.items = Posts.query({count: 9, offset:offset, category: $rootScope.category}); 
    };

    $scope.postDetail = function(post){
        console.log("Post detail");
        $rootScope.currentPost = post; 
        //$state.go('detail');
        $location.path('detail/' + post._id);
    };


    
}).controller('clothingCtrl', function($scope,
                                       $rootScope,
                                       $controller){
    //Inherit from listingCtrl
    $controller('listingCtrl', {$scope: $scope});    
    $scope.text = {
        category: "Clothing and Apparel",
        subtext: "Buy, sell, and exchange clothing here."
    }
    $rootScope.category = 'clothing';


}).controller('booksCtrl', function($scope,
                                    $rootScope,
                                    $controller){
    $controller('listingCtrl', {$scope: $scope});    
    $scope.text = {
        category: "Books",
        subtext: "Buy and sell books and other \
            school supplies, like notes and subscriptions here."
    }
    $rootScope.category = 'books';

})
.controller('electronicsCtrl', function($scope,
                                        $rootScope,
                                        $controller){
    $controller('listingCtrl', {$scope: $scope});    
    $scope.text = {
        category: "Electronics",
        subtext: "Buy and sell electronics here."
    }
    $rootScope.category = 'electronics';

})
.controller('furnitureCtrl', function($scope,
                                      $rootScope,
                                      $controller){
    $controller('listingCtrl', {$scope: $scope});    
    $scope.text = {
        category: "Furniture and Household Goods",
        subtext: "Buy and sell furniture and household goods like coffee machines here."
    }
    $rootScope.category = 'furniture';
});


