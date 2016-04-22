/*jshint esversion: 6 */
(function() {
  'use strict';
  // this function is strict...

angular.module('plantMasters').controller('resultsCtrl', function ($scope, mainSearchService, ModalService, gardenService) {

    //get random plants for page load
    mainSearchService.samplePlants();

    //watches plants for change
    $scope.$watch(() => {
      return mainSearchService.plants;
    }, (newVal, oldVal) => {
      //prevents watch from triggering on page load
      if (newVal != oldVal) {
        $scope.plants = mainSearchService.getPlants();
      }
    }, true);

    //adds plant to garden
    $scope.addToGarden = function (plant) {
        gardenService.postPlant(plant);
    };

    //pops up a modal of the selected plant
    $scope.showCustom = function (plant) {
        ModalService.showModal({
            templateUrl: "../views/plant-modal.html",
            controller: "ModalCtrl",
            inputs: {
                plant: plant
            }
        }).then(function (modal) {
            modal.close.then(function () {
                console.log('HOORAY');
            });
        });
      });
    };

    $scope.moar = () => {
      mainSearchService.moarPlants();
    };
  });
});

//used to color the correct amount of bandaids or carrots in plant card
angular.module('plantMasters').filter('range', function () {
    return function (val, range) {
        range = parseInt(range);
        for (var i = 0; i < range; i++)
            val.push(i);
        return val;
    };
});
