angular.module('plantMasters').controller('NavBarLoginCtrl', function($http, $scope, Identity, mvNotifier, Auth, $location, $window) {
  $scope.identity = Identity;
  console.log(Identity);

  $scope.signin = function(username, password) {
    Auth.authenticateUser(username, password).then(function(success) {
      if (success) {
        mvNotifier.notify('You have successfully signed in!');
        window.location.reload();
      } else {
        mvNotifier.error('Username/Password combination incorrect');
      }
    });
  };

  $scope.signout = function() {
    Auth.logoutUser().then(function(){
      $scope.username = "";
      $scope.password = "";
      mvNotifier.notify('You have successfully logged out!');
      $location.path('/');
      window.location.reload();
    });
  };
  var userCall = function() {
    $http.get('/bootstrappedUser').success(function(data, status, headers, config) {
        $scope.bootstrappedUser = data;
        console.log(data);
    }).catch(function (err){
      $scope.bootstrappedUser = undefined;
      console.log("ERROR!!!!");
    })
  };
  userCall();

  //this does nothing!!!>??
  // if(!!$window.bootstrappedUserObject) {
  //   currentUser = new User();
  //   angular.extend(currentUser, $window.bootstrappedUserObject);
  // }

});
