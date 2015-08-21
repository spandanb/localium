"use strict";

angular.module('app.ctrl.listing', ['ui.bootstrap'])
.controller('listingCtrl', function($scope 
                                    ){
    console.log("In here");
    //Called when top dropdown toggled
    $scope.toggled = function(open) {
        //console.log('Dropdown is now: ', open);
    };
    
    //Create items
    $scope.items = [];
    for(var i=1; i<9; i++){
        var item = {price: "2" + i, name: "Retrofit Fairisle Shawl Pullover"};

        //Slides for image carousel
        var slides = [];
        for(var j=1; j<=3; j++){
            var ri = Math.floor((Math.random() * 6) + 1); //rand int e [1,6]
            slides.push({img:"img/clothing/sweater" + ri + ".jpg"});       
        }
        item.slides = slides;
        $scope.items.push(item);
    }
    
    //For paginator
    $scope.currentPage = 1;
    $scope.pageChanged = function(){
        //console.log("Page changed");    
    }

    
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


