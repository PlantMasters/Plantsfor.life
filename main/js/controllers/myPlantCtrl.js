angular.module('plantMasters').controller('myPlantCtrl', function($scope, plantRef) {
    $scope.myPlant = plantRef;
    console.log("MY PLANT")
    console.log($scope.myPlant);
    $scope.myPlantDate = "Enter date planted...";
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
    
    $scope.varietyBoolean = true;
    $scope.hideVarietyInput = function() {
        $scope.varietyBoolean = true;
        return $scope.varietyBoolean;
    }
    $scope.showVarietyInput = function() {
        $scope.varietyBoolean = false;
        return $scope.varietyBoolean;
    }
});