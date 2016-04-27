angular.module('plantMasters').controller('NavBarLoginCtrl', function ($scope, Identity, mvNotifier, Auth, $location, $window) {
    $scope.identity = Identity;

    $scope.signin = function (username, password) {
        Auth.authenticateUser(username, password).then(function (success) {
            if (success) {
                mvNotifier.notify('You have successfully signed in!');
            } else {
                mvNotifier.error('Username/Password combination incorrect');
            }
        });
    };

    $scope.signout = function () {
        Auth.logoutUser().then(function () {
            $scope.username = "";
            $scope.password = "";
            mvNotifier.notify('You have successfully logged out!');
            $location.path('/');
        });
    };

    if (!!$window.bootstrappedUserObject) {
        $scope.$apply($scope.identity.currentUser);
        currentUser = new User();
        angular.extend(currentUser, $window.bootstrappedUserObject);
    }

});
