function modConfigCtrl ($scope, $modalInstance, item) {
/*
    $scope.items = items;
    $scope.selected = {
        item: selected || items[0]
    };
    $scope.addressList = dataService.getAddressType();
    $scope.addressmodelType = '2';
*/
    $scope.ok = function () {
        $modalInstance.close($scope.selected.item);
    };

    $scope.cancel = function () {
        $modalInstance.dismiss('cancel');
    };
};
