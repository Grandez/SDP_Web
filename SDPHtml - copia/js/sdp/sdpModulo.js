function refreshModulo($scope, datos) {

    var sdp = getSDP($scope);
    var modulo = sdp.setModulo(datos.idModulo);
    modulo.setData(datos);


    sdp.txtObject = datos.nombre;

    sdp.maxStmt   = datos.maxStmt;
    sdp.maxCC     = datos.maxCC;
    sdp.maxCCParr = datos.maxCCParr;

    if (datos.status == -1) modulo.status = -1;

    $scope.modulo = modulo;
//    $scope.modulo.resumen = modulo.getResumen();

    if (datos.exist == false) {
        $scope.vista = $scope.vista * -1;
        return;
    }

    cargaCobertura(datos.cobertura, datos.maxCobertura);
    cargaComplejidad(datos, datos.parrafos);
    graficoParrafos($scope, datos.parrafos, 'grfParrafos', false);

}

function refreshIssues($scope, issues) {

    var sdp = getSDP($scope);
    var modulo = sdp.getModulo();
    modulo.issues = issues.issues;
    modulo.issues[0] = 0;

    for (var idx = 1; idx < issues.issues.length; idx++) {
        modulo.issues[0] += issues.issues[idx];
    }

    if (issues.status == -1) modulo.status = false;
}

function refreshDeps($scope, datos) {

    var sdp = getSDP($scope);
    var modulo = sdp.getModulo();
    modulo.deps = datos;

    for (var idx = 0; idx < datos.length; idx++) {
        switch (datos[idx].tipo) {
            case 1: break;
            case 2: modulo.depSummary.call += 1;
        }
    }
}

function refreshArbolModulo($scope, datos) {
    var options = new primitives.orgdiagram.Config();

    var sdp = getSDP($scope);
    var modulo = sdp.getModulo();
    modulo.setArbol(datos);

    var items = [];

    for (var idx = 0; idx < datos.length; idx++) {
        datos[idx].title        = datos[idx].nombre;
        datos[idx].description  = datos[idx].veces;
        datos[idx].templateName = "arbolTemplate";
        datos[idx].Ejecuciones  = $scope.MSG.ARB_EXE;
        datos[idx].Ultima       = $scope.MSG.ARB_LAST;
        datos[idx].Fecha        = $scope.MSG.ARB_TIME;
        datos[idx].CPU          = $scope.MSG.ARB_CPU;
        datos[idx].SUSPEND      = $scope.MSG.ARB_SUSPEND;

        items.push(new primitives.orgdiagram.ItemConfig(datos[idx]));
    }

    options.items = items;
    options.cursorItem = 0;
    options.templates = [getArbolTemplate($scope)];
    options.onItemRender = onTemplateRender2;
    options.hasButtons = primitives.common.Enabled.False;

    var grafAppl = angular.element($("#arbolModulos"));
    grafAppl.orgDiagram(options);
    grafAppl.orgDiagram("update", primitives.orgdiagram.UpdateMode.Recreate);
}

function onTemplateRender2(event, data) {
    switch (data.renderingMode) {
        case primitives.common.RenderingMode.Create:
            /* Initialize widgets here */
            break;
        case primitives.common.RenderingMode.Update:
            /* Update widgets here */
            break;
    }

    var itemConfig = data.context;


        var fields = ["nombre", "veces", "tms", "avgElapsed", "prcCpu", "prcSuspend"];
        for (var index = 0; index < fields.length; index++) {
            var field = fields[index];

            var element = data.element.find("[name=" + field + "]");
            if (element.text() != itemConfig[field]) {
                element.text(itemConfig[field]);
            }
        }
}

function getArbolTemplate($scope) {
    var result = new primitives.orgdiagram.TemplateConfig();
    result.name = "arbolTemplate";

    result.itemSize = new primitives.common.Size(250, 120);
    result.minimizedItemSize = new primitives.common.Size(3, 3);
    result.highlightPadding = new primitives.common.Thickness(2, 2, 2, 2);


    var td1 = '<td class="sdpWinTxt"' + 'name="Ejecuciones"></td>';
    var td2 = '<td class="sdpWinTxt"' + 'name="Ultima"></td>';
    var td3 = '<td class="sdpWinTxt"' + 'name="Fecha"></td>';
    var td4 = '<td class="sdpWinTxt"' + 'name="CPU"></td>';
    var td5 = '<td class="sdpWinTxt"' + 'name="SUSPEND"></td>';

    var itemTemplate = jQuery(
        '<div class="bp-item bp-corner-all bt-item-frame">'
        + '<div name="titleBackground" class="bp-item bp-corner-all bp-title-frame" style="top: 0px; left: 0px; width: 250px; height: 24px;">'
        + '      <div name="nombre" class="bp-title" style="text-align: center;"></div>'
        + '</div>'
        + '<div style="top: 30px; left: 2px"><table style="width: 100%">'
        + '<tr><td>&nbsp;&nbsp;</td><td  class="bp-item" style="text-align: right;">&nbsp;&nbsp;</td></tr>'
        + '<tr><td>&nbsp;&nbsp; </td><td class="bp-item" style="text-align: right;">&nbsp;&nbsp;</td></tr>'

        + '<tr><td class="sdpWinTxt">Ejecuciones"</td><td name="veces"      class="sdpWinData" ></td></tr>'
        + '<tr><td class="sdpWinTxt">Ultima"</td>     <td name="tms"        class="sdpWinData" ></td></tr>'
        + '<tr><td class="sdpWinTxt">Elapsed"</td>    <td name="avgElapsed" class="sdpWinData" ></td></tr>'
        + '<tr><td class="sdpWinTxt">CPU"</td>        <td name="prcCpu"     class="sdpWinData" ></td></tr>'
        + '<tr><td class="sdpWinTxt">SUSPEND"</td>    <td name="prcSuspend" class="sdpWinData" ></td></tr>'
/*
        + '<tr>' + td1 + '<td name="veces"      class="sdpWinData" ></td></tr>'
        + '<tr>' + td2 + '<td name="tms"        class="sdpWinData" ></td></tr>'
        + '<tr>' + td3 + '<td name="avgElapsed" class="sdpWinData" ></td></tr>'
        + '<tr>' + td4 + '<td name="prcCpu"     class="sdpWinData" ></td></tr>'
        + '<tr>' + td5 + '<td name="prcSuspend" class="sdpWinData" ></td></tr>'
*/
        + '</table></div>'
        + '</div>'
    ).css({
            width: result.itemSize.width + "px",
            height: result.itemSize.height + "px"
        }).addClass("bp-item bp-corner-all bt-item-frame");
    result.itemTemplate = itemTemplate.wrap('<div>').parent().html();
    return result;
}
function cargaCobertura(cobertura, maxCobertura) {
    var min = maxCobertura / 3;
    var med = min * 2;
    var max = min * 3;

    var patron = {
         credits: {  enabled: false }
        ,chart: {
             type: 'solidgauge'
            ,spacingBottom: 0
            ,spacingTop:   0
            ,spacingLeft:  0
            ,spacingRight: 0
            ,marginLeft: 0
            ,marginRight: 0
            ,width: null
            ,height: null
        }
        ,title: {
            text: ''
           ,align: 'center'
           ,verticalAlign: 'middle'
           ,y: 12
           ,style: {fontWeight: 'bold', color: 'green'}
        }
        ,pane: {
            center: ['50%', '50%'],
            size: '100%',
            startAngle: -180,
            endAngle: 180,
            background: {
                backgroundColor: '#fff',
                innerRadius: '100%',
                outerRadius: '100%',
                shape: 'arc',
                borderColor: 'transparent'
            }
        },

        tooltip: {
            enabled: false
        },

        // the value axis
        yAxis: {
            min: 0,
            max: 100,
            stops: [
                [min, 'red'],
                [med, 'yellow'], // red
                [max, 'green'] // yellow
            ],
            minorTickInterval: null,
            tickPixelInterval: 400,
            tickWidth: 0,
            gridLineWidth: 0,
            gridLineColor: 'transparent'
            ,labels: { enabled: false }
            ,title: { enabled: false }

        },

        plotOptions: {
            solidgauge: {
                innerRadius: '50%'
               ,dataLabels: {enabled: false }
            }
        },

        series: [{
            data: [],
            dataLabels: {
                format: '<p style="text-align:center;">{y}%</p>'
            }
        }]
    };

    patron.title.text = cobertura + " %";
    patron.series[0].data.push(cobertura);

    if (cobertura < 75) {
        patron.title.style = {fontWeight: 'bold', color: 'yellow'}
    }

    if (cobertura < 30) {
        patron.title.style = {fontWeight: 'bold', color: 'red'}
    }

    var grafCobertura = angular.element($("#grfCobertura"));
    grafCobertura.highcharts(patron);

}

function cargaComplejidad(datos, parrafos) {
    var patron = {
                  chart: {
                      type: 'pie'
                     ,spacingBottom: 0
                     ,spacingTop:   0
                     ,spacingLeft:  0
                     ,spacingRight: 0
                     ,marginLeft: 0
                     ,marginRight: 0
                     ,width: null
                     ,height: null
                  }
                  ,title: {
                      text: ''
                     ,align: 'center'
                     ,verticalAlign: 'middle'
                     ,y: 12
                     ,style: {fontWeight: 'bold', color: 'black'}
                  }
            ,pane: {
                center: ['50%', '50%'],
                size: '100%',
                startAngle: -180,
                endAngle: 180,
                background: {
                    backgroundColor: '#fff',
                    innerRadius: '100%',
                    outerRadius: '100%',
                    shape: 'arc',
                    borderColor: 'transparent'
                }
            }

                  ,tooltip: {
                     pointFormat: '{series.name}: <b>{point.percentage:.1f}%</b>'
                  }
                  ,plotOptions: {
                      pie: {
                         dataLabels: {
                             enabled: false
                            ,distance: -50
                            ,style: {
                                fontWeight: 'bold',
                                color: 'white',
                                textShadow: '0px 1px 2px black'
                            }
                         }
                         ,startAngle: -180
                         ,endAngle: 180
                         ,center: ['50%', '50%']
                      }
                  }
                  ,series: [{
                       name: 'Complejidad'
                      ,innerSize: '50%'
                      ,data: []
                          }]
    };
    var totCC  = 0;

    for (var index = 0; index < parrafos.length; index++) {
        patron.series[0].data.push([parrafos[index].nombre, parrafos[index].cc]);
        totCC += parrafos[index].cc;
    }

    patron.title.text = totCC;

    if (totCC > datos.maxCC) {
        patron.title.style = {fontWeight: 'bold', color: 'red'}
    }

    var grafCC = angular.element($("#grfCC"));
    grafCC.highcharts(patron);

}

function cargaParrafos(parrafos) {
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
              ,series: [ { name: 'Sentencias' , colors: colors1, colorByPoint: true, data: [] }
                        ,{ name: 'Complejidad'
                          ,colors: colors2
                          ,colorByPoint: true
                          ,yAxis: 1
                          ,data: []
                          }
                       ]
    };


    for (index = 0; index < parrafos.length; index++) {
        patron.xAxis.categories.push(parrafos[index].nombre);
        patron.series[0].data.push(parrafos[index].sentencias);
        patron.series[1].data.push(parrafos[index].cc);
    }

    var grafParrafos = angular.element($("#grfParrafos"));
    grafParrafos.highcharts(patron);
}

function refreshSesiones($scope, datos) {
    var sdp = getSDP($scope);
    var modulo = sdp.getModulo();

    // Si es la primera vez y no hay ejecuciones
    // Entonces muestra el codigo

    if (datos.length == 0 && modulo.loading == true) {
        $scope.cambiaPieModulo(1);
    }

    modulo.loading = false;
    modulo.sesiones.push(datos);
//    modulo.SesionesName.push(sdp.txtObject);

    var patron = {
        credits: {  enabled: false }
        ,legend: {enabled: false}
        ,chart: {
            type: 'scatter',
            zoomType: 'x'
        },
        title: null

        , xAxis: {
            type: 'datetime',
            minTickInterval : 1000,
            allowDecimals: false,
            labels: { formatter: function () { return this.value; }}
        },
        yAxis: {
            title:  { text: $scope.MSG.LBL_TIME_MS },
            labels: { formatter: function () { return this.value / 1000; } }
        },
        tooltip: {
            pointFormat: '{series.name}: {point.x} mSg.'
        },
        plotOptions: {
            area: {
                colorByPoint: true,
                marker: {
                    enabled: false,
                    symbol: 'circle',
                    radius: 2,
                    states: {
                        hover: {
                            enabled: true
                        }
                    }
                }
            }
        },
        series: [{name: '', data: [] }]
    };

    var grafTiempos = angular.element($("#grfTiempos"));
    grafTiempos.highcharts(patron);

    recargaSesiones($scope);
}

function addSesion($scope, datos) {
    var sdp = getSDP($scope);
    var modulo = sdp.getModulo();

    modulo.setSesiones(datos);
    modulo.setSesionesName(sdp.txtObject);

    recargaSesiones($scope);
}

function removeSesion($scope, id) {
    var sdp = getSDP($scope);
    var grf = angular.element($("#grfTiempos")).highcharts();
    if (id == -1) {
        var base = sdp.sesNames[0];
        while (grf.series.length > 1) {
            grf.series[1].remove();
        }
        sdp.sesNames = [base];
    }
    else {
        grf.series[id].remove();
        sdp.sesNames.remove(id);
    }
}

function recargaSesiones($scope) {
    var sdp     = getSDP($scope);
    var modulo  = sdp.getModulo();

    var datos   = modulo.sesiones;
    var nombres = modulo.sesionesName;
    var orden   = parseInt(sdp.ordenSesiones);

    var grf = angular.element($("#grfTiempos")).highcharts();

    switch(orden) {
        case 0: grf.xAxis.type = 'datetime'; break;
        case 1: grf.xAxis.type = 'linear'; break;
        case 2: grf.xAxis.type = 'linear'; break;
    }

    for (var idx = 0 ; idx < datos.length; idx++) {
        var serie = datos[idx];
        var puntos = [];

        for (var index = 0; index < serie.length; index++) {
            switch (orden) {
                case 0:
                    puntos.push([new Date(serie[index].tms), serie[index].elapsed]);
                    break;
                case 1:
                    puntos.push([serie[index].leido, serie[index].elapsed]);
                    break;
                case 2:
                    puntos.push([serie[index].escrito, serie[index].elapsed]);
                    break;
            }
        }
        puntos.sort(function (a, b) {
            return a[0] - b[0];
        });

        if (idx == 0) {
            grf.series[idx].name = sdp.sesNames[idx];
            grf.series[idx].setData(puntos, true);
        }
        else {
            grf.addSeries({name: sdp.sesNames[idx], data: puntos});
        }

    }

    grf.redraw();
}

function refreshUsoParrafos($scope, datos) {
    var sdp = getSDP($scope);
    var modulo = sdp.getModulo();
//    modulo.setUsoParrafos(datos);

    graficoUsoParrafos    ($scope, datos, 'grfUso',     false);
    graficoConsumoParrafos($scope, datos, 'grfConsumo', false);
}

function refreshStats($scope, datos) {
    var sdp = getSDP($scope);
    var modulo = sdp.getModulo();

    modulo.setStats(datos);
    $scope.stats = datos;
}

function refreshCodigo($scope, datos) {
    var modulo = getSDP($scope).getModulo();
    modulo.codigo = datos;
    $scope.codigo = datos;
}

