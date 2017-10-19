
function sdpCtrl($scope , $http) {
    $scope.vista = 1;
    $scope.settings = { width: '100%', height: '100%', layout: layout() };
    $scope.modSplitter = { width: '100%', height: '900', orientation: 'vertical', panels: [{ size: '10%', min: 150 }, { size: '90%', min: 250}] };
    $scope.modDataSplitter = { width: '100%', height: '100%', orientation: 'horizontal', panels: [{ size: '75%' }] };

    /*
        $.pepe = "juan";
        $('#tree').tree({
            onClick: function(node){
                alert(node.text);  // alert node text property when clicked
            }
        });
    */
}

function modCtrl($scope , $http) {
    $scope.vista = 1;
    $scope.settings = { layout: layout() };
    split = angular.element($("#modSplitter"));
    $scope.modSplitter = { width: '100%', height: '900', orientation: 'vertical', panels: [{ size: '10%', min: 150 }, { size: '90%', min: 250}] };
    $scope.modDataSplitter = { width: '100%', height: '100%', orientation: 'horizontal', panels: [{ size: '75%' }] };

    $scope.modVista = 1;
    $scope.mnuModClick = function (event, id) {
        var args = event.args;
        console.log("Clicked: " + $(args).text() + id);
        console.log("Clicked: " + $(event.target)[0].id);
        var $el = $(event.target);
        console.log("Clicked: " + $el);
        console.log("Clicked: " + $el[0].id);
    };
    // split.jqxSplitter({ theme: 'black', width: '100%', height: '100%', panels: [{ size: '20%', min: 250 }, { size: '80%'}] });

    /*
     $.pepe = "juan";
     $('#tree').tree({
     onClick: function(node){
     alert(node.text);  // alert node text property when clicked
     }
     });
     */
}

(function ($scope, $rootScope, $http, $httpProvider, $routeProvider) {

    var sdp = angular.module("sdp", ["ngSanitize" , "ngRoute", "jqwidgets" ]);

    sdp.config(function($routeProvider){
        $routeProvider
            .when('/portal', {
                templateUrl : 'partials/portal/portal.htm',
                controller  : 'sdpCtrl'
            })

            .when('/portal', {
               templateUrl : 'partials/portal/portal.htm',
               controller  : 'sdpCtrl'
            })
            .when('/area', {
               templateUrl : 'partials/area/area.htm',
               controller  : 'sdpCtrl'
            })
            .when('/appl', {
                templateUrl : 'partials/appl/appl.htm',
                controller  : 'sdpCtrl'
            })
            .when('/module', {
               templateUrl: 'partials/module/module.htm',
               controller: 'modCtrl'
            })
            .when('/module2', {
                templateUrl: 'partials/module/module2.htm',
                controller: 'sdpCtrl'
            })
            .when('/dock', {
                templateUrl: 'partials/docking.htm',
                controller: 'demoController'
            })

            .otherwise({
                redirectTo: '/'
            });
    });

//    ctrlSdp.$inject = ["$" , "$rootScope", "$scope", "$http"];
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

}).call(this);

