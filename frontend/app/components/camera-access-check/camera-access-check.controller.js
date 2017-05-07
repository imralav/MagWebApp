(function () {
    'use strict';

    angular.module('magwebapp')
        .controller('CameraAccessCheckController', CameraAccessCheckController);

    CameraAccessCheckController.$inject = [];
    function CameraAccessCheckController() {
        var vm = this;
        var video = document.querySelector("#videoElement");
        var constraints = {
            audio: false,
            video: true
        };
        function handleSuccess(stream) {
            video.srcObject = stream;
        }
        function handleError(error) {
            console.log(error);
        }
        navigator.mediaDevices.getUserMedia(constraints).
        then(handleSuccess).catch(handleError);
    }
})();