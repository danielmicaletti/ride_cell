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

})();;(function(){
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
})();;(function(){
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

;(function(){
    'use strict';

    angular
        .module('main', [
            'main.controllers',
            'main.services',
            'main.directives',
        ]);

    angular
        .module('main.controllers', []);

    angular
        .module('main.services', []);
        
    angular
        .module('main.directives', []);

})();;(function(){
    'use strict';

    angular
        .module('main.controllers')
        .controller('AppController', AppController);

    AppController.$inject = ['$scope', '$sce', '$timeout', '$uibModal', 'Main'];

    function AppController($scope, $sce, $timeout, $uibModal, Main){
        var vm = this;

        vm.loading = true;

        vm.alerts = [];

        var mediaPath = media_path('');
        var staticPath = static_path('');

        $scope.path = { 
            static_files: $sce.trustAsResourceUrl(staticPath),
            media: $sce.trustAsResourceUrl(mediaPath),
        };

        function activate(){
            getUserPosition();
        };

        function geoLocError() {
            console.log("Unable to retrieve your location");
            setMap({lat: 37.769706, lng: -122.447939});
        };

        function getUserPosition(){
            if (!navigator.geolocation){
                console.log("Geolocation is not supported by your browser");
                vm.userPosition = {lat: 37.769706, lng: -122.447939};
                setMap(vm.userPosition);
            }else{
                navigator.geolocation.getCurrentPosition(function(position){
                    vm.userPosition = {lat:position.coords.latitude, lng:position.coords.longitude};
                    setMap(vm.userPosition);
                }, geoLocError);
            }
        };

        function setMap(position){
            vm.map = new google.maps.Map(document.getElementById('map'), {
                center: position,
                zoom: 13
            });

            var marker = new google.maps.Marker({
                position: position,
                map: vm.map,
                draggable: true,
                flat:true,
                label: {
                    fontFamily: 'Fontawesome',
                    text: '\uf2bd'
                }
            });

            marker.addListener('dragend', function(){
                var newPosition = {lat:marker.getPosition().lat(), lng:marker.getPosition().lng()};
                vm.map.setCenter(newPosition);
                mapRadius = getMapRadius();
                vm.getParkingLots(newPosition, mapRadius.radius);

            });

            vm.map.addListener('zoom_changed', function(){
                mapRadius = getMapRadius();
                vm.getParkingLots(mapRadius.position, mapRadius.radius);
            });

            vm.loading = false;

            var mapRadius = getMapRadius();

            vm.getParkingLots(mapRadius.position, mapRadius.radius);
        };

        function initMapError(errMsg){
            console.log(errMsg);
            vm.mapError = "Sorry, your map could not be loaded. Please try again later.";
        };

        function getMapRadius(){
            var radius = 10
            var bounds = vm.map.getBounds();
            var center = vm.map.getCenter()
            var position = {lat:vm.map.getCenter().lat(), lng:vm.map.getCenter().lng()};
            
            if(bounds && center){
                var ne = bounds.getNorthEast();
                radius = google.maps.geometry.spherical.computeDistanceBetween(center, ne)/1609.344;
            };
            vm.curRadius = radius;
            return {radius:radius, position:position};
        };

        vm.getParkingLots = function(position, radius){
            position['radius'] = radius;
            Main.getParkingLots(position)
                .then(getParkingLotsSuccess)
                .catch(getParkingLotsError);
        };

        function getParkingLotsSuccess(response){
            vm.parkingLots = response;
            plotLots(vm.parkingLots, vm.map);
        };

        function getParkingLotsError(errMsg){
            console.log(errMsg);
        };

        function plotLots(lots, map){
            angular.forEach(lots, function(val){

                var marker = new google.maps.Marker({
                    position: {lat: val.parking_lot_location[0], lng: val.parking_lot_location[1]},
                    map: map,
                    animation: google.maps.Animation.DROP,
                    draggable: false,
                    flat:true,
                    label: {
                        fontFamily: 'Fontawesome',
                        text: '\uf1b9'
                    },
                    title: val.parking_lot_name
                });

                marker.addListener('click', function() {
                    vm.openModal(val);
                });

            });
        };

        vm.openModal = function(lot){

            var modalInstance = $uibModal.open({
                animation: true,
                templateUrl: $sce.trustAsResourceUrl(static_path('views/modals/reserve.modal.html')),
                controller: 'ReserveModalController',
                controllerAs: 'vm',
                size: 'md',
                resolve: {
                lot: function(){
                    return lot;
                }
            }
        });

        modalInstance.result.then(function(lotId){
                if(lotId){
                    Main.reserveSpot(lotId)
                        .then(reserveSpotSuccess)
                        .catch(reserveSpotError);
                };
                
            }, function(){
                console.log('Modal dismissed');
            });
        };

        function reserveSpotSuccess(response){
            vm.addAlert({
                type: 'success',
                msg: 'Your spot has been reserved!'
            });

            vm.getParkingLots(vm.userPosition, vm.curRadius);
        };

        function reserveSpotError(errMsg){
            console.log(errMsg);
        };

        vm.addAlert = function(alert){
            vm.alerts.push({
                type: alert.type,
                msg: alert.msg
            });
            $timeout(function(){
                vm.closeAlert(0);
            }, 3000);
        };

        vm.closeAlert = function(index) {
            vm.alerts.splice(index, 1);
        };

        activate();
    };
})();
;(function(){
    'use strict';

    angular
        .module('main.controllers')
        .controller('ReserveModalController', ReserveModalController);

    ReserveModalController.$inject = ['$uibModalInstance', 'lot'];

    function ReserveModalController($uibModalInstance, lot){
        var vm = this;

        vm.lot = lot;
        vm.reserveTime = 0;
        vm.submitReservation = function(){
            $uibModalInstance.close({parking_lot_id:vm.lot.id, spot_res_end:vm.reserveTime});
        };

        vm.closeModal = function(){
            $uibModalInstance.dismiss('cancel');
        };

    };
})();
;(function(){
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
