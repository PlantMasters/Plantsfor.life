//If we ever need to do this on the front end.  Use this code ...
var url = 'http://en.wikipedia.org/w/api.php?action=query&titles=';

var extra = '&prop=pageimages&format=json&pithumbsize=400&callback=JSON_CALLBACK';

// Angular Code //
angular.module('plantMasters').controller("wikiData", function($scope, $http) {
  $scope.search = "";
  // Gets call when the form is submitted //
  $scope.apiCall = function() {
    $http.jsonp(url + $scope.search + extra)
      .success(function(data) {
        var obj = data.query.pages;
        for (var prop in obj) {
          $scope.resultsThumbnail = obj[prop].thumbnail.source;
        }
        $scope.search = "";
      })
      .error(function(data) {
        console.log("Ya done messed up!" + status);
      });
  };
});
