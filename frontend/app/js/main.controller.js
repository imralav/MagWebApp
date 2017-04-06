(function () {
    angular
        .module('MagWebApp')
        .controller('MainController', MainController);

    MainController.$inject = [];
    function MainController() {
        var vm = this;
        vm.tests = "Siemsy";
    }
})();