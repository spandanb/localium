angular.module('app.controllers',[])
.controller('homeCtrl',function($scope,$state,$modal){
	console.log("Hello Woeld");
	$scope.animationsEnabled = true;
	  $scope.items = ['item1', 'item2', 'item3'];
	$scope.logIn = function(){
		$scope.navbarCollapsed =true;
    $state.go('login');

	};

	$scope.signUp = function(){
    $scope.navbarCollapsed =true;
		$state.go('signUp');
	};

	$scope.demo = function(){
		$scope.navbarCollapsed =true;
    $state.go('demo');
	};

	$scope.description= function(){
    $scope.navbarCollapsed =true;
		$state.go('detail');
	};

	$scope.openModal = function () {

    var modalInstance = $modal.open({
      animation: false,
      templateUrl: '../views/videoModal.html',
      controller: 'ModalInstanceCtrl',
      size: 'lg'

    });

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
});;