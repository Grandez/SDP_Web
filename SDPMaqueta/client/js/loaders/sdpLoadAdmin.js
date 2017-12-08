function loadConfiguration($scope, $state, data) {
    sdpadm = getSDPADM($scope);
    sdpadm.setConfiguration(data);
    $scope.config = sdpadm.config;
}

