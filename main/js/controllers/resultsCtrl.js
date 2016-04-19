angular.module('plantMasters').controller('resultsCtrl', function($scope, Identity, mvNotifier, mainSearchService, $rootScope, ModalService, gardenService) {
  //$scope.plants = mainSearchService.plants;
  $scope.identity = Identity;
  console.log("IDENTITY");
  console.log($scope.identity)
  $scope.addToGarden = function(plant) {
      if ($scope.identity.currentUser._id) {
          gardenService.postPlant(plant)
          mvNotifier.notify('Plant successfully added to your garden');
      } else {
          mvNotifier.error('Please log in or sign up to add to your garden');
      }
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
