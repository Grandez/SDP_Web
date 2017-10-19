(function () {


//    var sdp = angular. module("SDP", ["ngSanitize" , "ui.router", "jqwidgets" ]);
    var sdp = angular.module("SDPADM", [ "ngSanitize"
                                        ,"ngCookies"
                                        ,"ui.router"
                                        ,"ui.layout"
                                        ,"ui.bootstrap"]);

    sdp.controller("sdpAdmCtrl",       ["$scope", "$http", "$state", "$cookies", sdpAdmCtrl]);
    sdp.controller("sdpAdmRulesCtrl",  ["$scope", "$http", "$state", "$uibModal" , sdpAdmRulesCtrl]);
    sdp.controller("sdpAdmConfigCtrl", ["$scope", "$http", "$state",               sdpAdmConfigCtrl]);

    sdp.controller('sampleCtrl', ["$scope", "$uibModalInstance", "params", sampleCtrl]);

    sdp.config(function ($stateProvider, $urlRouterProvider, $sceProvider) {

            $sceProvider.enabled(false);
            $urlRouterProvider.otherwise("/home");

            $stateProvider
                .state('home', {
                    url: "admin",
                    templateUrl: "pages/admin.htm"
                })
                .state('config', {
                    url: "config",
                    templateUrl: "pages/config.htm"
//                    controller: "sdpAdmConfigCtrl"
                })
                .state('rules', {
                    url: "rules",
                    templateUrl: "pages/rules.htm"
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


    sdp.factory('modalFactory', function($uibModal) {
        return {
            open: function(size, template, params) {
                return $uibModal.open({
                    animation: true,
                    resolve: {
                        params: function() {
                            return params;
                        },
                        templateUrl: template || 'myModalContent.html',
                        controller: 'ModalResultInstanceCtrl',
                        size: size,
                    }
                });
            }
        };
    });

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

    sdp.run(['$state', function ($state) {
        $state.transitionTo('rules');
    }]);

}).call(this);
