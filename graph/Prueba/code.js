(function () {

    var sdp = angular.module("SDPTST", ["ngSanitize", "ngCookies", "ui.router", "ui.layout"]);

    sdp.controller("tstCtrl",    ["$rootScope", "$scope", "$http", "$state", tstCtrl]);
    sdp.controller("arbolCtrl",    ["$rootScope", "$scope", "$http", "$state", arbolCtrl]);

}).call(this);
function tstCtrl ($rootScope, $scope, $http, $state) {

    $scope.global = $rootScope;
    $scope.page = "grafo"
    root = $scope.global;
    if ($scope.loaded == undefined) {
        sdpAjax($http, $scope,  "grafos", cargaArbol);
        initGraphCanvas($scope, "grafo");
    }

}

function arbolCtrl ($rootScope, $scope, $http, $state) {

    $scope.global = $rootScope;
    $scope.page = "arbol"
    root = $scope.global;
    if ($scope.loaded == undefined) {
        sdpAjax($http, $scope,  "grafos", cargaArbol);
        initGraphCanvas($scope, "calltree");
    }

}

function sdpAjax($http , $scope, sdpUrl , sdpVar) {
    console.log("BEG Ajax : " + new Date() + " - " + sdpUrl);

    $scope.http = $http;

    var data = null;
    var fullUrl = "http://localhost:8080/SDPWebClient/" + sdpUrl;

    $http({
        method: 'get',
        url: fullUrl
    }).then(function (response) {
        sdpVar($scope, response.data);
    }, function (error) {
        console.log(error, error.data);
    });

    console.log("END: " + new Date() + " - " + sdpUrl);
}

function cargaArbol($scope, datos) {
    var arbol = "#arbol";
    var oldState = -1;

    var arbol = angular.element($(arbol));

    var raiz;

    arbol.jstree({
        'plugins': ["ui", "types"]
        ,core: {
            'data': datos
            ,themes: {
                "name": "default"
                ,'url': '../lib/jstree/themes/default/style.css'
            }

        }

        , 'ui': {'select_limit': 1}
//        ,"types": tipos
    })
    .on('select_node.jstree', function(event, selected) {
        if ($scope.page == "grafo") {
            sdpAjax($scope.http, $scope, "graph/" + selected.node.id, cargaGrafo);
        }
        if ($scope.page == "arbol") {
            sdpAjax($scope.http, $scope, "call/" + selected.node.id, cargaCall);
        }

    })

    arbol.jstree(true).refresh();

}


