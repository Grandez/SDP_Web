function rulesCtrl ($rootScope, $scope, $http, $state) {

    $scope.global = $rootScope;
    root = $scope.global;
    if ($scope.loaded == undefined) initRulesCtrl();
    console.log("Entra en el controlador " + $scope.nombre);

    if ($scope.loaded == undefined) initRulesCtrl();

    function ruleDetail(index) {
        $scope.rule = $scope.rules.rules[index];
    }

    function initRulesCtrl() {
        $scope.loaded = true;
        $scope.nombre = "rulesCtrl";
        $scope.sdpadm = getSDPAdmin($scope);
        loadAdminLabels($http, $scope, $state, 200);
        sdpAjaxAdmin($http, $scope, $state, 'rulesTree', cargaRules);
    }

    function merge() {
        var txt;
        while(index < arguments.length) {
            if(typeof arguments[index] !== 'undefined') {
                txt = txt + " " + arguments[index];
            }
            index++;
        }
        return txt.trim();
    }

    $scope.ruleDetail = ruleDetail;
    $scope.merge = merge;
}

