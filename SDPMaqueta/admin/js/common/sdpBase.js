/*
 * Devuelve el objeto SDP que esta en rootScope
 */
function getSDP($scope) {
    return getRootScope($scope).sdp;
}

function getSDPAdmin($scope) {
    return getRootScope($scope).sdpadm;
}

function getRootScope($scope) {
    var scope = $scope;
    while (scope.$parent != null) scope = scope.$parent;
    return scope;
}

function getMSG($scope) {
    curr = $scope;
    while (curr.MSG == undefined) curr = curr.$parent;
    return curr.MSG;
}

/*
function loadMessages($scope) {
    var sdp = getSDP($scope);
    var msg = sdp.getMessages();
    for (var idx = 0; idx < msg.length; idx++) {
        $scope.MSG[msg[idx++]] = msg[idx];
    }
}
*/
function initHighcharts() {

    Highcharts.setOptions({
        credits: {enabled: false}
        , legend: {enabled: false}
 //       , colors: getColors(1)
        , global: {
            useUTC: false
        }
        , chart: {
            borderWidth: 0
            , shadow: false
            , plotBorderWidth: 0
            , plotShadow: false
            , plotBackgroundImage: false
            , backgroundColor: 'transparent'
            , width: null
            , height: null
        }
        , tooltip: {
            backgroundColor: '#F2F5A9'
            , borderColor: null
            , borderWidth: 0
        }
        , lang: {}
    });
}
/*
function cargaArea = function() {
    $scope.vista = 1;

    sdp.setActivo($scope.vista);
    sdp.setArea(sdp.idNodo);
    sc.txtModulo  = sdp.idArea;

    var clave = sdp.idNodo + "/" + sdp.rango;

    sdpAjax($http, $scope, 'alertas/' + clave , refreshAlerts);
    sdpAjax($http, $scope, 'area/'    + clave , refreshArea);
    sdpAjax($http, $scope, 'log/'     + clave , refreshLog);
};

$scope.cargaAplicacion = function() {
    $scope.vista = 2;

    sdp.setActivo($scope.vista);
    sdp.setAppl(sdp.idNodo);

    var clave = sdp.idNodo + "/" + sdp.rango;

    sdpAjax($http, $scope, 'alertas/' + clave , refreshAlerts);
    sdpAjax($http, $scope, 'appl/' + clave , refreshAppl);
    sdpAjax($http, $scope, 'box/'  + clave , refreshQuartiles);
    sdpAjax($http, $scope, 'log/'  + clave , refreshLog);
    sdpAjax($http, $scope, 'exe/'  + clave , refreshEjecuciones);
};

function activaModulo ($scope, id) {
    var sdp = getSDP($scope);
    var module = sdp.getModule();

    if (module == null || module.getId() != sdp.idModule) {
        cargaModulo($scope, id);
    }
    sdp.run(['$state', function ($state) { $state.transitionTo('area'); }]);
    sdp.setState("module");
}


*/
