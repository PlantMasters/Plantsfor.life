angular.module('plantMasters').controller('resultsCtrl', function($scope, mainSearchService, $rootScope) {
    //$scope.plants = mainSearchService.plants;

    $scope.plants;
    $rootScope.$watch('plants', function() {
        console.log('ROOTSCOPE WATCHING');
        console.log($rootScope.plants);
        $scope.plants = $rootScope.plants;
    })

})
