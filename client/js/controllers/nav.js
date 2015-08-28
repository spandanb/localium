"use strict";

angular.module('app.ctrl.nav', [])
.controller('navCtrl', function($scope, 
                                $rootScope,
                                $timeout,
                                $modal, 
                                Mock, 
                                Session){
    //$rootScope.boolChangeClass = false;
    $scope.showSearchResults = false;
    //The search text 
    $scope.search = "";

    $scope.login = function(){
        var modalInstance = $modal.open({
            animation: false,
            templateUrl: '../views/loginModal.html',
            controller: 'ModalInstanceCtrl',
            size: 'sm'
        });
    };

    $rootScope.$on('launchLoginModal', function(event, args){
        $scope.login();
    });
    
    //watch if the user is logged in or not
    $rootScope.$watch("personId", function(user) {
        console.log(user);
        if(user == null || user ==undefined){
            $scope.showUserName = false;
        }else{
            $scope.showUserName = true;
        }
    });

    //logout 
    $scope.logout = function() {
        console.log('Deleting the session');
        Session.delete(function(res) {
            console.log(res);
            if(res[0] =='O'){
                 $scope.showUserName = false;

            }
        }, function(err) {
            console.log("error");
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
   

    $scope.searchFSM = {
        //A machine for search. 
        //A search operation is in one of 
        //  {idle|waiting|searching} states.
        //In idle do nothing
        //In waiting state, you are waiting for user to finish typing 
        //wait 500ms, in case user is still typing
        //The go to searching state, where it actually searches 
        //This shows the loader for 1s
        state: "idle", 
        waitHandle: null, //handle for promise, while in waiting state
        searchHandle: null,

        startSearching : function(){
            this.state = "searching";
            this.searchHandle = $timeout(function(){
                $scope.showSearchResults = true;
                $scope.searchFSM.state = "idle";
            }, 1000);
        },

        newValueEntered : function(newValue){
            //If value is empty 
            if(!newValue){
                $scope.showSearchResults = false;
                return;
            }

            //Cancel existing promise if it exists 
            if(this.state == "waiting"){
                this.waitHandle.cancel();   
            }
            this.state = "waiting";
            this.waitHandle = $timeout(function(){
                $scope.searchFSM.startSearching(); 
            }, 500);

        },
    }


    //Detects when text changed in search field 
    $scope.$watch("search", function(newValue, oldValue) {
        $scope.searchFSM.newValueEntered(newValue);
    });

    $scope.exitSearch = function(){
        //Hide results
        $scope.showSearchResults = false;          
        //Empty search field
        $scope.search = null;
    }
    

});
