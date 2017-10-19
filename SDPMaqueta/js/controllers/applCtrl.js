function applCtrl ($rootScope, $scope, $http, $state) {

    $scope.global = $rootScope;
    if ($scope.loaded == undefined) initApplCtrl();
    console.log("Entra en el controlador " + $scope.nombre);

    global.pageType = 2;

    if ($scope.loaded == undefined) {
        // initAreaController();
    }


    getRootScope($scope).pageType = 2;

    function initApplCtrl() {
        $scope.loaded = true;
        $scope.nombre = "applCtrl";
        $scope.sdp = getSDP($scope);
        loadLabels(2, $http, $scope, $state);
    }

}

