function sleep(milliseconds) {
    var start = new Date().getTime();
    for (var i = 0; i < 1e7; i++) {
        if ((new Date().getTime() - start) > milliseconds){
            break;
        }
    }
}

function refreshUsers($scope, datos) {
    var adm  = $scope.getADM();
    adm.setUsuarios(datos);
    $scope.users = [];
    for (var idx = 0; idx < datos.length; idx++) {
        $scope.users.push(angular.copy(datos[idx]));
    }

}

function refreshConfig($scope, datos) {
    var count = 1;
    var adm  = $scope.getADM();
    adm.setConfig(datos);

    // Hay que esperar que se carguen las etiquetas
    while (adm.cfgLabels == null && count < 6) {
        sleep(100 * count);
        count++;
    }

    $scope.cfg = [];
    for (var idx = 0; idx < datos.length; idx++) {
        var cfg = new Config();
        cfg.id = idx;
        cfg.clave = datos[idx].clave;
        cfg.valor = datos[idx].valor;
        cfg.grupo = datos[idx].grupo;
        cfg.tipo  = datos[idx].tipo;
        cfg.chg = 0;
        $scope.cfg.push(cfg);
    }
}

function refreshConfigLabel($scope, datos) {
    var adm  = $scope.getADM();
    adm.cfgLabels = datos;
    for (var idx = 0; idx < datos.length; idx++) {
        console.log(idx + " - " + datos[idx]);
    }
}

function cargaArbol($scope, datos) {
    var arbol = angular.element($("#arbol"));
    var nodoRaiz = datos[0].id;

    var adm = $scope.getADM();

    var data = [];
    for (var idx = 0; idx < datos.length; idx++) {
        var nodo = {};
        nodo.id     = datos[idx].id;
        nodo.text   = datos[idx].text;
        nodo.parent = datos[idx].parent;
        nodo.data   = {};
        nodo.data.tipo = datos[idx].tipo;
        nodo.data.aplicaciones = datos[idx].aplicaciones;
        nodo.data.modulos = datos[idx].modulos;
        if (idx == 0) nodo.state = {opened: true, selected: true};
        data.push(nodo);
    }
    arbol.jstree({ 'plugins': ["search"]
        ,'core': {'data': data  }
        ,'ui': { 'select_limit': 1}
        ,'search': {
            "case_insensitive": true
            ,"show_only_matches" : true
        }
    })
        .on('loaded.jstree', function() { // node, data) {
            $.jstree.reference('#arbol').select_node(nodoRaiz, true);
        })
        .on('select_node.jstree', function(node, data) { // } ,trig) {
            adm.idNodo    = data.node.id;
            adm.tipoNodo  = data.node.data.tipo;
            adm.txtObjeto = data.node.text;
/*
            // Los modulos son de tipo 1
            if (sdp.tipoNodo == 0) {
                if (data.node.data.aplicaciones > 0) {
                    $scope.cargaArea();
                }
                else {
                    $scope.cargaAplicacion()
                }
            }
            else {
                $scope.cargaModulo();
            } */
        });

    /*
     if (data.length > 0) {
     data[0].state = {opened: true, selected: true};
     }
     */
    arbol.jstree(true).refresh();

}
