angular.module('plantMasters').factory('User', function($resource) {
  var UserResource = $resource('/api/users/:id', {id: "@id"}, {
    update: {method: 'PUT', isArray:false}
  });


  UserResource.prototype.isAdmin = function() {
    return this.roles && this.roles.indexOf('admin') > -1;
  };
  return UserResource;
});
