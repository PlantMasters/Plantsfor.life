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
        }).then(function (response) {
            return response;
        }, function (error) {
            console.log("CANT GET GARDEN NEED TO LOG IN")
        })
    };
    this.deletePlant = function(plant) {
        return $http({
            method: 'DELETE',
            url: '/removePlant/' + plant
        })
    };
    this.getPlant = function(plantId) {
        return $http({
            method: 'GET',
            url: '/getGardenPlant/' + plantId
        }).then(function(response) {
            console.log(response.data);
            return response.data;
        })
    }
    
})