function loadBaseLabels($http, $scope, $state) {

    sdpAjax($http, $scope, $state, 'labels/0', cargaBaseLabels);
}

function loadLabels(group, $http, $scope, $state) {

    sdp = getSDP($scope);

    sdpAjax($http, $scope, $state, 'labels/' + group , cargaMessages);
}
function cargaBaseLabels($scope, $state, datos) {
    cargaMessages($scope, $state, datos);
    root = getRootScope($scope);
    if (root.periodLabel == "pending") {
        root.periodLabel = root.MSG["PERIOD_LABELS"][root.periodId];
        labels = root.MSG["PERIOD_LABELS"];
        root.periods = [];
        for (var idx = 0; idx < labels.length; idx++) {
            var x = {};
            x.id = idx;
            x.name = labels[idx];
            root.periods.push(x);
        }
    }

}

function cargaMessages($scope, $state, datos) {
    var root = getRootScope($scope);
    // $scope.MSG = sdp.setMessages(datos);

    if (root.MSG == undefined) root.MSG = [];

    for (var idx = 0; idx < datos.length; idx++) {
        root.MSG[datos[idx++]] = (datos[idx].indexOf("$") == -1) ?
                                  datos[idx] : datos[idx].split("$");

    }
    $scope.MSG = root.MSG;

}


