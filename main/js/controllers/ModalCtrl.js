angular.module('plantMasters')

.controller('ModalCtrl', ['$scope', 'ModalService', function($scope, ModalService) {

  $scope.showCustom = function() {

    ModalService.showModal({
      templateUrl: "../views/plant-modal.html",
      controller: "ModalController"
    }).then(function(modal) {
      modal.close.then(function(result) {
        $scope.customResult = "All good!";
      });
    });

  };
}])

.controller('ModalController', ['$scope', 'close', function($scope, close) {

  $scope.close = close;

}]);
