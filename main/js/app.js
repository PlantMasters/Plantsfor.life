angular.module('plantMasters', ['ngResource', 'ui.router', 'angularModalService'])



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
    });

  $urlRouterProvider.otherwise('/');
});
