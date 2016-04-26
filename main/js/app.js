angular.module('plantMasters', ['ngResource', 'ui.router', 'angularModalService', 'ngAnimate'])


.config(function($urlRouterProvider, $stateProvider) {
  var routeRoleChecks = {
    user: {
      auth: function(Auth) {
        return Auth.authorizeAuthenticatedUserForRoute();
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
    .state('about', {
      url: '/about',
      templateUrl: 'views/about.html',
      controller: 'AboutCtrl'
    })
    .state('myPlant', {
<<<<<<< HEAD
        url: '/myPlant/:plantId',
        templateUrl: 'views/myPlant.html',
        controller: 'myPlantCtrl',
        resolve: {
            plantRef: function(gardenService, $stateParams) {
                return gardenService.getPlant($stateParams.plantId);
            }
        }
    })
=======
      url: '/myPlant/:plantId',
      templateUrl: 'views/myPlant.html',
      controller: 'myPlantCtrl',
      resolve: {
        plantRef: function(gardenService, $stateParams) {
          return gardenService.getPlant($stateParams.plantId);
        }
      }
    });
>>>>>>> 1f0217634d2758315b68473f50b702edddfed8ee

  $urlRouterProvider.otherwise('/');
});
