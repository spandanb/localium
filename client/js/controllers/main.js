
angular.module('app.controllers',[])
.controller('homeCtrl',function($scope,$state,$modal,$scrollspy,$location,$anchorScroll,Session,$rootScope,Comments){
   console.log('I am in the controller');
  //$scope.boolChangeClass = false;
/*    Session.get(function(data){
            console.log(data);
            console.log(data._id);
            $rootScope.personId = data._id;
            $rootScope.personName = data.displayName;
    });*/

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
}).controller('detailCtrl', function($rootScope,$scope,Session, Posts, $stateParams,Comments){
/*console.log($rootScope.currentPost);
$scope.item = $rootScope.currentPost;*/
/*Session.get(function(data){
            console.log(data);
            console.log(data._id);
            $rootScope.personId = data._id;
            $rootScope.personName = data.displayName;
    });*/
$scope.personId = $rootScope.personId;
$scope.personName = $rootScope.personName;
console.log($rootScope.person);
$scope.person = $rootScope.person;
 if($rootScope.currentPost == null || $rootScope.currentPost == undefined){
        Posts.get({
            postId: $stateParams.postId
        }, function(data) {
            $scope.post = data;
            $scope.comments = $scope.post.comments
            console.log(data);
            $scope.commentArray = data.comments;
            console.log($scope.commentArray);
        });
    }else{
        $scope.post = $rootScope.currentPost;
            $scope.comments = $scope.post.comments;
            console.log($rootScope.currentPost);   
            $scope.commentArray = $rootScope.currentPost.comments;
            console.log($scope.commentArray);
    }

$scope.addComment = function(){
  console.log("Adding comment");
          //$scope.comments.push({message: $scope.comment});
        Comments.save({
            postId: $stateParams.postId,
            message: $scope.newComment,
            personId: $rootScope.personId
        }, function(comment) {
            console.log(comment);
            $scope.comments.push({message: comment.message, _id: comment._id});    
    
            
            $scope.newComment = null;
  
            //$scope.post.comments.push(comment);            
   
        });
}
});
