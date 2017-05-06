(function() {
    'use strict';

    angular
        .module('magwebapp')
        .controller('DataAccessCheckController', DataAccessCheckController);

    DataAccessCheckController.$inject = ['Upload', '$timeout'];
    function DataAccessCheckController(Upload, $timeout) {
        var vm = this;
    }
})();