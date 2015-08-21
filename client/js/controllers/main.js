
angular.module('app.controllers',[])
.controller('homeCtrl',function($scope,$state,$modal,$scrollspy,$location,$anchorScroll){
   console.log('I am in the controller');
  //$scope.boolChangeClass = false;
	$scope.login = function(){
		var modalInstance = $modal.open({
      animation: false,
      templateUrl: '../views/videoModal.html',
      controller: 'ModalInstanceCtrl',
      size: 'lg'
    });

	};

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



})
.controller('demoCtrl',function($scope,$state){

 $scope.today = function() {
    $scope.dt = new Date();
  };
  $scope.today();

  $scope.clear = function () {
    $scope.dt = null;
  };

  // Disable weekend selection
  $scope.disabled = function(date, mode) {
    return ( mode === 'day' && ( date.getDay() === 0 || date.getDay() === 6 ) );
  };

  $scope.toggleMin = function() {
    $scope.minDate = $scope.minDate ? null : new Date();
  };
  $scope.toggleMin();

  $scope.open = function($event) {
    $event.preventDefault();
    $event.stopPropagation();

    $scope.opened = true;
  };

  $scope.dateOptions = {
    formatYear: 'yy',
    startingDay: 1
  };

  $scope.formats = ['dd-MMMM-yyyy', 'yyyy/MM/dd', 'dd.MM.yyyy', 'shortDate'];
  $scope.format = $scope.formats[0];

  var tomorrow = new Date();
  tomorrow.setDate(tomorrow.getDate() + 1);
  var afterTomorrow = new Date();
  afterTomorrow.setDate(tomorrow.getDate() + 2);
  $scope.events =
    [
      {
        date: tomorrow,
        status: 'full'
      },
      {
        date: afterTomorrow,
        status: 'partially'
      }
    ];

  $scope.getDayClass = function(date, mode) {
    if (mode === 'day') {
      var dayToCheck = new Date(date).setHours(0,0,0,0);

      for (var i=0;i<$scope.events.length;i++){
        var currentDay = new Date($scope.events[i].date).setHours(0,0,0,0);

        if (dayToCheck === currentDay) {
          return $scope.events[i].status;
        }
      }
    }

    return '';
  };
}).controller('ModalInstanceCtrl', function ($scope, $modalInstance) {


  $scope.ok = function () {
    $modalInstance.close($scope.selected.item);
  };

  $scope.cancel = function () {
    $modalInstance.dismiss('cancel');
  };
});
