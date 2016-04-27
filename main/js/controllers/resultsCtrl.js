/*jshint esversion: 6 */
"use strict";


angular.module('plantMasters').controller('resultsCtrl', function($scope, Identity, mvNotifier, mainSearchService, ModalService, gardenService) {
    //$scope.plants = mainSearchService.plants;
    $scope.identity = Identity;

    $scope.addToGarden = function(plant) {

        if ($scope.identity.currentUser._id) {
            gardenService.postPlant(plant);
            mvNotifier.notify('Plant successfully added to your garden');
        } else {
            mvNotifier.error('Please log in or sign up to add to your garden');
        }
    };

    $scope.plants;

    //get random plants for page load
    mainSearchService.samplePlants();

    //watches plants for change
    $scope.$watch(() => {
        return mainSearchService.plants;
    }, (newVal, oldVal) => {
        //prevents watch from triggering on page load
        if (newVal != oldVal) {
            $scope.plants = mainSearchService.getPlants();
            document.body.scrollTop = document.documentElement.scrollTop = 0;
        }
    }, true);

    //pops up a modal of the selected plant
    $scope.showCustom = function (plant, identity) {
        ModalService.showModal({
            templateUrl: "../views/plant-modal.html",
            controller: "ModalCtrl",
            inputs: {
                plant: plant,
                identity: identity
            }
        }).then(function (modal) {
            modal.close.then(function () {

            });
        });

    };

    $scope.getMore = () => {
        // $('.resultsContainer').css("overflow", "hidden");
        // $(document).animate({ scrollTop: 0 }, 'fast');
        // $('.resultsContainer').css("overflow", "auto");
        document.body.scrollTop = document.documentElement.scrollTop = 0;


        mainSearchService.getMore();
    };
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
