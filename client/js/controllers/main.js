
angular.module('app.controllers',[])
.controller('homeCtrl',function($scope,$state,$modal,$scrollspy,$location,$anchorScroll,Session,$rootScope,Comments){
   console.log('I am in the controller');

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
}).controller('myPostCtrl',function($scope,myPost,$rootScope,$location){

   myPost.query({
        userId: $rootScope.personId
    }, function(data) {
        console.log(data);
        $scope.posts = data;
    });

   $scope.postDetail = function(post){
        console.log("Post detail");
        $rootScope.currentPost = post; 
        //$state.go('detail');
        $location.path('detail/' + post._id);
    };

}).controller('detailCtrl', function($rootScope,$scope,Session, Posts, $stateParams,Comments,$state,Chats){
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
/*$scope.post = null;
$scope.post.imageUrl =[];*/
$scope.imageUrl =[];
console.log($rootScope.person);
$scope.person = $rootScope.person;
 if($rootScope.currentPost == null || $rootScope.currentPost == undefined){
        Posts.get({
            postId: $stateParams.postId
        }, function(data) {
            $scope.post = data;
            $scope.comments = $scope.post.comments;
            for(i=0;i<data.imageUrl.length; i++){
              $scope.imageUrl.push(data.imageUrl[i]);
            }
            console.log( $scope.imageUrl );
        });
    }else{
        $scope.post = $rootScope.currentPost;
            $scope.comments = $rootScope.currentPost.comments;
            $scope.imageUrl = $rootScope.currentPost.imageUrl;
            console.log($rootScope.currentPost);   

    }

$scope.openChatPage = function(postId, postCreator){
  $rootScope.currentChat = null;
  console.log('creating a chat room');
  var chat = new Chats({
      creator: $rootScope.personId,
      postId: postId,
      postCreator: postCreator
  });
  console.log(chat);
  chat.$save(function(data) {
    console.log('The Function is creating a chat room');
    console.log(data);
     if ($rootScope.personId == data.creator._id) {
        data.chatTo = data.postCreator.displayName;
        data.chatToProviderId = data.postCreator.providerId;
      } else {
          data.chatTo = data.creator.displayName;
          data.chatToProviderId = data.creator.providerId;
      }
    $rootScope.currentChat = data;
    $state.go('chatPage');
  });
};

$scope.addComment = function(){
  console.log("Adding comment");
          //$scope.comments.push({message: $scope.comment});
        Comments.save({
            postId: $stateParams.postId,
            message: $scope.newComment,
            personId: $rootScope.personId,
            displayName:$rootScope.person.displayName,
            providerId:$rootScope.person.providerId
        }, function(comment) {
            console.log(comment);
            $scope.comments.push({message: comment.message, _id: comment._id,
                                   displayName:comment.displayName,providerId:comment.providerId,created:comment.created});    
    
            
            $scope.newComment = null;
  
            //$scope.post.comments.push(comment);            
   
        });
}
}).controller('chatPageCtrl', function($rootScope,$scope,Session, Posts, $stateParams,Comments,$state,Chats,SOCKET_URL){
  $scope.chats = [];
  var socket = io(SOCKET_URL);
  $scope.messages = [];
  var duplicateFlag = false;
  var lastIndex =0;

    Chats.query({
        personId: $rootScope.personId
    }, function(data) {
        console.log(data);
        //$scope.chats = data;
        for (var i = 0; i < data.length; i++) {
          if(data[i].creator != null && data[i].message.length > 0){
            if ($rootScope.personId == data[i].creator._id) {
                data[i].chatTo = data[i].postCreator.displayName;
                data[i].chatToProviderId = data[i].postCreator.providerId;
            } else {
                data[i].chatTo = data[i].creator.displayName;
                data[i].chatToProviderId = data[i].creator.providerId;
            }

            if($rootScope.currentChat != null && $rootScope.currentChat != undefined){
              if(data[i]._id == $rootScope.currentChat._id){
                    duplicateFlag = true;
                    continue;
              }
            }
              $scope.chats.push(data[i]);

            
          }
        }
        //$scope.chats = data;
        console.log($scope.chats);
        if($rootScope.currentChat != null && $rootScope.currentChat != undefined)
        {
          $scope.chats.push($rootScope.currentChat);
        }
        console.log($scope.chats);
        $scope.chats.reverse();
        console.log($scope.chats);
        $scope.chats[0].active = true;
        $scope.messages = $scope.chats[0].message;
        $rootScope.tempChatId = $scope.chats[0]._id;

    });

    $scope.sendMessage = function() {

    if($scope.newMessage != ''){ 
      if($rootScope.tempChatId != null && $rootScope.tempChatId != undefined){

        socket.emit('new message', {
            username: $rootScope.personId,
            content: $scope.newMessage,
            chatId:  $rootScope.tempChatId
        });

        console.log($scope.newMessage);
        $scope.newMessage = '';
      }
    }
    };

    socket.on('privateMessage', function(data) {

        console.log(data);
        $scope.messages.push(data);
        $scope.$apply();
    });

    $scope.showChatPage = function(chatPage,index){
        $scope.chats[0].active = false;
        $scope.chats[lastIndex].active = false;
        lastIndex = index;
         $scope.chats[index].active = true;
        console.log("In Show Chat Page");
        console.log(chatPage);
        $rootScope.tempChatId = chatPage._id;
        console.log($rootScope.tempChatId);
        $scope.messages = chatPage.message;
    };
});
