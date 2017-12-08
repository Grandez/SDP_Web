function graficoArea($scope, datos, idGrafico, panel) {
    if (panel == true) {
        $scope.titulo = $scope.MSG.TIT_APP_VOL
    }

    var patron = {
        chart: {
            type: 'bubble',
            plotBorderWidth: 0,
            zoomType: 'xy'
        }
        ,title: null
        ,tooltip: {
            formatter: function () {
                return '<b>' + this.series.name + '</b><br/>' +
                    Highcharts.numberFormat(this.point.y,0,',','.') +
                    ' ' + $scope.MSG.TXT_MODULOS;
            }
        }
        ,legend: { enabled: false }
        ,xAxis: {
            labels: {
                enabled: false
            },
            gridLineWidth: 0,
            minorTickLength: 0,
            lineWidth: 0,
            tickLength: 0
        }
        ,yAxis: {
            labels: {
                enabled: false
            },
            title: null,
            startOnTick: false,
            endOnTick: false,
            gridLineWidth: 0
        }
        ,plotOptions: {
            bubble: {
                dataLabels: {
                    enabled: true
                    ,align: 'center'
                    ,verticalAlign: 'top'
                    ,y: -17
                    ,allowOverlap: true
                    ,style: {
                        color: 'black'
                        ,textShadow: 'none'
                        ,"fontWeight": 'normal'
                    }
                    ,formatter: function() {
                        return this.point.name;
                    }
                }
            }
            ,

            series: {
                cursor: 'pointer',
                point: {
                    events: {
                        click: function (e) {
                            var sc = angular.element($("#txtModulo")).scope();
                            sc.sdp.idNodo = e.point.idAppl;
                            sc.txtModulo = e.point.idAppl;
                            $.jstree.reference('#arbol').deselect_all(true);
                            $.jstree.reference('#arbol').select_node(e.point.idAppl);
                        }
                    }
                },
            }
        }
        ,series: [ ]
    };


    for (var idx = 0; idx < datos.length ; idx++) {
        var item = {};

        item.name = datos[idx].nombre;
        item.data = [];

        var punto = {};
        punto.x = datos[idx].orden;
        punto.y = datos[idx].modulos;
        punto.z = datos[idx].modulos;
        punto.name = datos[idx].nombre;
        punto.idAppl = datos[idx].id;
        punto.numAppl = datos[idx].aplicaciones;
        item.data.push(punto);
        patron.series.push(item);
    }

    var grafArea = angular.element($("#" + idGrafico));
    grafArea.highcharts(patron);

}

function graficoQuartiles($scope, quartiles, idGrafico, panel) {
    var patron = {
        chart: {
            type: 'boxplot'
            ,renderTo: 'container'
        }
        ,credits: { enabled: false }
        ,title: null
        ,legend: { enabled: false }
        ,tooltip: {
                formatter: function() {
                    var p = this.point;
                    var msg = '<b>' + this.point.category + '</b><br>';
                    msg += $scope.MSG.TXT_MAXIMO  + ': ' + p.high + ' <br>';
                    msg += $scope.MSG.TXT_TERCER  + ': ' + p.q3 + ' <br>';
                    msg += $scope.MSG.TXT_MEDIANA + ': ' + p.median + ' <br>';
                    msg += $scope.MSG.TXT_PRIMER  + ': ' + p.q1 + '<br>';
                    msg += $scope.MSG.TXT_MINIMO  + ': ' + p.low;
                    return msg;
                }
        }
        ,xAxis: {
            gridLineWidth: 0
            ,categories: []
            ,title: null
        }

        ,yAxis: {
            gridLineWidth: 0
            ,title: null
        }
        ,plotOptions: {
            boxplot: {
                // Enabling this option overrides the fillColor property
                colorByPoint: true,
                fillColor: '#F0F0E0',
                lineWidth: 2,
                medianColor: '#0C5DA5',
                medianWidth: 3,
                stemColor: '#A63400',
                stemDashStyle: 'dot',
                stemWidth: 1,
                whiskerColor: '#3D9200',
                whiskerLength: '20%',
                whiskerWidth: 3
            }
        }
        ,series: [{
//                 name: 'Observations',
            colorByPoint: true,
            data: [],
            tooltip: { headerFormat: '{point.key}<br/>' }
        }]
    };



    patron.yAxis.max = quartiles.maxElapsed * 1.1;
    patron.yAxis.min = quartiles.minElapsed * 0.9;

    var datos = quartiles.lstQuartiles;

    for (var index = 0; index < datos.length; index++) {
        var item = datos[index];
        var xy = [];
        patron.xAxis.categories.push(item.nombre);
        patron.series[0].data.push(item.quartiles);
        xy.push(index);
        xy.push(item.total);
//        patron.series[1].data.push(xy);
    }
    var grafAppl = angular.element($("#" + idGrafico));
    grafAppl.highcharts(patron);

}
