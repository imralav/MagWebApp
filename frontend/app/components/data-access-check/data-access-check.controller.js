(function() {
    'use strict';

    angular
        .module('magwebapp')
        .controller('DataAccessCheckController', DataAccessCheckController);

    DataAccessCheckController.$inject = ['$uibModal'];
    function DataAccessCheckController($uibModal) {
        var vm = this;
        vm.openPhotoCheckModal = openPhotoCheckModal;

        function openPhotoCheckModal() {
            $uibModal.open({
                controller: 'PhotoCheckModalController',
                controllerAs: 'vm',
                size: 'md',
                templateUrl: 'data-access-check/photo-check-modal/photo-check-modal.html'
            });
        }
    }
})();