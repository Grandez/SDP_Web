(function ($scope, $rootScope, $http, $httpProvider) {

    sdpAdm.$inject = ["$", "$rootScope", "$scope", "$http"];

    var sdpApp = angular.module("sdpAdmin", [ "ui.layout"
                                             ,"ui.bootstrap"
                                             ,"ngSanitize"
                                             ,"ngDialog"
    ]);

    sdpApp.factory  ("glbFactAdmin"  , sdpFactoryAdmin);
    sdpApp.config(['ngDialogProvider', function (ngDialogProvider) {
        ngDialogProvider.setDefaults({
            className: 'ngdialog-theme-default',
            plain: false,
            closeByDocument: true,
            closeByEscape: true,
            appendTo: false,
            overlay: true,
            controller: 'sdpAdm',
            className: 'ngdialog-theme-plain',
            showClose: false
        });
    }]);

    sdpApp.config(
        function setupConfig( $httpProvider ) {
            $httpProvider.interceptors.push( httpInterceptor );
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
                    return( $q.reject( rejection ) );
                }
                function response( response ) {
                    return( response );
                }
                function responseError( response ) {
                    return( $q.reject( response ) );
                }
                function extractMethod( response ) {
                    try {
                        return( response.config.method );
                    } catch ( error ) {
                        return( "get" );
                    }

                }
            }
        }
    );

    sdpApp.controller("sdpAdm", [ "$scope"
                                 ,"$http"
                                 ,"$compile"
                                 ,"glbFactAdmin"
                                 ,"ngDialog"
                                 , sdpAdm ] );

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

}).call(this);


