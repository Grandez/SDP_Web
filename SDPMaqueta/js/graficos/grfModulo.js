var colors1 =  ["#0000FF", "#55BF3B", "#FFFACD", "#ff8c00", "#7798BF",
                "#EE82EE", "#778899", "#1E90FF", "#DF5353", "#8B008B",
                "#808000", "#4B0082", "#006400", "#F0E68C", "#000080",
                "#A0522D", "#4B0082", "#8B4513", "#FF00FF", "#7B68EE",
                "#2F4F4F", "#6B8E23", "#6A5ACD", "#EE82EE", "#4682B4"];

function grfParrsLines($scope, panel) {

    var labels    = $scope.node.parrs.data.map(function (item) { return item.nombre; });
    var sentences = $scope.node.parrs.data.map(function (item) { return item.sentencias;  });
    _grfParrColumn("grfParrLines", panel, labels, sentences, $scope.node.parrs.limits.sentences)
}
function grfParrsCC($scope, panel) {

    var labels = $scope.node.parrs.data.map(function (item) { return item.nombre;  });
    var cc     = $scope.node.parrs.data.map(function (item) { return item.cc;      });
    _grfParrColumn("grfParrCC", panel, labels, cc, $scope.node.parrs.limits.cc)
}

function _grfParrColumn(idGraph, panel, labels, data, line) {

var patron =  {
        chart:  { type: 'column'
            ,spacingLeft:  0
            ,spacingRight: 0
            ,spacingBottom: 2
            ,marginLeft: 45
            ,marginRight: 45
        }
        ,title:   null
        ,xAxis:  { categories: labels }
        ,yAxis: {
            lineWidth: 1
            ,tickWidth: 1
            ,title: null
        //            ,title: {
                //text: 'Sentencias',
        //        y: 0
        //    }
            ,plotLines: [{
               value: line
              ,color: 'red'
              ,dashStyle: 'shortdash'
              ,width: 2
//            label: {
//                text: 'Last quarter minimum'
//            }
            }]
        }
        ,plotOptions: {
            series: {
                pointPadding: 0
                ,groupPadding: 0
                ,colorByPoint: true
            }
        }
        ,series: [ { // name: "nada" // $scope.MSG.TIT_SENTENCIAS
                    //,colors: sc.colors1
                    colorByPoint: true
                    ,data: data
                   }
                 ]
    };

    if (panel == true) {
//        $scope.titulo = $scope.MSG.TIT_PARRAFOS;
        patron.chart.renderTo = idGraph;
        patron.chart.spacingLeft =  50;
        patron.chart.spacingRight = 5;
        patron.chart.spacingTop = 25;
        patron.chart.spacingBottom = 25;
        patron.chart.marginLeft = 60;
        patron.chart.marginRight = 10;
    }

    /*
    for (index = 0; index < parrafos.length; index++) {
        patron.xAxis.categories.push(parrafos[index].nombre);
        if (parrafos[index].sentencias > sdp.maxStmt) {
            patron.series[0].data.push({y: parrafos[index].sentencias, color: 'red'});
        }
        else {
            patron.series[0].data.push({y: parrafos[index].sentencias});
        }
        if (parrafos[index].cc > sdp.maxCCParr) {
            patron.series[1].data.push({y: parrafos[index].cc, color: 'red'});
        }
        else {
            patron.series[1].data.push({y: parrafos[index].cc});
        }
    }
    */
    var graf = angular.element($("#" + idGraph));
    graf.highcharts(patron);
}

function graficoUsoParrafos($scope, parrafos, idGrafico, panel) {

    var patron = { title: null
        ,chart:   { type: 'bar'
            ,spacingBottom: 0
            ,spacingTop:   0
            ,spacingLeft:  45
            ,spacingRight: 0
            ,marginLeft: 45
            ,marginRight: 0
            ,width: null
            ,height: null
        }
        ,xAxis:   { categories: [], title: {text: null}  }
        ,yAxis:   { title: {text: null }}
        ,plotOptions: {
             series: { pointPadding: 0, groupPadding: 0, colorByPoint: true }
            ,bar: { dataLabels: {enabled: false}}
        }
        ,series: [ { name: 'Ejecuciones' , colorByPoint: true, colors: $scope.colors1, yAxis: 0, data: [] } ]
    };

    if (panel == true) {
        $scope.titulo = "Parrafos por numero de invocaciones"
        patron.yAxis.title.text = 'Veces';
        patron.xAxis.title.text = 'Parrafos';
        patron.plotOptions.bar.dataLabels.enabled = true;
        patron.chart.marginLeft    = 120;
        patron.chart.marginRight   = 25;
        patron.chart.spacingBottom = 25;
        patron.chart.spacingTop    = 25;
        patron.chart.spacingLeft   = 50;
        patron.chart.spacingRight  = 25;
    }

    for (idx = 0; idx < parrafos.length; idx++) {
        patron.xAxis.categories.push(parrafos[idx].nombre);
        patron.series[0].data.push(parrafos[idx].veces / parrafos[idx].sesiones);
    }
    var graf = angular.element($("#" + idGrafico));
    graf.highcharts(patron);

}

function graficoConsumoParrafos($scope, parrafos, idGrafico, panel) {

    var patron = { title: null
       ,legend:  { enabled: false }
       ,chart:   { type: 'bar'
                  ,spacingBottom: 0
                  ,spacingTop:   0
                  ,spacingLeft:  0
                  ,spacingRight: 0
                  ,marginLeft: 0
                  ,marginRight: 0
                  ,width: null
                  ,height: null
                 }
       ,xAxis:   { categories: []  }
       ,yAxis:   { title: null }
       ,plotOptions: {
                 series: { pointPadding: 0, groupPadding: 0, colorByPoint: true }
                    }
       ,series: [ { name: 'Elapsed' , colorByPoint: true, colors: $scope.colors2, yAxis: 0, data: [] } ]
     };

    if (panel == true) {
        $scope.titulo = "Parrafos por tiempo";
        patron.yAxis.title.text = 'Veces';
        patron.xAxis.title.text = 'Parrafos';
        patron.plotOptions.bar.dataLabels.enabled = true;
        patron.chart.marginLeft    = 120;
        patron.chart.marginRight   = 25;
        patron.chart.spacingBottom = 25;
        patron.chart.spacingTop    = 25;
        patron.chart.spacingLeft   = 50;
        patron.chart.spacingRight  = 25;
    }

     for (idx = 0; idx < parrafos.length; idx++) {
          patron.xAxis.categories.push(parrafos[idx].nombre);
          patron.series[0].data.push(parrafos[idx].avgTotElapsed / 1000);
      }

    var graf = angular.element($("#" + idGrafico));
    graf.highcharts(patron);
}

function graficoCoverage($scope, coverage, idGrafico) {

    stop1 = coverage.minimum / 3;
    stop2 = stop1 * 2;
    stop3 = coverage.minimum;

    color = "black";
    if (coverage.actual > 0)     color="red";
    if (coverage.actual > stop1) color="yellow";
    if (coverage.actual > stop2) color="green";

    var gaugeOptions = {
         chart: { type: 'solidgauge'  }
        ,title: null
        ,legend: {enabled: false}
        ,pane: {
            center: ['50%', '50%'],
            size: '100%',
            startAngle: -180,
            endAngle: 180,
            background: {
                backgroundColor: (Highcharts.theme && Highcharts.theme.background2) || '#EEE',
                innerRadius: '60%',
                outerRadius: '100%',
                shape: 'arc'
            }
        },

        tooltip: {
            enabled: false
        },

        // the value axis
        yAxis: {
            stops: [
                [stop1, '#DF5353'], // red
                [stop2, '#DDDF0D'], // yellow
                [stop3, '#55BF3B']  // green
            ],
            lineWidth: 0,
            minorTickInterval: null,
            tickAmount: 2,
            title: {
                y: -70
            },
            labels: {
                y: 16
            }
        },

        plotOptions: {
            solidgauge: {
                dataLabels: {
                    y: 30,
                    borderWidth: 0,
                    useHTML: true
                }
            }
        }
    };

    var gaugeCoverage =  {
        yAxis: {
            min: 0,
            max: 100,
            title: {
                text: 'Speed'
            }
        },

        credits: {
            enabled: false
        },

        series: [{
            name: 'Coverage',
            data: [coverage.actual],
            dataLabels: {
                format: '<div style="text-align:center"><span style="font-size:25px;color:' + color + '">{y}%</div>'
//                ((Highcharts.theme && Highcharts.theme.contrastTextColor) || 'black') + '">{y}%</div>'
            }
/*
            ,tooltip: {
                valueSuffix: ' km/h'
            }
*/
        }]

    };
    var graf = angular.element($("#" + idGrafico));
    graf.highcharts(Highcharts.merge(gaugeOptions, gaugeCoverage));

}
