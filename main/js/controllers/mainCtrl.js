"use strict";

angular.module('plantMasters').controller('mainCtrl', ($scope, $window, mainSearchService) => {

    //define search options
    $scope.medicalUses = {
        "Alternative Medicine": false,
        "Bacteria/Viruses/Fungi/Parasites": false,
        "Bites/Stings": false,
        "Bones": false,
        "Bowels/Bladder": false,
        "Cancer": false,
        "Chest/Lungs": false,
        "Ear/Nose/Throat/Eyes": false,
        "Fevers": false,
        "General Well Being": false,
        "Heart/Blood": false,
        "Infectious Diseases": false,
        "Liver/Kidneys": false,
        "Nerves/Muscles": false,
        "Other": false,
        "Pain Relief": false,
        "Sex/Reproduction": false,
        "Skin/Hands/Feet": false,
        "Stomach": false,
        "Wounds/Bruises": false,
        "Whole Body": false
    };
    $scope.otherUses = {
        "Building": false,
        "Clothing": false,
        "Dyes/Paints/Ink/Paper": false,
        "Fertilizers": false,
        "Fire/Lighting": false,
        "Bathroom": false,
        "Garden": false,
        "Home": false,
        "Kitchen": false,
        "Other": false,
        "Pesticides": false,
        "Woodwork/Crafts": false
    };
    $scope.edibleUses = {
        "Chocolate": false,
        "Coffee": false,
        "Coloring": false,
        "Condiment": false,
        "Curdling": false,
        "Drink": false,
        "Egg": false,
        "Gelatine": false,
        "Gum": false,
        "Milk": false,
        "Oil": false,
        "Pectin": false,
        "Rutin": false,
        "Salt": false,
        "Stabilizer": false,
        "Sweetener": false,
        "Tea": false
    };
    $scope.zones = {
        1: false,
        2: false,
        3: false,
        4: false,
        5: false,
        6: false,
        7: false,
        8: false,
        9: false
    };
    $scope.typedUse = [];


    //watches medicalSelected array for changes, pushes specific changes
    $scope.$watch('medicalUses',
        (newVal, oldVal) => {
            if (newVal != oldVal) {
                console.log("whatever");
                // Only increment the counter if the value changed
                mainSearchService.addMedicalSpecific(newVal);
            }
        }, true);

    // watches otherSelected array for changes, pushes specific changes
    $scope.$watch('otherUses'
        , function (newVal, oldVal) {
            if (newVal != oldVal) {
                mainSearchService.addOtherSpecific();
            }
        }, true);
    $scope.$watch('zones'
        , function (newVal, oldVal) {
            console.log("popop");
            if (newVal != oldVal) {
                mainSearchService.addOtherSpecific();
            }
        }, true);
    $scope.searchInputUse = function () {
        // console.log($scope.typedUse);
        //send typed use to backend and return plants with that use;
    };

    //zone array to send with uses to the backend and retrieve plants
    $scope.currentHardinessZone = mainSearchService.currentHardinessZones;
    //function that manages the zones array and then invokes a function that will send zones and uses to backend
    $scope.hardinessZone = function (aNum) {
        for (let obj in $scope.zones) {
            console.log(obj);
            if ($scope.zones[obj] && obj != aNum) {
                $scope.zones[obj] = false;
            }
        }
        $scope.zones[aNum] = true;
        mainSearchService.manageCurrentZones(aNum);
    };

    //function that returns true or false to toggle green color on front end
    // $scope.zoneIsActive = function (zone) {
    //     return mainSearchService.currentHardinessZones === zone;
    // };


    //medical uses array
    $scope.medicalSelected = mainSearchService.medicalSelected;
    //function that manages medical uses array and then invokes a function that will send zones and uses to backend
    $scope.medicalSelect = function (use) {
        mainSearchService.manageMedicalSelected(use);
    };
    //function that returns true or false to toggle green color on front end
    // $scope.medicalIsActive = function (use) {
    //     var foundUse = false;
    //     for (var i = 0; i < $scope.medicalSelected.length; i++) {
    //         if ($scope.medicalSelected[i] === use) {
    //             return true
    //         }
    //     }
    //     if (!foundUse) {
    //         return false
    //     }
    // };


    //edible uses array
    $scope.edibleSelected = mainSearchService.edibleSelected;
    //function that manages edible uses array and then invokes a function that will send zones and uses to backend
    $scope.edibleSelect = function (use) {
        mainSearchService.manageEdibleSelect(use);
    };
    //function that returns true or false to toggle green color on front end
    // $scope.edibleIsActive = function (use) {
    //     var foundUse = false;
    //     for (var i = 0; i < $scope.edibleSelected.length; i++) {
    //         if ($scope.edibleSelected[i] === use) {
    //             return true
    //         }
    //     }
    //     if (!foundUse) {
    //         return false
    //     }
    // };

    //other uses array
    $scope.otherSelected = mainSearchService.otherSelected;
    //function that manages other uses array and then invokes a function that will send zones and uses to backend
    $scope.otherSelect = function (use) {
        mainSearchService.manageOtherSelect(use);
    };
    //function that returns true or false to toggle green color on front end
    // $scope.otherIsActive = function (use) {
    //     var foundUse = false;
    //     for (var i = 0; i < $scope.otherSelected.length; i++) {
    //         if ($scope.otherSelected[i] === use) {
    //             return true
    //         }
    //     }
    //     if (!foundUse) {
    //         return false
    //     }
    // };
});
