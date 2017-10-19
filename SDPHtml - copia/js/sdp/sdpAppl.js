getfunction refreshArea($scope, datos) {

    var sdp  = getSDP($scope);
    var area = sdp.getArea();

    area.setData(datos);

    $scope.stats = datos.stats;

    if (area.exist == false) {
        $scope.vista = $scope.vista * -1;
        return;
    }
    graficoArea($scope, datos.hijos, 'grfArea', false);
}

function refreshAlerts($scope, alertas) {
    $scope.sdp.setAlertas(alertas);
    $scope.alertas = alertas;
}

function refreshAppl($scope, datos) {
    var sdp  = getSDP($scope);
    var appl = sdp.getAppl();

    appl.setData(datos);

    // Area se utiliza para areas y aplicaciones
    $scope.area = sdp.getAppl();
    $scope.stats = datos.stats;
}

function refreshQuartiles($scope, quartiles) {
    var sdp = getSDP($scope);
    sdp.setQuartiles(quartiles);

    $scope.grfApplData = (quartiles.lstQuartiles.length == 0) ? 0 : 1;
    graficoQuartiles($scope, quartiles, "grfAppl", false);
}
function refreshEjecuciones($scope, ejecuciones) {
    var patBarra =  {
        chart: {
            type: 'bar'
        }
        ,credits: { enabled: false }
        ,title: null
        ,xAxis: {
            gridLineWidth: 0
            ,categories: []
            ,title: {text: null }
        },
        yAxis: {
            gridLineWidth: 0
            ,min: 0
            ,title: null
            ,labels: {
                overflow: 'justify'
            }
        },
        tooltip: {
            formatter: function () { return '<b>' + this.x + '</b>: ' + this.y + ' ejecuciones'; }
        },
        plotOptions: {
            bar: {
                colorByPoint: true
                ,dataLabels: {enabled: false }
            }
            ,series: {
                pointPadding: 0,
                groupPadding: 0
            }
        }
        ,legend: { enabled: false }
        ,series: []
    };

    var patPie =  {
        chart: {
            plotBackgroundColor: null,
            plotBorderWidth: null,
            plotShadow: false,
            type: 'pie'
        }
        ,credits: { enabled: false }
        ,title: null
        ,tooltip: {
            pointFormat: '<b>{point.percentage:.1f}%</b>'
        },
        plotOptions: {
            pie: {
                allowPointSelect: true,
                cursor: 'pointer',
                dataLabels: { enabled: true  },
                showInLegend: true
            }
        }
        ,legend: { enabled: false }
        ,series: []
    };

    var eje = ejecuciones;
    eje.sort(function(a, b) {return b.veces - a.veces});
    var totales =[];
    var elapsed = {name: "Tiempo (microSeg.)", coloByPoint: true, data: []};
    for (var index = 0; index < eje.length; index++) {
        patBarra.xAxis.categories.push(eje[index].modulo);
        totales.push(eje[index].veces);
        elapsed.data.push({name:eje[index].modulo, y: eje[index].elapsed});
    }
    patBarra.series.push({data: totales});
    patPie.series.push(elapsed);
    var graf1 = angular.element($("#grfEjecuciones"));
    graf1.highcharts(patBarra);
    var graf2 = angular.element($("#grfElapsed"));
    graf2.highcharts(patPie);

}
function refreshLog($scope, data) {
    var sdp = getSDP($scope);
    sdp.setLog(sdp.getActivo(), data);
    $scope.logData = data;
}


