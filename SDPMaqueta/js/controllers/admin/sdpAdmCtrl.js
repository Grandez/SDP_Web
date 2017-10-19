function sdpAdmCtrl($scope , $http, $state, $cookies) {

    root = getRootScope($scope);

    $scope.nombre = "sdpAdmCtrl";

    if (root.sdpadm === undefined || root.sdpadm === null) {
        root.sdpadm = new SDPADM();
        sdpAdminAjax($http, $scope, $state, 'msg', cargaMessages);
//        cargaMessages(getTestData('msg'));
//        sdpAjax($http, $scope, $state, 'msg', cargaMessages);
    }

    if ($scope.config == undefined) {
//        sdpAdmAjax($http, $scope, $state, 'configuration', loadConfiguration);
    }

    if ($cookies.get("lang") == undefined) {
        console.log(navigator.language);
        $cookies.put("lang", navigator.language);
    }

}
