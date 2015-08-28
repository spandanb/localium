"use strict";

angular.module('app.ctrl.postItem', ['ui.bootstrap'])
.controller('postItemCtrl', function($scope, 
                                    $rootScope,
                                    $state, 
                                    $q,
                                    Posts,
                                    Upload 
                                    ){

    $scope.imgGroups = [];

    //Use this for books
    $scope.bookConditions = [
        {condition: "Mint Condition", value: 1},
        {condition:"Slightly Used", value: 2},
        {condition:"Heavily Used", value: 3},
        {condition:"Acceptable", value: 4}
    ];
      
    $scope.electronicsConditions = [
        {condition: "Unopened", value: 1},
        {condition:"Unused (but without original packaging)", value: 2},
        {condition:"Slightly Used", value: 3},
        {condition:"Works", value: 4}
    ];

    $scope.clothingConditions = [
        {condition: "Unworn", value: 1},
        {condition:"Slightly Worn", value: 2},
        {condition:"Heavily Worn", value: 3}
    ];

    $scope.furnitureConditions = [
        {condition:"Unused", value: 1},
        {condition:"Slightly Used", value: 2},
        {condition:"Heavily Used", value: 3}
    ];

    $scope.years = function(){for(var i=1990, arr=[]; i<2016; i++, arr.push(i)); return arr;}()
    console.log($scope.years);
    
    if(!$scope.item){
        $scope.item = {category: null};
    }
    console.log("Current user is: " + $rootScope.personId);
            
    $scope.selectType = function(category){
        $scope.item.category = category;
        console.log($scope.item);
    }

    $scope.launchLoginModal = function(){
        $rootScope.$emit('launchLoginModal');
    }

    $scope.$watch("images", function(newValue, oldValue) {
        //TODO: Make this smarter, and put in directive
        $scope.imgGroups = [[],[],[]];
        for(var i=0; !!$scope.images && i<$scope.images.length; i++){
            $scope.imgGroups[i % 3].push( $scope.images[i] );  
            console.log($scope.images[i])
        }
    });

    $scope.setCategory = function(category){
        $scope.item.category = category;
    }

    $scope.post = function(){
        if(!$rootScope.personId){
            return;
        }
        
        //Turn images to data url
        $scope.item.images = [];
        var imgPromises = [];
        for(var i=0; i<$scope.images.length; i++){
            var promise = Upload.dataUrl($scope.images[i], true)
            .then(function(dataUrl){
                $scope.item.images.push(dataUrl);
            }); 
            imgPromises.push(promise);
        }
        
        //Wait for all image promises to resolve before
        //posting to server
        $q.all(imgPromises).then(function() {
            $scope.item.personId = $rootScope.personId;
            console.log($scope.item);        

            Posts.save($scope.item, function(){
                console.log("Success");
                $state.go('listing.clothing');
            }, function(){
                console.log("Error");
            });
        });
    }

}); 
