angular.module('plantMasters').service('mainSearchService', function($http, $q, $rootScope) {
    this.currentHardinessZones = ['1', '2'];
    $rootScope.plants = this.currentHardinessZones;
    this.manageCurrentZones = function(aNum) {
        var found = false
        for (var i = 0; i < this.currentHardinessZones.length; i++) {
            if (this.currentHardinessZones[i] === aNum) {
                found = true;
                this.currentHardinessZones.splice(i, 1);
            }
        }
        if (!found) {
            this.currentHardinessZones.push(aNum);
        }
        //invoke function here
    };
    this.medicalSelected = [];
    this.manageMedicalSelected = function(use) {
        var found = false;
        for (var i = 0; i < this.medicalSelected.length; i++) {
            if (this.medicalSelected[i] === use) {
                found = true;
                this.medicalSelected.splice(i, 1);
            }
        }
        if (!found) {
            this.medicalSelected.push(use);
        }
    };
    this.edibleSelected = [];
    this.manageEdibleSelect = function(use) {
       var found = false;
       for (var i = 0; i < this.edibleSelected.length; i++) {
           if (this.edibleSelected[i] === use) {
               found = true;
               this.edibleSelected.splice(i, 1);
           }
       }
       if (!found) {
           this.edibleSelected.push(use);
       }
   };
   this.otherSelected = [];
   this.manageOtherSelect = function(use) {
       var found = false;
       for (var i = 0; i < this.otherSelected.length; i++) {
           if (this.otherSelected[i] === use) {
               found = true;
               this.otherSelected.splice(i, 1);
           }
       }
       if (!found) {
           this.otherSelected.push(use);
       }
   };
   
//    this.findPlants = function() {
//        return $http({
//            method: 'GET',
//            url: '/findPlants/' + 
//        })
//    }
})