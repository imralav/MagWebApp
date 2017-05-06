(function() {
    'use strict';

    angular
        .module('magwebapp')
        .controller('DataAccessCheckController', DataAccessCheckController);

    DataAccessCheckController.$inject = ['$scope'];
    function DataAccessCheckController($scope) {
        var vm = this;
        vm.test = "siema";
        $scope.test2 = 'siems2';
    }
})();