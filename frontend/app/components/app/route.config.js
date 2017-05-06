(function () {
    'use strict';

    angular
        .module('magwebapp')
        .config(function ($routeProvider) {
            $routeProvider
                .when('/data', {
                    templateUrl: 'data-access-check/data-access-check.html'
                })
                .when('/camera', {
                    templateUrl: 'camera-access-check/camera-access-check.html'
                })
                .otherwise('/data');
        });
})();