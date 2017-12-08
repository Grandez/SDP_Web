function codeCtrl ($rootScope, $scope, $http, $state) {
    $scope.nombre = "codeCtrl";
    console.log("Entra en el controlador " + $scope.nombre);
    $scope.global = $rootScope;
    root = $scope.global;

    if ($scope.loaded == undefined) initCodeCtrl();

    node = getSDP($scope).getModule();

//    if (node.isLoaded("code") == false)
//        cargaCodigo($scope, node);

    function initModuleCtrl() {
        $scope.loaded = true;
        $scope.nombre = "codeCtrl";
        $scope.sdp = getSDP($scope);
//        sdpAjax($http, $scope, $state, 'source/'     + id, refreshSource);
//        loadLabels(3, $http, $scope, $state);
    }

}
