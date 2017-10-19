function areaCtrl ($rootScope, $scope, $http, $state) {

    $scope.global = $rootScope;
    root = $scope.global;

    if ($scope.loaded == undefined) initAreaCtrl();
    console.log("Entra en el controlador " + $scope.nombre);

    root.pageType = 1;

    var sdp = getSDP($scope);

    // Check if Area has changed
    if (sdp.needLoad()) {
        loader($scope, $http, $state, sdp);
    }

/*
    $scope.buscaArbol = function() {
        console.log($scope.mascara);
        var arbol = angular.element($("#arbol"));
        arbol.jstree('search', $scope.mascara);
    };
*/
    function initAreaCtrl() {
        $scope.loaded = true;
        $scope.nombre = "areaCtrl";
        $scope.sdp = getSDP($scope);
        loadLabels(1, $http, $scope, $state);
    }
}


