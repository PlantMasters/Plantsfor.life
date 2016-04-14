angular.module('plantMasters').controller('resultsCtrl', function($scope, mainSearchService, $rootScope) {
    //$scope.plants = mainSearchService.plants;
    console.log('ROOT SCOPE');
    console.log($rootScope.plants);
    $rootScope.$watch('plants', function() {
        console.log('WATCHING');
        console.log($rootScope.plants);
    })
    
})