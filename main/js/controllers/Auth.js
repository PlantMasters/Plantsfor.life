angular.module('plantMasters').factory('Auth', function($http, Identity, $q, User){
  return {
    authenticateUser: function(username, password) {
      var dfd = $q.defer();
      $http.post('/login', {username:username, password:password}).then(function(response) {
        if(response.data.success) {
          var user = new User();
          angular.extend(user, response.data.user);
          Identity.currentUser = user;
          dfd.resolve(true);
        } else {
          dfd.resolve(false);
        }
      });
      return dfd.promise;
    },
    createUser: function(newUserData) {
      var newUser = new User(newUserData);
      var dfd = $q.defer();

      newUser.$save().then(function() {
        Identity.currentUser = newUser;
        dfd.resolve();
      }, function(response) {
        dfd.reject(response.data.reason);
      });
      return dfd.promise;
    },
    updateCurrentUser: function(newUserData) {
      var dfd = $q.defer();

      var clone = angular.copy(Identity.currentUser);
      angular.merge(clone, newUserData);
      clone.$update().then(function() {
        Identity.currentUser = clone;
        dfd.resolve();
      }, function(response) {
        dfd.reject(response.data.reason);
      });
      return dfd.promise;
    },
    logoutUser: function() {
      var dfd = $q.defer();
      $http.post('/logout', {logout:true}).then(function(){
        Identity.currentUser = undefined;
        dfd.resolve();
      });
      return dfd.promise;
    },
    authorizeCurrentUserForRoute: function(role) {
      if(Identity.isAuthorized('admin')) {
        return true;
      } else {
        return $q.reject('not authorized');
      }
    },
    authorizeAuthenticatedUserForRoute: function() {
      if(Identity.isAuthenticated()) {
        return true;
      } else {
        return $q.reject('not authorized');
      }
    }
  };
});
