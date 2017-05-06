(function () {
    'use strict';

    angular
        .module('magwebapp')
        .config(function ($translateProvider) {
            $translateProvider.useStaticFilesLoader({
                prefix: 'l18n/strings-',
                suffix: '.json'
            });
            $translateProvider.preferredLanguage('pl');
            $translateProvider.useSanitizeValueStrategy('escape');
        });
})();