(function(){
    'use strict';

    angular
        .module('rideCell.routes')
        .config(config);

    config.$inject = ['$stateProvider', '$urlRouterProvider'];

    function config($stateProvider, $urlRouterProvider){

        $urlRouterProvider.otherwise(function($injector){
            var $state = $injector.get('$state');
            $state.go('app');
        });

        $stateProvider
            .state('app', {
                url: '/app',
                controller: 'AppController',
                controllerAs: 'vm',     
                templateUrl: static_path('views/main/app.html'),
            });
    };
})();

