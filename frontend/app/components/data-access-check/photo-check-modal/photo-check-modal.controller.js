(function() {
    'use strict';

    angular.module('magwebapp')
        .controller('PhotoCheckModalController', PhotoCheckModalController);

    PhotoCheckModalController.$inject = ['$uibModalInstance'];
    function PhotoCheckModalController($uibModalInstance) {
        var vm = this;
        vm.close = close;

        function close() {
            $uibModalInstance.close();
        }
    }
})();