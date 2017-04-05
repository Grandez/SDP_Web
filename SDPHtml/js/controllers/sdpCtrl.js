function sdpCtrl ( $scope, $http, $compile, global) {

    var sdp = global;
    var sc  = angular.element($("#txtModulo")).scope();
    var scope = $scope;

    $scope.nombre = "SDP";
    $scope.pagina = 1;
    $scope.sdp = $scope.sdp || global;
    $scope.MSG = {};

    $scope.colors = true;
    $scope.colors1 = getColors(1);
    $scope.colors2 = getColors(2);

    $scope.showArbol = 1;

    sdpAjax($http, $scope, 'messages', cargaMensajes);

    // Recuperar datos de la factoria

    sdp.rango = 4; // Trimestre

    $scope.txtModulo = sdp.idNodo;
    $scope.rango     = sdp.rango;
    $scope.mainErr   = 2; // Datos de la semana

    sdpAjax($http, $scope, 'apptree', cargaArbol);

    $scope.cargaArea = function() {
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
    $scope.cargaModulo = function() {
        $scope.vista     = 3;

        sdp.setActivo($scope.vista);
        var modulo = sdp.setModulo(sdp.idNodo);
        modulo.loading = true;

        clave = sdp.idNodo + "/" + sdp.rango;

        sdpAjax($http, $scope, 'module/'    + clave,      refreshModulo);
        sdpAjax($http, $scope, 'issues/'    + sdp.idNodo, refreshIssues);
        sdpAjax($http, $scope, 'stats/'     + clave,      refreshStats);
        sdpAjax($http, $scope, 'deps/'      + sdp.idNodo, refreshDeps);
        sdpAjax($http, $scope, 'paragraph/' + sdp.idNodo, refreshUsoParrafos);

        $scope.cambiaPieModulo(2);
    };
    $scope.codeStyle = function (codigo) {
        var estilo = "codigo";
        switch(codigo.tipo) {
            case 1:  estilo += ", comment "; break;
            case 2:  estilo += ", parrafo "; break;
            default: estilo += ", normal ";
        }
        if (codigo.usado == 1) {
            if (codigo.tipo == 3) estilo += ", usado";
        }

        if (codigo.malo == true) {
            estilo += ", malo";
        }

        for (var idx = 0; idx < codigo.issues.length ; idx++) {

            switch (codigo.issues[idx]) {
                case 1001: estilo += ", unused"  ; break;
                case 1004: estilo += ", escrito" ; break;
            }
        }

        return estilo;
    };
    $scope.cambiaPieModulo = function(pie) {
        var modulo = sdp.getModulo();
        var clave = sdp.idNodo + "/" + sdp.rango;
        switch (pie) {
            case 1: if (modulo.codigo == null) {
                        sdpAjax($http, $scope, 'code/' + modulo.id , refreshCodigo);
                    }
                    break;
            case 2: if (modulo.sesiones.length == 0) {
                        sdpAjax($http, $scope, 'sesion/'    + clave, refreshSesiones);
                    }
                    break;
            case 3: if (modulo.arbol == null) {
                        sdpAjax($http, $scope, 'tree/'    + modulo.getVersion(), refreshArbolModulo);
                    }
                    break;
        }
        $scope.modFooter = pie;
    };
    $scope.cambiaRango = function(rango) {
        $scope.sdp.oldRango = $scope.sdp.rango;
        $scope.sdp.rango = rango;
        $scope.rango = rango;

        switch (Math.abs($scope.vista)) {
            case 1: $scope.cargaArea();       break;
            case 2: $scope.cargaAplicacion(); break;
            case 3: $scope.cargaModulo();     break;
        }
    };

    $scope.buscaArbol = function() {
        console.log($scope.mascara);
        var arbol = angular.element($("#arbol"));
        arbol.jstree('search', $scope.mascara);
    };
    $scope.showArbolModulo = function() {
        console.log("Entra en el arbol");
        $scope.modFooter = 3;
        var modulo = getSDP($scope).getModulo();
        if (modulo.getArbol() == null) {
            sdpAjax($http, $scope, 'tree/' + modulo.getVersion(), refreshArbolModulo);
        }
    }
    /* Filtro de log exclusivo */
    $scope.filtroLogEx = function(tipo, valor) {
        var sdp = getSDP($scope);

        for (var idx = 0; idx < 4; idx++) sdp.filterLog[idx] = null;

        switch(tipo) {
            case 0: sdp.filterLog[tipo] = valor; break;
        }
        var clave = 'log/' + sdp.idNodo + "/" + sdp.rango
        sdpAjaxLog($http, $scope, clave);
    }

    /* Filtro de log no exclusvio */
    $scope.filtroLog = function(tipo, valor) {
        var sdp = getSDP($scope);

        sdp.filterLog[tipo] = (sdp.filterLog[tipo] == null) ? valor : null;
        var clave = 'log/' + sdp.idNodo + "/" + sdp.rango
        sdpAjaxLog($http, $scope, clave);
    }

    $scope.reordenaSesiones = function() {
        recargaSesiones($scope);
    };

    $scope.panelGrafico = function(tipo, idGraph) {
        var grf  = "idPanelGrafico";
        if (idGraph == null) {
            $scope.vista = $scope.vista - 10;
            return;
        }

        var sdp  = getSDP($scope);

        switch (tipo) {
            // Grafico de burbujas
            case 1: graficoArea($scope, sdp.getArea().getHijos(), grf, true);
                    break;
            // Grafico de quartiles
            case 2: graficoQuartiles($scope, sdp.getAppl().getQuartiles(), grf, true);
                    break;
            // Graficos de modulos
            case 11: graficoParrafos($scope, sdp.getModulo().getParrafos(), grf, true);
                     break;
            case 12: graficoUsoParrafos($scope, sdp.getModulo().getUsoParrafos(), grf, true);
                     break;
            case 13: graficoConsumoParrafos($scope, sdp.getModulo().getUsoParrafos(), grf, true);
                     break;

        }

        $scope.vista = $scope.vista + 10;
    }

    $scope.toggleArbol = function() {
        $scope.showArbol = $scope.showArbol * -1;
        if ( $scope.showArbol == -1) {
            $.jstree.reference('#arbol1').select_node(sdp.idNodo, true);
        }
        else {
            $scope.eliminaSesion("", true);
        }
    }
    $scope.insertaSesion = function (id, nombre) {
        sdp.sesNames.push(nombre);
        var clave = id + "/" + sdp.rango;
        sdpAjax($http, $scope, 'sesion/'    + clave, addSesion);
    }
    $scope.eliminaSesion = function (nombre, todos) {
        if (todos == true) {
            removeSesion($scope, -1);
        }
        else {
            var idx = 0;
            while (idx < sdp.sesNames.length && sdp.sesNames[idx] != nombre) {
                idx++;
            }
            if (idx > 0 && idx < sdp.sesNames.length) {
                removeSesion($scope, idx);
            }
        }
    }

    $scope.ventana = function (tipoVentana) {
        showWindow(tipoVentana, $http, $scope, $compile);
        vista = (tipoVentana == 2) ? 3 : 1;
        $scope.cambiaPieModulo(vista);
    }

}

