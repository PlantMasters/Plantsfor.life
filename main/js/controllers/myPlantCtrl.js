angular.module('plantMasters').controller('myPlantCtrl', function($scope, plantRef) {
    $scope.myPlant = plantRef;
    console.log("MY PLANT")
    console.log($scope.myPlant);
    
    $scope.myPlantDate;
    $scope.myPlantVariety;
    $scope.myPlantLocation;
    $scope.myPlantNotes;
    
    
    $scope.updateDate = function(newDate) {
        console.log('NEW DATE');
        console.log(newDate);
        $scope.myPlantDate = newDate;
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
    }
    $scope.notesBoolean = true;
    $scope.hideNotesInput = function() {
        $scope.notesBoolean = true;
    }
    $scope.showNotesInput = function() {
        $scope.notesBoolean = false;
    }
});