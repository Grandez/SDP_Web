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
