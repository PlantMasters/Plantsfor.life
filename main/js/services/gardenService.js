angular.module('plantMasters').service('gardenService', function($http, $q, $rootScope) {
    this.postPlant = function(plantId) {
        return $http({
            method: 'POST',
            url: '/gardenPlant',
            data: {plant: plantId}
        })
    };
    this.getGarden = function() {
        return $http({
            method: 'GET',
            url: '/gardenPlant'
        })
    };
    this.deletePlant = function(plant) {
        return $http({
            method: 'DELETE',
            url: '/removePlant/' + plant
        })
    }
    
})