"use strict";

angular.module('app.ctrl.nav', [])
.controller('navCtrl', function($scope, Mock, $rootScope,$modal){
    //$rootScope.boolChangeClass = false;
    $scope.showSearchResults = false;
    $scope.search = "";

    $scope.login = function(){
        var modalInstance = $modal.open({
      animation: false,
      templateUrl: '../views/loginModal.html',
      controller: 'ModalInstanceCtrl',
      size: 'sm'
    });
    };
    /*
    $scope.$watchCollection('search', function() { 
        if(!!$scope.search){
            $scope.showSearchResults = !$scope.showSearchResults;
        }
        console.log("Search text changed to " + $scope.search);
    });*/

    //Create list of lists for carousel for search results
    $scope.getItemCollection = function(){
        var itemCollection = [];
        var items = Mock.mockClothing()
        for(var i=0; i<items.length; i+=1){
            var j = Math.floor(i/3);
            if(!itemCollection[j]){
                itemCollection[j] = []
            }
            itemCollection[j].push( items[i] );
        }
        return itemCollection;
    }
    
    $scope.itemCollection = $scope.getItemCollection();
    
    //Detects when text changed in search field 
    $scope.$watch("search", function(newValue, oldValue) {
        //console.log(newValue, oldValue);
        if(!!newValue){
            $scope.showSearchResults = true;
            //$scope.itemCollection = $scope.getItemCollection();
        }else{
            $scope.showSearchResults = false;
        }
    });

    $scope.exitSearch = function(){
        //Hide results
        $scope.showSearchResults = false;          
        //Empty search field
        $scope.search = null;
    }
    

});
