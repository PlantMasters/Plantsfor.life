angular.module('plantMasters').controller('myPlantCtrl', function($scope, plantRef, myPlantService) {
    $scope.myPlant = plantRef;
    console.log("MY PLANT");
    console.log($scope.myPlant);
    
    $scope.myPlantDate = $scope.myPlant.date;
    $scope.myPlantVariety = $scope.myPlant.variety;
    $scope.myPlantLocation = $scope.myPlant.location;
    $scope.myPlantNotes = $scope.myPlant.notes;
    
    
    $scope.updateDate = function(newDate) {
        $scope.myPlantDate = newDate;
        myPlantService.putDate($scope.myPlant._id, newDate);
    }
    $scope.dateBoolean = true;
    $scope.hideDateInput = function() {
        $scope.dateBoolean = true;
        return $scope.inputBoolean;
    }
    $scope.showDateInput = function() {
        $scope.dateBoolean = false;
        return $scope.inputBoolean;
    }
    
    
    $scope.updateVariety = function(newVar) {
        $scope.myPlantVariety = newVar;
        //send query with newVar;
        myPlantService.putVariety($scope.myPlant._id, newVar);
    }
    $scope.varietyBoolean = true;
    $scope.hideVarietyInput = function() {
        $scope.varietyBoolean = true;
        return $scope.varietyBoolean;
    }
    $scope.showVarietyInput = function() {
        $scope.varietyBoolean = false;
        return $scope.varietyBoolean;
    }
    
    
    $scope.updateLocation = function(newLoc) {
        $scope.myPlantLocation = newLoc;
        myPlantService.putLocation($scope.myPlant._id, newLoc);
    }
    $scope.locationBoolean = true;
    $scope.hideLocationInput = function() {
        $scope.locationBoolean = true;
    }
    $scope.showLocationInput = function() {
        $scope.locationBoolean = false;
    }
    
    
    $scope.updateNotes = function(newNote) {
        $scope.myPlantNotes = newNote;
        myPlantService.putNote($scope.myPlant._id, newNote);
    }
    $scope.notesBoolean = true;
    $scope.hideNotesInput = function() {
        $scope.notesBoolean = true;
    }
    $scope.showNotesInput = function() {
        $scope.notesBoolean = false;
    }
});