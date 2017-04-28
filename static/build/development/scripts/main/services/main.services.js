(function(){
    'use strict';

    angular
        .module('main.services')
        .factory('Main', Main);

    Main.$inject = ['$http', '$sce', '$q'];

    function Main($http, $sce, $q) {
        var vm = this;

        var Main = {
            getParkingLots: getParkingLots,
            reserveSpot: reserveSpot,
            cancelSpot: cancelSpot
        };

        return Main;

        function generalCallbackSuccess(response){
            return response.data;
        };

        function generalCallbackError(response){
            return $q.reject(response);
        };

        function getParkingLots(position){
            return $http.get('api/v1/parking-lot-locations?lat='+position.lat+'&lng='+position.lng+'&radius='+position.radius+'')
                .then(generalCallbackSuccess)
                .catch(generalCallbackError);
        };

        function reserveSpot(lotId){
            return $http.post('api/v1/spot-reservation/', lotId)
                .then(generalCallbackSuccess)
                .catch(generalCallbackError);
        };

        function cancelSpot(reservationId){
            return $http.delete('api/v1/spot-reservation/'+reservationId+'/')
                .then(generalCallbackSuccess)
                .catch(generalCallbackError);
        };

    };
})();
