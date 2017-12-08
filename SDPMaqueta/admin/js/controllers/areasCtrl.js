function areasCtrl ($rootScope, $scope, $http, $state, $window) {

    $scope.global = $rootScope;
    root = $scope.global;
    if ($scope.loaded == undefined) initAreasCtrl();
    console.log("Entra en el controlador " + $scope.nombre);

    root.pageType = 1;

    getRootScope($scope).pageType = 1;

    function initAreasCtrl() {
        $scope.loaded = true;
        $scope.nombre = "areasCtrl";
        $scope.sdp = getSDP($scope);
//        loadLabels(2, $http, $scope, $state);
//        sdpAjax($http, $scope, $state, 'configuration', cargaConfiguration);
    }

}
