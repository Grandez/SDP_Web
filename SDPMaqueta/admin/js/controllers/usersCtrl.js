function moduleCtrl ($rootScope, $scope, $http, $state) {
    $scope.global = $rootScope;

    if ($scope.loaded == undefined) initUsersCtrl();
    console.log("Entra en el controlador " + $scope.nombre);

    function initUsersCtrl() {
        $scope.loaded = true;
        $scope.nombre = "usersCtrl";
        $scope.sdp = getSDP($scope);
        loadLabels(3, $http, $scope, $state);
    }
}

