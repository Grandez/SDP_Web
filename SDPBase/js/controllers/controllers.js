// function sdpCtrl ($scope, $http, $state, $stateParams) {

function sdpFechas ( $scope, $http) {

    $scope.rango = $scope.$parent.$parent.rango;
//    $scope.$parent.$parent.rango = 5;
    $scope.procesar = function() {
        $scope.vista = 1;
        $scope.$parent.$parent.rango = $scope.rango;
        $scope.$parent.$parent.winFecha.close();
//        $scope.$parent.$parent.rango = rango;
    }
    $scope.procesar2 = function() {
        $scope.vista = 1;

    }

}

