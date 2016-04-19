angular.module('plantMasters').controller('resultsCtrl', function ($scope, mainSearchService) {

    $scope.plants;
    mainSearchService.samplePlants();

    $scope.$watch(() =>{return mainSearchService.plants}, (newVal, oldVal) => {
        if (newVal != oldVal) {
            $scope.plants = mainSearchService.getPlants();
        }
    }, true);
});
