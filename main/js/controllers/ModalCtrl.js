angular.module('plantMasters')

.controller('ModalCtrl', ['$scope', 'close', 'plant', function($scope, close, plant, Identity, mvNotifier, gardenService) {

  $scope.plant = plant;
  $scope.close = close;
  $scope.identity = Identity;
    console.log("IDENTITY");
    console.log($scope.identity)
    $scope.addToGarden = function(plant) {
        console.log('ADDING');
        if ($scope.identity.currentUser._id) {
            gardenService.postPlant(plant)
            mvNotifier.notify('Plant successfully added to your garden');
        } else {
            mvNotifier.error('Please log in or sign up to add to your garden');
        }
    }

}]);
