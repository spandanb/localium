
angular.module('app.controllers',[])
.controller('homeCtrl',function($scope,$state,$modal,$scrollspy,$location,$anchorScroll,Session,$rootScope){
   console.log('I am in the controller');
  //$scope.boolChangeClass = false;
    Session.get(function(data){
            console.log(data);
            console.log(data._id);
            $rootScope.personId = data._id;
            $rootScope.personName = data.displayName;
    });

	$scope.login = function(){
		var modalInstance = $modal.open({
      animation: false,
      templateUrl: '../views/loginModal.html',
      controller: 'ModalInstanceCtrl',
      size: 'sm'
    });

	};
  $scope.user={};
  console.log($scope.user);


	$scope.signUp = function(){
    $scope.navbarCollapsed =true;
		$state.go('signUp');
	};

  $scope.description = function () {

    $state.go('detail');

  };


$scope.scrollToHref = function (id){
        // set the location.hash to the id of
        // the element you wish to scroll to.
        console.log('I am in the controller');
        $location.hash(id);
        // call $anchorScroll()
        $anchorScroll();
    };

$scope.bookMore = function(){
      $state.go('chatPage');
};

$scope.$on('slide1', function ($evt, active, locals) {
  console.log("event being fired");
});

})
.controller('demoCtrl',function($scope,$state){

}).controller('ModalInstanceCtrl', function ($scope, $modalInstance,FacebookLogin) {


  $scope.ok = function () {
    $modalInstance.close($scope.selected.item);
  };

  $scope.cancel = function () {
    $modalInstance.dismiss('cancel');
  };

  $scope.facebookLogin =function(){
    console.log("facebookLogin");
    FacebookLogin.get({}, function(data){

    });
  };
});
