(function(){
    'use strict';

    angular
        .module('rideCell.config')
        .config(config);

    config.$inject = ['$locationProvider', '$urlMatcherFactoryProvider', '$httpProvider'];

    function config($locationProvider, $urlMatcherFactoryProvider, $httpProvider){
        // $locationProvider.html5Mode({enabled: true, requireBase: false});
        $locationProvider.hashPrefix('');
		$urlMatcherFactoryProvider.caseInsensitive(true);
		$urlMatcherFactoryProvider.strictMode(false); 
    };
})();