angular.module('plantMasters')

.controller('ModalCtrl', ['$scope', 'ModalService', function($scope, ModalService) {

  $scope.showCustom = function(plant) {

    ModalService.showModal({
      templateUrl: "../views/plant-modal.html",
      controller: "ModalController",
      plant: plant,
      resolve: {
        plants: function() {
          return $scope.plants;
        },
        plant: function() {
          return plant;
        }
      }
    }).then(function(modal) {
      modal.close.then(function(result) {
        $scope.customResult = "All good!";
      });
    });

  };
}])

.controller('ModalController', ['$scope', 'close', function($scope, close, plants, plant) {

  $scope.close = close;
  $scope.plants = plants;
  $scope.plant = plant;

}]);
