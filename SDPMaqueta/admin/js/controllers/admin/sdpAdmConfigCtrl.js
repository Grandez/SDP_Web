function sdpAdmConfigCtrl($scope , $http, $state, $modal) {

    root = getRootScope($scope);

    $scope.nombre = "sdpAdmConfigCtrl";

//    $scope.theme = "shinyblack";
//    $rootScope.theme = "shinyblack";
/*
    if (root.sdpadm === undefined || root.sdpadm === null) {
        root.sdpadm = new SDPADM();
//        sdpAjax($http, $scope, $state, 'msg', cargaMessages);
    }

*/
    sdpAdmAjax($http, $scope, $state, 'configuration', loadConfiguration);

    $scope.configDetail = function(index){

        var modalInstance = $modal.open({
            templateUrl: 'pages/modal/modConfig.html',
            controller: modConfigCtrl,
            resolve: {
                item: function () {
                    return index;
                },
                selected: function() {
                    return $scope.selected;
                }
            }
        });

        modalInstance.result.then(function (selectedItem) {
            $scope.selected = selectedItem;
        }, function () {
            $log.info('Modal dismissed at: ' + new Date());
        });
    }

}

