angular.module('plantMasters').controller('resultsCtrl', function ($scope, mainSearchService) {

    //initialize plants and get random plants for page load
    $scope.plants;
    mainSearchService.samplePlants();

    //watches plants for change
    $scope.$watch(() =>{return mainSearchService.plants}, (newVal, oldVal) => {
        //prevents watch from triggering on page load
        if (newVal != oldVal) {
            $scope.plants = mainSearchService.getPlants();
        }
    }, true);
});
