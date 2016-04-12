angular.module('plantMasters').controller('mainCtrl', function($scope, $window) {


//HTML5 Geolocation
$window.navigator.geolocation.getCurrentPosition(function(position) {
  var location = [ position.coords.latitude, position.coords.longitude ]

  $scope.$apply(function () {
    $scope.coordinates = location;
  });
});

//Zipcode Location
  $scope.submitZip = function(zip) {
    $scope.zip = zip;
    MainSvc.submitZip();
  }


   $scope.medicalUses = ["Band Aids", "Blood Thinner", "Blood Clotter", "Anti-Inflametory", "Fever Reducer"];
   $scope.edibleUses = ["Preservative", "Fiber", "Vitamin C", "Great in Pies"];
   $scope.otherUses = ["Insecticide", "Oil", "Paint", "Wood", "Microscope", "Waterproofing"];
   $scope.show = true;
   $scope.toggleShow = function() {
       if ($scope.show) {
           $scope.show = false;
       }
       else {
           $scope.show = true;
       }
   }
   $scope.medicalSelected = [];
   $scope.medicalSelect = function(use) {
       var found = false;
       for (var i = 0; i < $scope.medicalSelected.length; i++) {
           if ($scope.medicalSelected[i] === use) {
               found = true;
               $scope.medicalSelected.splice($scope.medicalSelected[i], 1);
               console.log($scope.medicalSelected);
           }
       }
       if (!found) {
           $scope.medicalSelected.push(use);
       }
       console.log($scope.medicalSelected);
   }
   $scope.medicalIsActive = function(use) {
       var foundUse = false;
       for (var i = 0; i < $scope.medicalSelected.length; i++) {
         if ($scope.medicalSelected[i] === use) {
             return true
         }
       }
       if (!foundUse) {
           return false
       }
   }

   $scope.edibleSelected = [];
   $scope.edibleSelect = function(use) {
       var found = false;
       for (var i = 0; i < $scope.edibleSelected.length; i++) {
           if ($scope.edibleSelected[i] === use) {
               found = true;
               $scope.edibleSelected.splice($scope.edibleSelected[i], 1);
               console.log($scope.edibleSelected);
           }
       }
       if (!found) {
           $scope.edibleSelected.push(use);
       }
       console.log($scope.edibleSelected);
   }
   $scope.edibleIsActive = function(use) {
       var foundUse = false;
       for (var i = 0; i < $scope.edibleSelected.length; i++) {
         if ($scope.edibleSelected[i] === use) {
             return true
         }
       }
       if (!foundUse) {
           return false
       }
   }

   $scope.otherSelected = [];
   $scope.otherSelect = function(use) {
       var found = false;
       for (var i = 0; i < $scope.otherSelected.length; i++) {
           if ($scope.otherSelected[i] === use) {
               found = true;
               $scope.otherSelected.splice($scope.otherSelected[i], 1);
               console.log($scope.otherSelected);
           }
       }
       if (!found) {
           $scope.otherSelected.push(use);
       }
       console.log($scope.otherSelected);
   }
   $scope.otherIsActive = function(use) {
       var foundUse = false;
       for (var i = 0; i < $scope.otherSelected.length; i++) {
         if ($scope.otherSelected[i] === use) {
             return true
         }
       }
       if (!foundUse) {
           return false
       }
   }
})
