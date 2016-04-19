angular.module('plantMasters').controller('resultsCtrl', function($scope, Identity, mainSearchService, $rootScope, ModalService, gardenService) {
  //$scope.plants = mainSearchService.plants;
  $scope.addToGarden = function(plant) {
        gardenService.postPlant(plant);
  }
  $scope.plants;
  $rootScope.$watch('plants', function() {
    $scope.plants = $rootScope.plants;
  })

  $scope.showCustom = function(plant) {
    console.log(plant);
    ModalService.showModal({
      templateUrl: "../views/plant-modal.html",
      controller: "ModalCtrl",
      inputs: {
        plant: plant
      }
    }).then(function(modal) {
      modal.close.then(function(result) {
        console.log('HOORAY');
      });
    });

  };

})
