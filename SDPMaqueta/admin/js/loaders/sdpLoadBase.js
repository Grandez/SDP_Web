function loadAdminLabels($http, $scope, $state, group) {
    sdpAjaxAdmin($http, $scope, $state, 'labels/' + group, cargaMessages);
}



