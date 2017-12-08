function sampleCtrl($scope, $uibModalInstance, params) {
    console.log("entra en el controlador");
    $scope.searchTerm = params.searchTerm;

    $scope.ok = function() {
        $uibModalInstance.close($scope.searchTerm);
    };

    $scope.cancel = function() {
        $uibModalInstance.dismiss('cancel');
    };
}