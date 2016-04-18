angular.module('plantMasters')

.controller('ModalCtrl', ['$scope', 'close', 'plant', function($scope, close, plant) {

  $scope.plant = plant;
  $scope.close = close;


}]);
