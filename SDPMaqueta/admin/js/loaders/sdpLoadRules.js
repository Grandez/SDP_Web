function cargaRulesDetail($scope, $state, datos) {
    var sdpadm = getSDPAdmin($scope);
   sdpadm.setRuleDetail(datos.id, datos);
   $scope.rule = datos;
}

