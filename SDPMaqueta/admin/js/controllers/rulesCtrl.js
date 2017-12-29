function rulesCtrl ($rootScope, $scope, $http, $state) {

    $scope.global = $rootScope;
    root = $scope.global;
    if ($scope.loaded == undefined) initRulesCtrl();
    console.log("Entra en el controlador " + $scope.nombre);

    root.pageType = 2;

    if ($scope.loaded == undefined) {
        initRulesCtrl();
    }


    getRootScope($scope).pageType = 2;

    function initRulesCtrl() {
        $scope.loaded = true;
        $scope.nombre = "rulesCtrl";
        $scope.sdpadm = getSDPAdmin($scope);
        loadAdminLabels($http, $scope, $state, 200);
        sdpAjaxAdmin($http, $scope, $state, 'rulesTree', cargaRules);
    }

}

