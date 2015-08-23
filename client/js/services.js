angular.module('app.services',['constants'])
.factory('User', function($resource, SERVER_ADDR){
	return $resource(SERVER_ADDR + '/user/:userId',{});
}).factory('FBAccess',function($http,$rootScope){
	return{
	api: function(obj) {
				console.log('in api method');
                var method = obj.method || 'GET',
                    params = obj.params || {};

           params['access_token'] = $rootScope.accessToken;

            return $http({method: method, url: 'https://graph.facebook.com' + obj.path, params: params})
                .error(function(data, status, headers, config) {
                    if (data.error && data.error.type === 'OAuthException') {
                        $rootScope.$emit('OAuthException');
                    }
                });
        },
	 get: function (path, params) {
	  			console.log('in get method');
            //return api({method: 'GET', path: path, params: params});
            params['access_token'] = $rootScope.accessToken;
            return $http({method: 'GET', url: 'https://graph.facebook.com' + path, params: params})
                .error(function(data, status, headers, config) {
                    if (data.error && data.error.type === 'OAuthException') {
                        $rootScope.$emit('OAuthException');
                    }
                });
      }
    };
}).factory('Posts', function($resource, SERVER_ADDR){
	return $resource(SERVER_ADDR + '/posts/:postId', {}, {
			match:{ method: "POST",
				isArray: true,
				url: SERVER_ADDR + '/posts/filter'
			}				
		});
}).factory('Surveys',function($resource, SERVER_ADDR){
	return $resource(SERVER_ADDR + '/survey',{});
}).factory('Comments',function($resource, SERVER_ADDR){
	//return $resource('/posts/:postId/comment', {postId:'@postId'});
	return $resource(SERVER_ADDR + '/comments', {});
}).factory('Offers',function($resource, SERVER_ADDR){
	return $resource(SERVER_ADDR + '/offers', {});
}).factory('Chats',function($resource, SERVER_ADDR){
	return $resource(SERVER_ADDR + '/chat',{});
}).factory('getMessage',function($resource, SERVER_ADDR){
    return $resource(SERVER_ADDR + '/getMessage',{});
}).factory('signup',function($resource, SERVER_ADDR){
	return $resource(SERVER_ADDR + '/signup',{});
}).factory('login',function($resource, SERVER_ADDR){
	return $resource(SERVER_ADDR + '/login',{});
}).factory('Session',function($resource, SERVER_ADDR){
    return $resource(SERVER_ADDR + '/session',{});
}).factory('myPost',function($resource, SERVER_ADDR){
    return $resource(SERVER_ADDR + '/myPost/:userId',{});
}).factory('OfferPrice',function($resource, SERVER_ADDR){
    return $resource(SERVER_ADDR + '/offerPrice',{});
}).factory('FBPost', function($resource, SERVER_ADDR){
    return $resource(SERVER_ADDR + '/postToFB',{});	
}).factory('Api', function($http, ApiEndpoint) {
  console.log('ApiEndpoint', ApiEndpoint)

  var getApiData = function() {
    return $http.get(ApiEndpoint.url + '/tasks')
      .then(function(data) {
        console.log('Got some data: ', data);
        return data;
      });
  };

  return {
    getApiData: getApiData
  };
}).factory('AcceptOffer',function($resource, SERVER_ADDR){
    return $resource(SERVER_ADDR + '/acceptOffer',{});
}).factory('CancelOffer',function($resource, SERVER_ADDR){
    return $resource(SERVER_ADDR + '/cancelOffer',{});
})
.factory('FacebookLogin',function($resource, SERVER_ADDR){
    return $resource(SERVER_ADDR + '/auth/facebook',{});
})
.factory('FBLogin', function($http, SERVER_ADDR){
    //Must use $http; $resource only supports arrays
    //  or object responses, not strings
    var f = {
            response : {}
        };
    f.getResponse = function(){
        return $http.get(SERVER_ADDR + '/auth/facebook')
            .then(function(resp){
                    angular.copy(resp, f.response)
                    return f.resp;
                });
    };
    return f;
})
.factory('LoadMore',function($resource, SERVER_ADDR){
    return $resource(SERVER_ADDR + '/loadMore',{});
})
.factory('Utils', function(){
	var u = {};
	//return capitalized word
	u.capitalize = function(word){
		return word.charAt(0).toUpperCase() + word.slice(1);
	}
	
	u.isValidString= function(s){
		//Checks if string is existent
		return !!s
	}
	
	//Checks whether price is valid
	u.isValidPrice = function(p){
		//Regex that matches currency values
		//See: http://stackoverflow.com/questions/2227370/currency-validation
		var regex  = /^[1-9]\d*(((,\d{3}){1})?(\.\d{0,2})?)$/;
		return regex.test(p);
	}
	
	//formats label
	//e.g. 'new_arrival' -> 'New Label'
	u.formatLabel = function(label){
	    return label.split("_").map(u.capitalize).join(" ");   
	}
	
	u.formatTitle = function(title){
		//Shorten title and append '...'
		var MAXLEN = 26;
		return title.length > MAXLEN ? title.substring(0, MAXLEN-3) + "..." : title;
	}
	
	u.getTrueProperties = function(obj){
		var trueProps = [];
		for (prop in obj) {
			if (obj.hasOwnProperty(prop)) {
				if (!!obj[prop]) {
					trueProps.push(prop);
				}
			}	
		}
		return trueProps;
	}
	
	return u;
}).factory('Mock', function(){
    //Factory for mocking data for testing 
    var m = {};
    m.mockClothing = function(){
        var items = [];
        for(var i=1; i<9; i++){
            //TODO: change name to title
            var item = {price: "2" + i, title: "Retrofit Fairisle Shawl Pullover"};
    
            //Slides for image carousel
            var slides = [];
            for(var j=1; j<=3; j++){
                var ri = Math.floor((Math.random() * 6) + 1); //rand int e [1,6]
                slides.push({img:"img/clothing/sweater" + ri + ".jpg"});       
            }
            item.slides = slides;
            items.push(item);
        }
        return items;
    }
    return m;
});
