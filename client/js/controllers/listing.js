"use strict";

angular.module('app.listing', ['ui.bootstrap'])
.controller('listingCtrl', function($scope, 
                                    $modal, 
                                    $mdDialog){

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

    //For post item modal
    $scope.postItem = function(ev){
        $mdDialog.show({
            controller: 'postModalCtrl',
            templateUrl: '../views/postModal.html',
            parent: angular.element(document.body),
            targetEvent: ev,
            clickOutsideToClose:true
        }).then(function(item) {
            console.log(item);
            //Upload item to backend
        }, function() {
            $scope.status = 'You cancelled the dialog.';
            console.log($scope.status);
        });
    }
    
    //For paginator
    $scope.currentPage = 1;
    $scope.pageChanged = function(){
        //console.log("Page changed");    
    }

    
}).controller('postModalCtrl', function($scope, 
                                        $mdDialog, 
                                        FileUploader){

    $scope.item= {};
    //Need for the tags
    $scope.item.tags = [];

    $scope.hide = function() {
        $mdDialog.hide();
    };

    $scope.cancel = function() {
        $mdDialog.cancel();
    };

    $scope.postItem = function(){
        $mdDialog.hide($scope.item);
    };

    //To upload images
    $scope.uploader = new FileUploader();

});
