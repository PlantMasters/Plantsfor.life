angular.module('plantMasters').controller('NavBarLoginCtrl', function($scope, $http, Identity, mvNotifier, Auth, $location) {
  $scope.identity = Identity;
  console.log("someone loves me?");
  $scope.signin = function(username, password) {
    Auth.authenticateUser(username, password).then(function(success) {
      if (success) {
        mvNotifier.notify('You have successfully signed in!');
      } else {
        mvNotifier.notify('Username/Password combination incorrect');
      }
    });
  };

  $scope.signout = function() {
    Auth.logoutUser().then(function(){
      $scope.username = "";
      $scope.password = "";
      mvNotifier.notify('You have successfully logged out!');
      $location.path('/');
    });
  };
  $http.get('/bootstrappedUser').success(function(data, status, headers, config) {
      $scope.bootstrappedUser = data;
  });
});
