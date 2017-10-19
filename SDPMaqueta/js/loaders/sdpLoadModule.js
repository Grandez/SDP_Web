function refreshModule($scope, $state, data) {
    $scope.node.base     = data.base;
    $scope.node.summary  = data.summary;
    $scope.node.attrs    = data.attrs;
    $scope.node.comments = data.comments;
    $scope.node.verbs    = data.verbs;
    $scope.node.sqale    = data.sqale;
}

function refreshSource($scope, $state, data) {
    $scope.node.source   = data;
    $scope.node.nada = true;
    cargaCodigo($scope, $state, data);
}

function refreshParagraphs($scope, $state, data) {
    $scope.node.parrs   = data;
    grfParrsLines($scope, true)
    grfParrsCC($scope, true)
}

function refreshStatus($scope, $state, data) {
    $scope.node.issues = data.issues;
    for (idx = 0; idx < 7;idx++) {
        $scope.node.issues[idx].label = $scope.MSG.issuesLabel[idx];
    }
    $scope.node.coverage = data.coverage;
    $scope.node.status = data.status;
    graficoCoverage($scope, data.coverage, "grfCoverage");
}

/*
function refreshModSummary($scope, $state, datos) {
//    $scope.node = getSDP($scope).getModule();
    $scope.node.summary = datos;
    $scope.node.status = 1;
}

function refreshSQALE($scope, $state, datos) {
//    $scope.node = getSDP($scope).getModule();
    $scope.node.sqale = datos;
}
function refreshAttributes($scope, $state, datos) {
//    $scope.node = getSDP($scope).getModule();
    $scope.node.attr = datos;
}
*/