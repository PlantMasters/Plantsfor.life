angular.module('plantMasters')

.controller('ModalCtrl', ['$scope', 'close', 'plant', function($http, $scope, close, plant) {

  $scope.plant = plant;
  $scope.close = close;

  $scope.toolCall = function() {
    $http.get('../medCats.json').then(function(response) {
      var definition = response.data;
      console.log(definition);
    });
  };
}]);
