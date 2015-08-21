"use strict";

angular.module('app.ctrl.postItem', ['ui.bootstrap'])
.controller('postItemCtrl', function($scope, FileUploader){

    if(!$scope.item){
        $scope.item = {category: null};
    }
            

    $scope.uploader = new FileUploader();

    $scope.selectType = function(category){
        $scope.item.category = category;
        console.log($scope.item);
    }
}); 
