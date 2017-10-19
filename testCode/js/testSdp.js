(function () {


//    var sdp = angular. module("SDP", ["ngSanitize" , "ui.router", "jqwidgets" ]);
    var sdp = angular.module("SDP", ["ngSanitize", "ngCookies", "ui.layout"]);

    sdp.controller("codeCtrl",   ["$scope", "$http", codeCtrl])


    sdp.config(['$cookiesProvider', function($cookiesProvider) {
        // Set $cookies defaults
        $cookiesProvider.defaults.path = '/';
        $cookiesProvider.defaults.secure = true;
//        $cookiesProvider.defaults.expires = exp_date;
//        $cookiesProvider.defaults.domain = my_domain;
    }]);

}).call(this);
