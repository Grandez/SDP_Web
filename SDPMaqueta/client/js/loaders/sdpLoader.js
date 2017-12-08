function loader ($scope, $http, $state, sdp) {

    switch (Math.floor(sdp.getRequestedType() / 10)) {
        case 0: $scope.node = cargaArea  (sdp, sdp.getRequestedId()); break;
        case 1: $scope.node = cargaArea  (sdp, sdp.getRequestedId()); break;
        case 2: $scope.node = cargaAppl  (sdp, sdp.getRequestedId()); break;
        case 4: $scope.node = cargaModulo(sdp, sdp.getRequestedId()); break;
    }

    function cargaArea(sdp, id) {
        var node = sdp.addArea(id);
//        cargaAreaAppl(sdp, id);
        return node;
    }

    function cargaAppl(sdp, id) {
        var node = sdp.addAppl(id);
//        cargaAreaAppl(sdp, id);
        return node;
    }

    function cargaAreaAppl(sdp, id) {
        sdpAjax($http, $scope, 'alertas/' + id , refreshAlerts);
/*
        sdpAjax($http, $scope, 'appl/' + clave , refreshAppl);
        sdpAjax($http, $scope, 'box/'  + clave , refreshQuartiles);
        sdpAjax($http, $scope, 'log/'  + clave , refreshLog);
        sdpAjax($http, $scope, 'exe/'  + clave , refreshEjecuciones);
*/
    }

    function cargaModulo(sdp, id) {
        $scope.node = sdp.addModule(id);
        $scope.node.footer="source";

        sdpAjax($http, $scope, $state, 'module/'     + id, refreshModule);
        sdpAjax($http, $scope, $state, 'paragraphs/' + id, refreshParagraphs);
        sdpAjax($http, $scope, $state, 'status/'     + id, refreshStatus);
        sdpAjax($http, $scope, $state, 'source/'     + id, refreshSource);

        /*
        sdpAjax($http, $scope, $state, 'summary/' + clave , refreshModSummary);
        sdpAjax($http, $scope, $state, 'sqale/'   + clave , refreshSQALE);
        sdpAjax($http, $scope, $state, 'attr/'    + clave , refreshAttributes);

        sdpAjax($http, $scope, 'stats/' + clave, refreshStats);
        sdpAjax($http, $scope, 'deps/' + sdp.idNodo, refreshDeps);
        sdpAjax($http, $scope, 'paragraph/' + sdp.idNodo, refreshUsoParrafos);

        $scope.cambiaPieModulo(2);
*/
        return $scope.node;
    }
}