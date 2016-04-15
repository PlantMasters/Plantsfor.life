angular.module('plantMasters').controller('SignupCtrl', function($scope, User, mvNotifier, $location, Auth) {
  $scope.signup = function() {
    var newUserData = {
      username: $scope.email,
      password: $scope.password,
      firstName: $scope.fname,
      lastName: $scope.lname
    };

    Auth.createUser(newUserData).then(function() {
      mvNotifier.notify('User account created!  Of all our users; you are the most recent!!!');
      $location.path('/');
    }, function(reason) {
      mvNotifier.error(reason);
    });
  };
});
