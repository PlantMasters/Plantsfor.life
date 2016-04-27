angular.module('plantMasters')

.controller('ModalCtrl', ['$http', '$scope', 'close', 'plant', 'identity', 'mvNotifier', 'gardenService', function($http, $scope, close, plant, identity, mvNotifier, gardenService) {

  $scope.plant = plant;
  $scope.close = close;

  $scope.toolCall = function(use) {
    $http.get('../medCats.json').then(function(response) {
      var definition = response.data;
      var tooltiptext = "";
      for (var key in definition) {
        if (use == key) {
          tooltiptext = definition[key];
        }
      }
      console.log(tooltiptext);
    });
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
