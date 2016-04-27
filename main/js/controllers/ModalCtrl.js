angular.module('plantMasters')

.controller('ModalCtrl', ['$http', '$scope', '$rootScope', 'close', 'plant', 'identity', 'mvNotifier', 'gardenService', function($http, $scope, $rootScope, close, plant, identity, mvNotifier, gardenService) {

  $scope.plant = plant;
  $rootScope.close = close;
  $http.get('../medCats.json').then(function(response) {
  $scope.definition = response.data;

  });
  $scope.toolCall = function(use) {
    var tooltiptext = "";
    for (var key in $scope.definition) {
      if (use == key) {
        tooltiptext = $scope.definition[key];
      }
    }
    $scope.tooltiptext = tooltiptext;
  };




  $scope.identity = identity;

  $scope.addToGarden = function(plant) {
    console.log('ADDING');
    if ($scope.identity.currentUser._id) {
      gardenService.postPlant(plant);
      mvNotifier.notify('Plant successfully added to your garden');
    } else {
      mvNotifier.error('Please log in or sign up to add to your garden');
    }
  };

}]);
