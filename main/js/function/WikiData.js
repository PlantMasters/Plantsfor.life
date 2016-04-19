// angular.module('plantMasters');
//
// function WikiData($scope, $http) {
//
//   var url = "http://en.wikipedia.org/w/api.php?action=query&titles=" + plant.latin + "&prop=pageimages&format=json&pithumbsize=600?callback=JSON_CALLBACK";
//
//   $http.jsonp(url)
//     .success(function(data) {
//       console.log(data.found);
//     });
//
// }


// Angular Code //
angular.module("plantMasters").controller("wikiData", function($scope, $http) {

  var url = 'http://en.wikipedia.org/w/api.php?action=query&titles=';
  var extra = '&prop=pageimages&format=json&pithumbsize=600?callback=JSON_CALLBACK';
  $scope.search="";

  // Gets call when the form is submitted //
  $scope.apiCall = function() {
    $http.jsonp(url + $scope.search + extra).success(function(data) {
      var obj = data.query.pages;
      console.log(obj);
      for (var prop in obj) {
        $scope.resultsThumbnail = obj[prop].thumbnail.source;
      }
      $scope.search = "";
    });
  };
});
