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
                leftRedirect: '@',
                rightIcon: '@',
                rightRedirect: '@'
            },
            templateUrl: 'navbar/navbar.html'
        };
    }

    Controller.$inject = ['$translate', '$location'];
    function Controller($translate, $location) {
        var vm = this;
        vm.toggleLanguage = toggleLanguage;
        vm.leftRedirectTo = leftRedirectTo;
        vm.rightRedirectTo = rightRedirectTo;

        function toggleLanguage() {
            if($translate.use() === 'pl') {
                $translate.use('en');
            } else {
                $translate.use('pl');
            }
        }

        function leftRedirectTo() {
            if(angular.isDefined(vm.leftRedirect)) {
                $location.path(vm.leftRedirect);
            }
        }

        function rightRedirectTo() {
            if(angular.isDefined(vm.rightRedirect)) {
                $location.path(vm.rightRedirect);
            }
        }
    }
})();