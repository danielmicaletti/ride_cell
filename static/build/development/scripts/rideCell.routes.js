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
                // abstract: true,
                url: '/app',
                controller: 'AppController',
                controllerAs: 'vm',     
                templateUrl: static_path('views/main/app.html'),
                // data: {
                //     requireLogin: true
                // },
            });
            // .state('app.dashboard', {
            //     url: '/dashboard/:userId',
            //     controller: 'DashBoardController',
            //     controllerAs: 'vm',     
            //     templateUrl: static_path('views/main/dashboard.html'),
            //     data: {
            //         requireLogin: true
            //     },
            // })
    };
})();

