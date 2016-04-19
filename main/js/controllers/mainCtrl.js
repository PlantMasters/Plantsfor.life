
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
        "Gelatin": false,
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
    $scope.$watch('medicalUses', (newVal, oldVal) => {
        if (newVal != oldVal) {
            mainSearchService.addMedicalSpecific(newVal);
        }
    }, true);

    // watches otherSelected array for changes, pushes specific changes
    $scope.$watch('otherUses', (newVal, oldVal) => {
        if (newVal != oldVal) {
            mainSearchService.addOtherSpecific(newVal);
        }
    }, true);

    //watches edibleUses for changes
    $scope.$watch('edibleUses', (newVal, oldVal) => {
        if (newVal != oldVal) {
            mainSearchService.manageEdible(newVal);
        }
    }, true);

    //watches zones for changes
    $scope.$watch('zones', (newVal, oldVal) => {
        if (newVal != oldVal) {
            mainSearchService.manageZone(newVal);
        }
    }, true);

    $scope.searchInputUse = function () {
        //send typed use to backend and return plants with that use;
    };

    //ensures only one zone is selected at a time
    $scope.hardinessZone = function (aNum) {
        for (let obj in $scope.zones) {
            if ($scope.zones[obj] && obj != aNum) {
                $scope.zones[obj] = false;
            }

            //TODO: fix hardiness unclick
        }
        $scope.zones[aNum] = true;
        mainSearchService.manageZone(aNum);
    };
});
