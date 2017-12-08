function loadConfiguration($scope, $state, data) {
    $scope.sdp = getSDP($scope);
    $scope.groups = data.groups;
    $scope.items = data.items;
    loadConfigTree($scope, $state, data.items);
    cargaCodigoConfig($scope, $state, data.items, "div#cfgConfig");
//    cargaCodigoConfig($scope, $state, data.items, "div#cfgConfig0");
//    cargaCodigoConfig($scope, $state, data.items, "div#cfgConfig1");
/*
    for (idx = 0; idx < data.groups.length; idx++) {
        var newEle = angular.element('<div class="' + data.groups[idx].idDiv +'"'> ";" +
                "<h2>Grupo " + data.groups[idx].idDiv + "</h2></div>");
        angular.element('idTabsConfig').append(newEle);
    }
    for (idx = 0; idx < data.groups.length; idx++) {
        cargaCodigoConfig($scope, $state, data.items, "div#" + data.groups[idx].idDiv);
    }
*/
//    $compile(newEle)($scope);
}

