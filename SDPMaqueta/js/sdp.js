(function ($scope, $rootScope, $http, $httpProvider) {

    sdpCtrl.$inject = ["$", "$rootScope", "$scope", "$http"];


    $.jstree.defaults.core.themes.name = "proton";
    $.jstree.defaults.core.themes.responsive = true;

    Highcharts.setOptions({
         credits: { enabled: false }
        ,legend:  { enabled: false }
        ,colors:  getColors(1)
        ,global:  {
            useUTC: false
         }
        ,chart: {
             borderWidth: 0
            ,shadow: false
            ,plotBorderWidth: 0
            ,plotShadow: false
            ,plotBackgroundImage: false
            ,backgroundColor: 'transparent'
            ,width:  null
            ,height: null
         }
        ,tooltip: {
             backgroundColor: '#F2F5A9'
            ,borderColor: null
            ,borderWidth: 0
          }
        ,lang: {

        }
    });
    var sdpApp = angular.module("sdp", [ "ui.layout"
                                        ,"ui.bootstrap"
                                        ,"ngSanitize"
                                       ]);


    sdpApp.config(function setupConfig( $httpProvider ) {
        $httpProvider.defaults.useXDomain = true;
        $httpProvider.defaults.headers.common["X-Requested-With"] = 'XMLHttpRequest';
        $httpProvider.interceptors.push( //httpInterceptor );
        function interceptHttp( $q) {
            return({
                request: request,
                requestError: requestError,
                response: response,
                responseError: responseError
            });
            function request( config ) {
                return( config );
            }
            function requestError( rejection ) {
                console.log("Request error");
                return( $q.reject( rejection ) );
            }
            function response( response ) {
                return( response );
            }
            function responseError( response ) {
                if(response.status == 0) {
                    window.location = "noresponse.html";
                    return;
                }
                if(response.status == 500) {
                    window.location = "serverError.html";
                    return;
                }

                console.log("response error");
                return( $q.reject( response ) );
            }
            function extractMethod( response ) {
                try {
                    return( response.config.method );
                } catch ( error ) {
                    return( "get" );
                }

            }
        });
    });

    sdpApp.factory("globalFactory"  , globalFactory);

    sdpApp.controller("sdpCtrl",     [ "$scope" , "$http" , "$compile" , "globalFactory", sdpCtrl ] );
    sdpApp.controller("resumenCtrl", [ "$scope" , "$http" , "$compile" ,  resumenCtrl ] );

    sdpApp.filter('numberFixedLen' , function () {
        return function (n, len) {
            var num = parseInt(n, 10);
            len = parseInt(len, 10);
            if (isNaN(num) || isNaN(len)) return n;
            num = ''+num;
            while (num.length < len)  num = '0'+num;
            return num;
        };
    });
    sdpApp.directive('tooltip', function(){
        return {
            restrict: 'A',
            link: function(scope, element, attrs){
                $(element).hover(function(){
                    // on mouseenter
                    $(element).tooltip('show');
                }, function(){
                    // on mouseleave
                    $(element).tooltip('hide');
                });
            }
        };
    });
}).call(this);

