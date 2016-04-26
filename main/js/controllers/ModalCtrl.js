angular.module('plantMasters')

.controller('ModalCtrl', ['$scope', 'close', 'plant', 'identity', 'gardenService', 'mvNotifier', function($scope, close, plant, identity, mvNotifier, gardenService) {

  $scope.plant = plant;
  $scope.close = close;

  $scope.toolCall = function() {
    $http.get('../medCats.json').then(function(response) {
      var definition = response.data;
      console.log(definition);
    });
  };

  $scope.identity = identity;
  console.log("IDENTITY MODAL");
  console.log($scope.identity);

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
