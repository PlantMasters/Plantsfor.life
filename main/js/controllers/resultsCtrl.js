angular.module('plantMasters').controller('resultsCtrl', function($scope, mainSearchService, $rootScope, ModalService) {
  //$scope.plants = mainSearchService.plants;

  $scope.plants;
  $rootScope.$watch('plants', function() {
    console.log('ROOTSCOPE WATCHING');
    console.log($rootScope.plants);
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
