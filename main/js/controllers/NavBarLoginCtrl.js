angular.module('plantMasters').controller('NavBarLoginCtrl', function($scope, $http, Identity, Notifier, Auth, $location) {
  $scope.identity = Identity;
  console.log("someone loves me?");
  $scope.signin = function(username, password) {
    Auth.authenticateUser(username, password).then(function(success) {
      if (success) {
        Notifier.notify('You have successfully signed in!');
      } else {
        Notifier.notify('Username/Password combination incorrect');
      }
    });
  };

  $scope.signout = function() {
    Auth.logoutUser().then(function(){
      $scope.username = "";
      $scope.password = "";
      Notifier.notify('You have successfully logged out!');
      $location.path('/');
    });
  };
  $http.get('/bootstrappedUser').success(function(data, status, headers, config) {
      $scope.bootstrappedUser = data;
  });
});
