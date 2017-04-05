var colors1 =  ["#0000FF", "#55BF3B", "#FFFACD", "#ff8c00", "#7798BF",
                "#EE82EE", "#778899", "#1E90FF", "#DF5353", "#8B008B",
                "#808000", "#4B0082", "#006400", "#F0E68C", "#000080",
                "#A0522D", "#4B0082", "#8B4513", "#FF00FF", "#7B68EE",
                "#2F4F4F", "#6B8E23", "#6A5ACD", "#EE82EE", "#4682B4"];

function graficoParrafos($scope, parrafos, idGrafico, panel) {

    var sc = $scope;
    while (sc.colors == undefined) {
        sc = sc.$parent;
    }

    var sdp = getSDP($scope);

    var patron =  {
        chart:  { type: 'column'
            ,spacingLeft:  0
            ,spacingRight: 0
            ,spacingBottom: 2
            ,marginLeft: 45
            ,marginRight: 45
        }
        ,title:   null
        ,xAxis:  { categories: [] }
        ,yAxis: [{
            lineWidth: 1
            ,tickWidth: 1
            ,title: {
                text: 'Sentencias'
                ,y: 0
            }
        }
            ,{ lineWidth: 1
                ,tickWidth: 1
                ,opposite: true
                ,title: {
                    text: 'Complejidad'
                    ,y: 0
                }
            }
        ]
        ,plotOptions: {
            series: {
                pointPadding: 0
                ,groupPadding: 0
                ,colorByPoint: true
            }
        }
        ,series: [ { name: $scope.MSG.TIT_SENTENCIAS
                    ,colors: sc.colors1
                    ,colorByPoint: true
                    ,data: []
                   }
                 ,{ name: $scope.MSG.TIT_COMPLEJIDAD
                   ,colors: sc.colors2
                   ,colorByPoint: true
                   ,yAxis: 1
                   ,data: []
                  }
                 ]
    };

    if (panel == true) {
        $scope.titulo = $scope.MSG.TIT_PARRAFOS;
        patron.chart.renderTo = idGrafico;
        patron.chart.spacingLeft =  50;
        patron.chart.spacingRight = 50;
        patron.chart.spacingTop = 25;
        patron.chart.spacingBottom = 25;
        patron.chart.marginLeft = 100;
        patron.chart.marginRight = 100;
    }

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
    var graf = angular.element($("#" + idGrafico));
    graf.highcharts(patron);
}

function graficoUsoParrafos($scope, parrafos, idGrafico, panel) {

    var patron = { title: null
        ,chart:   { type: 'bar'
            ,spacingBottom: 0
            ,spacingTop:   0
            ,spacingLeft:  45
            ,spacingRight: 0
            ,marginLeft: 0
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