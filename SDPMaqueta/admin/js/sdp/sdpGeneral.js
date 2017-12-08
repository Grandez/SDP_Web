
function cargaMensajes($scope, datos) {
    for (var idx = 0; idx < datos.length; idx++) {
        $scope.MSG[datos[idx]] = datos[++idx];
    }
}

function cargaArbol($scope, datos) {
    cargaArbolNormal($scope, datos);
    cargaArbolCheck($scope, datos);
}

function cargaArbolNormal($scope, datos) {
    var arbol = angular.element($("#arbol0"));
    var nodoRaiz = datos[0].id;

    var sdp = getSDP($scope);
    var raiz;
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
        nodo.icon = (nodo.data.tipo == 1) ? 'hoja' : 'nodo';
        if (idx == 0) {
            raiz = nodo.id;
            nodo.state = { opened: true, selected: true};
        }
        data.push(nodo);
    }
    arbol.jstree({
        'plugins': ["search", "types"]
        , 'core': {'data': data}
        , 'ui': {'select_limit': 1}
        , 'search': {
            "case_insensitive": true
            , "show_only_matches": true
        }
    })
        .on('loaded.jstree', function() { // node, data) {
            $.jstree.reference('#arbol0').select_node(nodoRaiz, true);
            $scope.cargaArea();
        })
        .on('select_node.jstree', function(node, data) {
            sdp.idNodo    = data.node.id;
            sdp.tipoNodo  = data.node.data.tipo;
            sdp.txtObjeto = data.node.text;
            sdp.sesNames = [data.node.text];

            // Los  modulos son de tipo 1
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
            }
        });

    arbol.jstree(true).refresh();
}

function cargaArbolCheck($scope, datos) {
    var arbol = angular.element($("#arbol1"));
    var nodoRaiz = datos[0].id;

    var sdp = getSDP($scope);
    var raiz;
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
        nodo.icon = (nodo.data.tipo == 1) ? 'hoja' : 'nodo';
        if (idx == 0) {
            raiz = nodo.id;
            nodo.state = { opened: true, selected: true};
        }
        data.push(nodo);
    }
    arbol.jstree({ 'plugins': ["search", "types", "checkbox" ]
                  ,'core': {'data': data  }
                  ,'ui': { 'select_limit': 1}
                  ,'search': {
                      "case_insensitive": true
                     ,"show_only_matches" : true
                  }
        })
        .on('select_node.jstree', function(node, data) {
            if ($scope.showArbol == 1) return;
            if (data.node.id == sdp.idNodo) return;
            $scope.insertaSesion(data.node.id, data.node.text);
        })
        .on('deselect_node.jstree', function(node, data) {
            if ($scope.showArbol == 1) return;
            $scope.eliminaSesion(data.node.text, false);
        });

    arbol.jstree(true).refresh();
}

function getSDP($scope) {
    var scope = $scope;
    while (scope.nombre != "SDP") {
        scope = scope.$parent;
    }
    return scope.sdp;
}

function getMSG($scope) {
    var scope = $scope;
    while (scope.MSG == undefined) {
        scope = $scope.$parent;
    }
    return $scope.MSG;
}

function getWinId(prefix) {
    var cnt = 0;
    var x = document.getElementById(prefix + cnt);
    while (x != null) {
        cnt = cnt + 1;
        x = document.getElementById(prefix + cnt);
    }
    return prefix + cnt;
}

function getColors(id) {
    if (id == 1) {
        return ["#0000FF", "#55BF3B", "#FFFACD", "#ff8c00", "#7798BF",
                "#EE82EE", "#778899", "#1E90FF", "#DF5353", "#8B008B",
                "#808000", "#4B0082", "#006400", "#F0E68C", "#000080",
                "#A0522D", "#4B0082", "#8B4513", "#FF00FF", "#7B68EE",
                "#2F4F4F", "#6B8E23", "#6A5ACD", "#EE82EE", "#4682B4"];
    }

    if (id == 2) {
        return ["#4682B4", "#EE82EE", "#6A5ACD", "#6B8E23", "#2F4F4F",
                "#7B68EE", "#FF00FF", "#8B4513", "#4B0082", "#A0522D",
                "#000080", "#F0E68C", "#006400", "#4B0082", "#808000",
                "#8B008B", "#DF5353", "#1E90FF", "#778899", "#EE82EE",
                "#7798BF", "#ff8c00", "#0000FF", "#55BF3B", "#FFFACD"];
    }
}