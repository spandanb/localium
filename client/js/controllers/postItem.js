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

    //Create a list of years from 1990-> 2016
    $scope.years = function(){for(var i=1990, arr=[]; i<2016; i++, arr.push(i)); return arr;}()
    
    //Transform an array of tags into 
    //format required by md-chips, i.e. {title: 'foo', subtitle: 'bar'}
    $scope.boxTagList = function(list){
        var ret = [];
        for(var i=0; i<list.length; i++){
            ret.push({title: list[i], subtitle: ' '});
        }
        return ret;
    }
    
    //Extract tag names from list of tag objects
    $scope.unboxTagList = function(list){
        var ret = [];
        for(var i=0; i<list.length; i++){
            ret.push(list[i].title);
        }
        return ret;
    }

    $scope.clothingTags = $scope.boxTagList(['New Arrival', 'Top', 'Jacket', 'Sweater', 'Bottom', 'Jeans', 
                           'Skirt', 'Shoes', 'Accessories']);
    $scope.booksTags = $scope.boxTagList(['APS105', 'ECE110', 'CHE101', 'MIE100']);
    $scope.electronicsTags = $scope.boxTagList([]);
    $scope.furnitureTags = $scope.boxTagList(['Chair','Table', 'Coffee Maker']);

    $scope.tags = []; //Holds the raw tag objects

    if(!$scope.item){
        $scope.item = {}; //{category: null};
    }

    $scope.launchLoginModal = function(){
        $rootScope.$emit('launchLoginModal');
    }

    $scope.$watch("images", function(newValue, oldValue) {
        //TODO: Make this smarter, and put in directive
        $scope.imgGroups = [[],[],[]];
        for(var i=0; !!$scope.images && i<$scope.images.length; i++){
            $scope.imgGroups[i % 3].push( $scope.images[i] );  
            //console.log($scope.images[i])
        }
    });
    
    $scope.alerts = [];
    
    $scope.alertClosed = function(idx){
       $scope.alerts.splice(idx, 1); 
    }

    $scope.post = function(form){
        if(!$rootScope.personId){
            return;
        }
        console.log("I am in");
        $scope.alerts = []; //Clear all alerts
        //Do error checking
        if(form.$invalid){
            if(form.title.$invalid){
                $scope.alerts.push({'msg':'Please enter a valid title!'}) 
            }
            if(form.price.$invalid){
                $scope.alerts.push({'msg':'Please enter a valid selling price!'}) 
            }
            if(form.description.$invalid){
                $scope.alerts.push({'msg':'Please enter a valid description!'}) 
            }
            if(form.categorySelect.$invalid){
                $scope.alerts.push({'msg':'Please enter a valid category!'}) 
            }
       
            return; 
        }

        //Turn images to data url
        $scope.item.images = [];
        console.log($scope.images);
        $scope.item.tags = $scope.unboxTagList($scope.tags);

        var imgPromises = [];
        for(var i=0; $scope.images && i<$scope.images.length; i++){
            var promise = Upload.dataUrl($scope.images[i], true)
            .then(function(dataUrl){
                $scope.item.images.push(dataUrl);
            }); 
            imgPromises.push(promise);
        }
        
        $scope.item.personId = $rootScope.personId;
        console.log($scope.item);    

        //There are no images
        if(imgPromises.length == 0){
            Posts.save($scope.item, function(){
                console.log("Success");
                $state.go('listing.clothing');
            }, function(){
                console.log("Error");
            });
        }else{
            //Wait for all image promises to resolve before
            //posting to server
            $q.all(imgPromises).then(function() {
                Posts.save($scope.item, function(){
                    console.log("Success");
                    $state.go('listing.clothing');
                }, function(){
                    console.log("Error");
                });
            });
        }
    }

}); 
