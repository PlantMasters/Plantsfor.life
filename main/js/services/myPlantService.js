angular.module('plantMasters').service('myPlantService', function($http) {
    this.putVariety = function(myPlantId, newVar) {
        $http({
            method: 'PUT',
            url: '/myPlantVariety',
            data: {plantId: myPlantId, newVariety: newVar}
        })
    };
    this.putDate = function(myPlantId, newDate) {
        console.log(newDate);
        $http({
            method: 'PUT',
            url: '/myPlantDate',
            data: {plantId: myPlantId, date: newDate}
        })
    };
    this.putLocation = function(myPlantId, newLoc) {
        $http({
            method: 'PUT',
            url: '/myPlantLocation',
            data: {plantId: myPlantId, newLocation: newLoc}
        })
    }; 
    this.putNote = function(myPlantId, newNote) {
        $http({
            method: 'PUT',
            url: '/myPlantNotes',
            data:  {plantId: myPlantId, newNote: newNote}
        })
    }
})