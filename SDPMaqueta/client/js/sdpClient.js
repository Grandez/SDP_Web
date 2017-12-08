(function () {


    initHighcharts();

//    var sdp = angular. module("SDP", ["ngSanitize" , "ui.router", "jqwidgets" ]);
    var sdp = angular.module("SDP", ["ngSanitize", "ngCookies", "ui.router", "ui.layout"]);

    sdp.controller("sdpCtrl",    ["$rootScope", "$scope", "$http", "$state", "$cookies", sdpCtrl]);
    sdp.controller("areaCtrl",   ["$rootScope", "$scope", "$http", "$state", areaCtrl]);
    sdp.controller("applCtrl",   ["$rootScope", "$scope", "$http", "$state", applCtrl]);
    sdp.controller("moduleCtrl", ["$rootScope", "$scope", "$http", "$state", moduleCtrl])
    sdp.controller("codeCtrl",   ["$rootScope", "$scope", "$http", "$state", codeCtrl])

    sdp.controller("loginCtrl",  ["$scope", "$http", "$state", loginCtrl]);

    sdp.config(function ($stateProvider, $urlRouterProvider, $sceProvider) {

            $sceProvider.enabled(false);
            $urlRouterProvider.otherwise("/area");

            $stateProvider
                .state('login', {
                    url: "/login",
                    views: {
                        "main": {
                            templateUrl: "partials/login.htm"
                            , controller: "loginCtrl"
                        }
                    }
                })

                .state('area', {
                    url: "/area"
                    , templateUrl: "partials/area.htm"
                    , controller: "areaCtrl"
                })
                .state('appl', {
                    url: "/appl"
                    , templateUrl: "partials/appl.htm"
                    , controller: "applCtrl"
                })
                .state('module', {
                    url: "/ module"
                    , templateUrl: "partials/module.htm"
                    , controller: "moduleCtrl"
                })

        }
    );

    sdp.config(['$cookiesProvider', function($cookiesProvider) {
        // Set $cookies defaults
        $cookiesProvider.defaults.path = '/';
        $cookiesProvider.defaults.secure = true;
//        $cookiesProvider.defaults.expires = exp_date;
//        $cookiesProvider.defaults.domain = my_domain;
    }]);

    sdp.filter('numberFixedLen' , function () {
        return function (n, len) {
            var num = parseInt(n, 10);
            len = parseInt(len, 10);
            if (isNaN(num) || isNaN(len)) return n;
            num = ''+num;
            while (num.length < len)  num = '0'+num;
            return num;
        };
    });

//    $.jqx.theme = "shinyblack";
    sdp.run(['$state', function ($state) {
        $state.transitionTo('area');
    }]);

//    ctrlSdp.$inject = ["$" , "$rootScope", "$scope", "$http"];
    /*
     sdp.controller("sdpCtrl",     [ "$scope" , "$http" , sdpCtrl ] );
     sdp.controller("modCtrl",     [ "$scope" , "$http" , modCtrl ] );
     sdp.controller("demoController", function ($scope) {
     $scope.listSource = [
     'JavaScript Certification - Welcome to our network',
     'Business Challenges via Web take a part',
     'jQWidgets better web, less time. Take a tour',
     'Facebook - you have 7 new notifications',
     'Twitter - John Doe is following you. Look at his profile',
     'New videos, take a look at YouTube.com'
     ];
     });
     */
}).call(this);
