angular.module('plantMasters').factory('Identity', function() {
  var currentUser;

  // var userCall = function() {
  //   $http.get('/bootstrappedUser').success(function(data, status, headers, config) {
  //       currentUser = data;
  //       console.log(data);
  //   }).catch(function (err){
  //     currentUser = undefined;
  //     console.log("ERROR!!!!");
  //   })
  // };
  // userCall();

  return {
    currentUser: currentUser,
    isAuthenticated: function() {
      return !!this.currentUser;
    },
    isAuthorized: function(role) {
      return !!this.currentUser && this.currentUser.roles.indexOf(role) > -1;
    }
  };
});
