(function(){
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
