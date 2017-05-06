(function() {
    'use strict';

    angular
        .module('magwebapp')
        .directive('navbar', navbar);

    navbar.$inject = [];
    function navbar() {
        return {
            restrict: 'E',
            controller: Controller,
            controllerAs: 'vm',
            bindToController: {
                sectionName: '@',
                leftIcon: '@',
                rightIcon: '@'
            },
            templateUrl: 'navbar/navbar.html'
        };
    }

    Controller.$inject = ['$translate'];
    function Controller($translate) {
        var vm = this;
        vm.toggleLanguage = toggleLanguage;

        function toggleLanguage() {
            if($translate.use() === 'pl') {
                $translate.use('en');
            } else {
                $translate.use('pl');
            }
        }
    }
})();