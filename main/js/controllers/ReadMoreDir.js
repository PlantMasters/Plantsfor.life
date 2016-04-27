angular.module('plantMasters').directive('showMore',
function(){
    return {
        templateUrl: '../views/showMore.html',
        restrict: 'A',
        transclude: true,
        scope:{
            'showMoreHeight': '@'
        },
        controller: ['$scope', '$element', '$interval', function($scope, $element, $interval) {

            $scope.expanded = false;

            $interval(function(){
                renderStyles();
            }, 300);

            $scope.expandable = false;
            function renderStyles(){
                if($element.prop('offsetHeight') >= $scope.showMoreHeight && $scope.expanded === false){
                    $scope.expandable = true;
                }
            }

            $scope.showLessStyle = {
                'max-height': $scope.showMoreHeight + 'px',
                'overflow': 'hidden'
            };

        }]
    };
});
