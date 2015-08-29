"use strict";

angular.module('app.ctrl.listing', [])
.controller('listingCtrl', function($scope, 
                                    $state,
                                    $rootScope,
                                    $location,
                                    Mock,
                                    Posts){

    //Called when top dropdown toggled
    $scope.toggled = function(open) {
        //console.log('Dropdown is now: ', open);
    };
    
    //Get items
    $scope.items = Posts.query({count: 9}); 
    console.log($scope.items);

    Posts.count().$promise.then(function(data){
        $scope.totalItems = data.count;
    });

    //For paginator
    $scope.currentPage = 1;
    $scope.pageChanged = function(){
        var offset = ($scope.currentPage - 1) * 9;
        $scope.items = Posts.query({count: 9, offset:offset}); 
    };

    $scope.postDetail = function(post){
        console.log("Post detail");
        $rootScope.currentPost = post; 
        //$state.go('detail');
        $location.path('detail/' + post._id);
    };


    
}).controller('clothingCtrl', function($scope,
                                       $controller){
    //Inherit from listingCtrl
    $controller('listingCtrl', {$scope: $scope});    
    $scope.text = {
        category: "Clothing and Apparel",
        subtext: "Buy, sell, and exchange clothing here."
    }


}).controller('booksCtrl', function($scope,
                                    $controller){
    $controller('listingCtrl', {$scope: $scope});    
    $scope.text = {
        category: "Books",
        subtext: "Buy and sell books and other \
            school supplies, like notes and subscriptions here."
    }

})
.controller('electronicsCtrl', function($scope,
                                        $controller){
    $controller('listingCtrl', {$scope: $scope});    
    $scope.text = {
        category: "Electronics",
        subtext: "Buy and sell electronics here."
    }

})
.controller('furnitureCtrl', function($scope,
                                      $controller){
    $controller('listingCtrl', {$scope: $scope});    
    $scope.text = {
        category: "Furniture and Household Goods",
        subtext: "Buy and sell furniture and household goods like coffee machines here."
    }
});


