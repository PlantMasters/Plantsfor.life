angular.module('plantMasters', ['ngResource', 'ui.router'])



.config(function($urlRouterProvider, $stateProvider) {
  var routeRoleChecks = {
    user: {
      auth: function(Auth) {
        return Auth.authorizeAuthenticatedUserForRoute()
      }
    }
  };
  $stateProvider
    .state('main', {
      url: '/',
      views: {
        'search': {
          templateUrl: 'views/main.html',
          controller: 'mainCtrl'
        },
        'results': {
          templateUrl: 'views/results.html',
          controller: 'resultsCtrl'
        }
      }
    })
    .state('signup', {
      url: '/signup',
      templateUrl: 'views/signup.html',
      controller: 'SignupCtrl'
    })
    .state('profile', {
      url: '/profile',
      templateUrl: 'views/profile.html',
      controller: 'ProfileCtrl',
      resolve: routeRoleChecks.user
    })
    .state('myGarden', {
        url: '/myGarden',
        templateUrl: 'views/myGarden.html',
        controller: 'myGardenCtrl',
        resolve: {
            gardenRef: function(gardenService) {
                return gardenService.getGarden();
            }
        }
    })

  $urlRouterProvider.otherwise('/');
});
