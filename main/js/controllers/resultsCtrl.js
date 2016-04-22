"use strict";

angular.module('plantMasters').controller('resultsCtrl', function($scope, Identity, mvNotifier, mainSearchService, ModalService, gardenService) {
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
    mainSearchService.samplePlants();

    //watches plants for change
    $scope.$watch(() => {
        return mainSearchService.plants
    }, (newVal, oldVal) => {
        //prevents watch from triggering on page load
        if (newVal != oldVal) {
            $scope.plants = mainSearchService.getPlants();
        }
    }, true);

    $scope.getNum = function(num) {
      return new Array(num);
    }

    $scope.addToGarden = function (plant) {
        gardenService.postPlant(plant);
    };
    $scope.showCustom = function (plant) {
        ModalService.showModal({
            templateUrl: "../views/plant-modal.html",
            controller: "ModalCtrl",
            inputs: {
                plant: plant
            }
        }).then(function (modal) {
            modal.close.then(function (result) {
                console.log('HOORAY');
            });
        });

    };
});

angular.module('plantMasters').filter('range', function() {
  return function(val, range) {
    range = parseInt(range);
    for (var i=0; i<range; i++)
      val.push(i);
    return val;
  };
});
