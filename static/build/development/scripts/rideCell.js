(function(){
    'use strict';

    angular
        .module('rideCell', [
            'ngAnimate',
            'ngSanitize',
            'ui.router',
            'ui.bootstrap',
            'rideCell.config',
            'rideCell.routes',
            'main'
        ]);

    angular
        .module('rideCell.config', ['ui.router']);

    angular
        .module('rideCell.routes', ['ui.router.router']);

    angular
        .module('rideCell')
        .run(runCSRF);

    runCSRF.$inject = ['$http'];

    function runCSRF($http) {
        $http.defaults.xsrfHeaderName = 'X-CSRFToken';
        $http.defaults.xsrfCookieName = 'csrftoken';
    };

})();