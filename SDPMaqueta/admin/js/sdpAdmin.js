(function () {


    initHighcharts();

//    var sdp = angular. module("SDP", ["ngSanitize" , "ui.router", "jqwidgets" ]);
    var sdpadm = angular.module("SDPADM", ["ngSanitize", "ngCookies", "ui.router", "ui.layout"
                               ,"ui.bootstrap.tabs"
    ]);

    sdpadm.controller("admCtrl",    ["$rootScope", "$scope", "$http", "$state", "$cookies", admCtrl]);
    sdpadm.controller("areasCtrl",  ["$rootScope", "$scope", "$http", "$state", "$cookies", areasCtrl]);
    sdpadm.controller("configCtrl", ["$rootScope", "$scope", "$http", "$state", "$window",  configCtrl]);
    sdpadm.controller("rulesCtrl",  ["$rootScope", "$scope", "$http", "$state", rulesCtrl]);

    sdpadm.config(function ($stateProvider, $urlRouterProvider, $sceProvider) {

            $sceProvider.enabled(false);
//            $urlRouterProvider.otherwise("/areas");

            $stateProvider
                .state('areas', {
//                    url: "/areas"
                      templateUrl: "partials/areas.htm"
                    , controller: "areasCtrl"
                })
                .state('config', {
//                    url: "/config"
                      templateUrl: "partials/config.htm"
                    , controller: "configCtrl"
                })
                .state('rules', {
//                    url: "/rules"
                      templateUrl: "partials/rules.htm"
                    , controller: "rulesCtrl"
                })
                .state('users', {
//                    url: "/users"
                      templateUrl: "partials/users.htm"
                    , controller: "usersCtrl"
                })
        }
    );

    sdpadm.config(['$cookiesProvider', function($cookiesProvider) {
        // Set $cookies defaults
        $cookiesProvider.defaults.path = '/';
        $cookiesProvider.defaults.secure = true;
//        $cookiesProvider.defaults.expires = exp_date;
//        $cookiesProvider.defaults.domain = my_domain;
    }]);

//    $.jqx.theme = "shinyblack";
//    sdpadm.run(['$state', function ($state) {
//        $state.transitionTo('area');
//    }]);

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
