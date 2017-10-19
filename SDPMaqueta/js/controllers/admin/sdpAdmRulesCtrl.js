function sdpAdmRulesCtrl($scope , $http, $state, $uibModal) {

    root = getRootScope($scope);

    $scope.nombre = "sdpAdmRulesCtrl";
    if (getSDPAdmin($scope).getRules() == null) initController();


    $scope.close = function () {
        $scope.modalWindow = 0;
    }

    $scope.editRuleDescription = function(desc) {
        $scope.modalWindow = 1;
        $scope.modalType = 1;


        var MD = {title: getMSG($scope).MSG.RUL_DESCRIPTION
                  ,raw: "# Esto va en md\n##Otro titulo"
                 };
        $scope.MD = MD;

    }

    $scope.editRule = function(id) {
        $scope.modalWindow = 1;
        $scope.modalType = 2;
    }

    function initController() {

        var msg = getMSG($scope);
        var cdg = JAVACODES;

        $scope.MSG = msg;
        $scope.CODES = cdg;
        $scope.ruleLeaf = false;
        $scope.modalWindow = 0;
        sdpAdminAjax($http, $scope, $state, "rules", cargaRules);

        var c = new Array(15);
        c[cdg.RULE_CMP_EXIST] = msg.RUL_CMP_EXIST;
        c[cdg.RULE_CMP_EQ] = msg.RUL_CMP_EQ;
        c[cdg.RULE_CMP_GT] = msg.RUL_CMP_GT;
        c[cdg.RULE_CMP_GE] = msg.RUL_CMP_GE;
        c[cdg.RULE_CMP_LT] = msg.RUL_CMP_LT;
        c[cdg.RULE_CMP_LE] = msg.RUL_CMP_LE;
        c[cdg.RULE_CMP_BEG] = msg.RUL_CMP_BEG;
        c[cdg.RULE_CMP_END] = msg.RUL_CMP_END;
        c[cdg.RULE_CMP_HAS] = msg.RULE_CMP_HAS;
        c[cdg.RULE_CMP_MATCH] = msg.RULE_CMP_MATCH;
        $scope.comparators = c;
    }
}

