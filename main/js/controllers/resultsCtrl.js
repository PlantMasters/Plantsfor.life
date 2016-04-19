"use strict";

angular.module('plantMasters').controller('resultsCtrl', function ($scope, mainSearchService, $rootScope, ModalService, gardenService) {

    //initialize plants and get random plants for page load

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
