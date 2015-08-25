"use strict";

angular.module('app.ctrl.postItem', ['ui.bootstrap'])
.controller('postItemCtrl', function($scope, 
                                    $rootScope,
                                    $state, 
                                    $q,
                                    Posts,
                                    Upload 
                                    ){

    //Initialize 
    $scope.sizes = [
          "small (12-inch)",
          "medium (14-inch)",
          "large (16-inch)",
          "insane (42-inch)"
      ];
      
      $scope.toppings = [
        { category: 'meat', name: 'Pepperoni' },
        { category: 'meat', name: 'Sausage' },
        { category: 'meat', name: 'Ground Beef' },
        { category: 'meat', name: 'Bacon' },
        { category: 'veg', name: 'Mushrooms' },
        { category: 'veg', name: 'Onion' },
        { category: 'veg', name: 'Green Pepper' },
        { category: 'veg', name: 'Green Olives' }
      ];

    if(!$scope.item){
        $scope.item = {category: null};
    }
    console.log("Current user is: " + $rootScope.personId);
            
    $scope.selectType = function(category){
        $scope.item.category = category;
        console.log($scope.item);
    }

    $scope.post = function(){
        console.log("Current user is: " + $rootScope.personId);
        if(!$rootScope.personId)
            return;

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
