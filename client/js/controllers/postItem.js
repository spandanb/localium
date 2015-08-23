"use strict";

angular.module('app.ctrl.postItem', ['ui.bootstrap'])
.controller('postItemCtrl', function($scope, 
                                    FileUploader, 
                                    $rootScope,
                                    $state, 
                                    Posts){


    if(!$scope.item){
        $scope.item = {category: null};
    }
            
    $scope.uploader = new FileUploader();

    $scope.selectType = function(category){
        $scope.item.category = category;
        console.log($scope.item);
    }

    $scope.post = function(){
        console.log("Current user is: " + $rootScope.personId);
        if(!$rootScope.personId)
            return;

        $scope.item.image = [];
        $scope.item.personId = $rootScope.personId;
        console.log($scope.item);        

        Posts.save($scope.item, function(){
            console.log("Success");
            $state.go('listing.clothing');
        }, function(){
            console.log("Error");
        });
    }

}); 
