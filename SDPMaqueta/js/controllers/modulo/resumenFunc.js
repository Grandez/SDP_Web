function showWindow(tipoVentana, $http, $scope, $compile) {
    var modulo = getSDP($scope).getModulo();
    var primeraVez = false;
    // Realiza la llamada y la carga si es la primera vez
    switch (tipoVentana) {
        case 1: // Copys
            if (modulo.getCopys() == null) {
                sdpAjaxEx($http, $scope, $compile, 'copys/' + modulo.getVersion(), cargaCopys);
                primeraVez = true;
            }
            break;
        case 2: // Rutinas
            if (modulo.getRutinas() == null) {
                sdpAjaxEx($http, $scope, $compile, 'routines/' + modulo.getVersion(), cargaRutinas);
                primeraVez = true;
            }
            break;
        case 3: // Sentencias
//                if (modulo.resumen === undefined) {
            sdpAjaxEx($http, $scope, $compile, 'sentences/' + modulo.getVersion(), refreshSentences);
//                }
            break;
    }

    if (primeraVez == true) return;

    // No es la primera vez
    switch (tipoVentana) {
        case 1: refreshCopys   ($scope, $compile);  break;
        case 2: refreshRutinas ($scope, $compile);  break;
    }

}

function cargaCopys($scope, $compile, datos) {
    var modulo = getSDP($scope).getModulo();
    modulo.setCopys(datos);

    refreshCopys($scope, $compile);
}

function refreshCopys($scope, $compile) {
    var modulo = getSDP($scope).getModulo();
    $scope.modulo = modulo;
    $scope.modulo.copys = modulo.getCopys();

    $scope.winCopys = $.jsPanel({
        id: getWinId('winCopys')
        ,content: getWinRutinas($scope, $scope.modulo, getMSG($scope))
        ,controls: { maximize: false }
        ,resizable: false
        ,size: {
            width: function(){ return $(window).width()/3 },
            height: 200
        }
        ,selector: '#moduloTop'
        ,title:    "Dependencias de datos (Copybooks)"
        ,position: { top: 'center', right: 'center' }
        ,theme:    'primary'
    });
}

function cargaRutinas($scope, $compile, datos) {
    var modulo = getSDP($scope).getModulo();
    modulo.setRutinas(datos);

    refreshRutinas($scope, $compile);
}

function refreshRutinas($scope, $compile) {
    var modulo = getSDP($scope).getModulo();
    var MSG    = getMSG($scope);

    $scope.modulo = modulo;
    $scope.modulo.rutinas = modulo.getRutinas();

    $scope.winRutinas = $.jsPanel({
        id: getWinId('winRutinas')
        ,content: getWinRutinas($scope, $scope.modulo, getMSG($scope))
        ,controls: {maximize: 'false' }
        ,resizable: 'disabled'
        ,size: {
            width: function(){ return $(window).width()/3 },
            height: 200
        }
        ,selector: '#moduloTop'
        ,title:    MSG.WIN_RUT_TITLE
        ,position: { top: 'center', right: 'center' }
        ,theme:    'primary'
    });
}

function cargaSentences($scope, $compile, datos) {
    var modulo = getSDP($scope).getModulo();
    modulo.setResumen(datos);
    refreshSentences($scope, $compile);
}

function refreshSentences($scope, $compile, datos) {
    var modulo = getSDP($scope).getModulo();
    var MSG    = getMSG($scope);

    resumen = modulo.getResumen();

    var grafSentences = angular.element($("#grfSentences"));

    var patPie = {
        chart: {
            type: 'pie'
           ,plotBackgroundColor: null
           ,plotBorderWidth: null
           ,plotShadow: false
           ,spacingLeft:  0
           ,spacingRight: 0
           ,spacingBottom: 0
           ,marginLeft: 0
           ,marginRight: 0
        }
        ,title: null
        ,tooltip: {
            pointFormat: '{series.name}: <b>{point.percentage:.1f}%</b>'
        },
        plotOptions: {
            pie: {
                allowPointSelect: true,
                cursor: 'pointer',
                dataLabels: {
                    enabled: false,
                    format: '<b>{point.name}</b>: {point.percentage:.1f} %',
                    style: {
                        color: (Highcharts.theme && Highcharts.theme.contrastTextColor) || 'black'
                    }
                }
            }
        },
        series: [{name: '', data: []}]
    };
    patPie.series[0].name = MSG.WIN_SRC_STMT;

    if (resumen.info.verbosIO      > 0) patPie.series[0].data.push({name: MSG.WIN_SRC_IO    , y: resumen.info.verbosIO});
    if (resumen.info.verbosData    > 0) patPie.series[0].data.push({name: MSG.WIN_SRC_DATOS , y: resumen.info.verbosData});
    if (resumen.info.verbosControl > 0) patPie.series[0].data.push({name: MSG.WIN_SRC_FLUJO , y: resumen.info.verbosControl});
    if (resumen.info.verbosFlujo   > 0) patPie.series[0].data.push({name: MSG.WIN_SRC_CTRL  , y: resumen.info.verbosFlujo});
    if (resumen.info.verbosArit    > 0) patPie.series[0].data.push({name: MSG.WIN_SRC_ARIT  , y: resumen.info.verbosArit});
    if (resumen.info.verbosLang    > 0) patPie.series[0].data.push({name: MSG.WIN_SRC_OTH          , y: resumen.info.verbosLang});
    grafSentences.highcharts(patPie);

    $scope.winResumen = $.jsPanel({
        id: getWinId('winSentencias')
        ,content: getWinSentences($scope, $scope.modulo, getMSG($scope))
        ,controls: {maximize: 'disable' }
        ,resizable: "disabled"
        ,addClass: {
            header: "panel-heading"
        }
        ,size: {
            width: function(){ return $(window).width()/3 },
            height: 200
        }
        ,selector: '#moduloTop'
        ,title:    "Sentencias"
        ,position: { top: 'center', right: 'center' }
        ,theme:    'primary'
    });
}
