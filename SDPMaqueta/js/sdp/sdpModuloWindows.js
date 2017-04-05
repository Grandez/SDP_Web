function getWinSentences($scope, modulo, MSG) {
    var txt =
    '<div id="divSentencias" class="contenedor col-md-12">  ' +
    '        <div class="panel panel-primary col-md-6" style="margin-left: 3px">  ' +
    '             <div class="panel-heading">' + MSG.WIN_TITLE_RES + '</div>' +
    '             <div class="panel-body">                 ' +
    '                  <table class="table table-hover">   ' +
    '                     <tr class="listado">             ' +
    '                         <td class="col-md-7" >' + MSG.WIN_SRC_IO + '</td>  ' +
    '                         <td class="col-md-5 text-right tbLinea">' + modulo.resumen.info.verbosIO + ' </td> ' +
    '                    </tr> ' +

    '                    <tr class="listado">                                                                    ' +
    '                        <td class="col-md-7" >' + MSG.WIN_SRC_DATOS + '</td>                                ' +
    '                        <td class="col-md-5 text-right tbLinea">' + modulo.resumen.info.verbosData + '</td> ' +
    '                    </tr>' + 
    
    '                    <tr class="listado">' + 
    '                        <td class="col-md-7" >' + MSG.WIN_SRC_FLUJO + '</td> ' +
    '                        <td class="col-md-5 text-right tbLinea">' + modulo.resumen.info.verbosFlujo + '</td>' +
    '                    </tr>' +

    '                    <tr class="listado">' +
    '                        <td class="col-md-7" >' + MSG.WIN_SRC_CTRL + '</td>' +
    '                        <td class="col-md-5 text-right tbLinea">' + modulo.resumen.info.verbosControl + '</td>' +
    '                    </tr>' +

    '                    <tr class="listado">' +
    '                        <td class="col-md-7" >' + MSG.WIN_SRC_ARIT + '</td>' +
    '                        <td class="col-md-5 text-right tbLinea">' + modulo.resumen.info.verbosArit + '</td>' +
    '                    </tr>' +
    
    '                    <tr class="listado">' +
    '                        <td class="col-md-7" >' + MSG.WIN_SRC_OTH + '</td>' +
    '                        <td class="col-md-5 text-right tbLinea">' + modulo.resumen.info.verbosLang + '</td>' +
    '                    </tr>' +
    
    '                    <tr><td class="col-md-12"><br> </td></tr>' +
    
    '                    <tr class="listado">' +
    '                        <td class="col-md-7" >' + MSG.WIN_SRC_TOTAL + '</td>' +
    '                        <td class="col-md-5 text-right tbLinea">' + modulo.resumen.sentencias + '</td>' +
    '                    </tr>' +

    '                 </table> ' +
    '           </div>         ' +
    '        </div>            ' +
    '</div>';
    return txt;
 }

function getWinRutinas($scope, modulo, MSG) {
    
    var txt =

        '<div id="divRutinas" class="contenedor col-md-12">   ' +
        '    <table class="table table-hover table-striped">  ' +
        '    <thead class="panel-heading">                    ' +
        '    <tr>                                             ' +
        '       <th class="panel-heading">' + MSG.WIN_RUT_NAME   + '</th>' +
        '       <th class="panel-heading">' + MSG.WIN_RUT_TIPO   + '</th>' +
        '       <th class="panel-heading">' + MSG.WIN_RUT_ESTADO + '</th>' +
        '    </tr>     ' +
        '    </thead>  ' +
        '              ';
        var ruts = modulo.rutinas;
        for (var idx = 0; idx <ruts.length; idx++) {
             txt = txt + '<tr class="listado">';
                txt = txt + '<td class="col-md-5">' + ruts[idx].nombre + '</td>';
                txt = txt + '<td class="col-md-5">' + ruts[idx].desc   + '</td>';
                switch (ruts[idx].estado) {
                   case 1: txt = txt + '<td class="col-md-1 sdpCheckGreen">&#10004;</td>'; break;
                   case 2: txt = txt + '<td class="col-md-1 sdpCheckYellow">&#x3F;</td>' ; break;
                   case 3: txt = txt + '<td class="col-md-1 sdpCheckRed">&#10008;</td>'  ; break;
                }  
                txt = txt + '</tr>';
        }
        txt = txt +  '</table></div>' ;
     return txt;
}

function getWinCopys($scope, modulo, MSG) {
    
    var txt =

       '<div id="divCopys" class="contenedor col-md-12">     ' +
       '    <table class="table table-hover table-striped">  ' +
       '    <thead class="panel-heading">                    ' +
       '    <tr>                                             ' +
       '       <th class="panel-heading">' + MSG.WIN_RUT_NAME   + '</th>' +
       '       <th class="panel-heading">' + MSG.WIN_RUT_TIPO   + '</th>' +
       '       <th class="panel-heading">' + MSG.WIN_RUT_ESTADO + '</th>' +
       '    </tr>     ' +
       '    </thead>  ';

        var cpys = modulo.copys;
        for (var idx = 0; idx < cpys.length; idx++) {
             txt = txt + '<tr class="listado">';
                txt = txt + '<td class="col-md-5">' + cpys[idx].nombre + '</td>';
                txt = txt + '<td class="col-md-5">' + cpys[idx].desc   + '</td>';
                switch (cpys[idx].estado) {
                   case 1: txt = txt + '<td class="col-md-1 sdpCheckGreen">&#10004;</td>'; break;
                   case 2: txt = txt + '<td class="col-md-1 sdpCheckYellow">&#x3F;</td>' ; break;
                   case 3: txt = txt + '<td class="col-md-1 sdpCheckRed">&#10008;</td>'  ; break;
                }  
                txt = txt + '</tr>';
        }
        txt = txt +  '</table></div>' ;
        return txt;
}