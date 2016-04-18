angular.module('plantMasters').controller('resultsCtrl', function($scope, mainSearchService, $rootScope, gardenService) {
    //$scope.plants = mainSearchService.plants;
    
    $scope.plants;
    $rootScope.$watch('plants', function() {
        $scope.plants = $rootScope.plants;
    })
    

})
