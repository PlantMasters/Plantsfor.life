angular.module('plantMasters', ['ui.router'])

.config(function($urlRouterProvider, $stateProvider) {
    $stateProvider
        .state('landing', {
            url:'/',
            controller: 'landingCtrl',
            templateUrl: 'views/landing.html'
        })
        $urlRouterProvider.otherwise('/');
})
