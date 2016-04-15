angular.module('plantMasters', ['ngResource','ui.router'])

.config(function($urlRouterProvider, $stateProvider) {
    $stateProvider
        .state('main', {
            url:'/',
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

        $urlRouterProvider.otherwise('/');
})
