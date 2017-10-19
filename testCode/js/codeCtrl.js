function codeCtrl ( $scope, $http, $state) {
    $scope.nombre = "codeCtrl";
    console.log("Entra en el controlador " + $scope.nombre);
    $scope.code = source0;
    cargaCodigo($scope, "#source");
//    cargaCodigo($scope, "#source2");

}

function cargaCodigo($scope, id) {
    var arbol = angular.element($(id));

    var datos = $scope.code;

    var nodoRaiz =datos [0].linea;

    var data = [];

    var nodo = {};
    nodo.id     = 0;
    nodo.text   = "Raiz";
    nodo.parent = "#";
    data.push(nodo);

    for (var idx = 1; idx < datos.length; idx++) {
        var nodo = {};
        nodo.id     = datos[idx].linea + 1
        nodo.text   = " "; // datos[idx].code;
        nodo.data   = {line: datos[idx].linea + 1, code: datos[idx].code}
        nodo.parent = datos[idx].padre + 1;

        data.push(nodo);
    }

    data[0].parent = "#";

    arbol.jstree({
        'core': {
            'data': data
        }
        ,grid: {
            columns: [
                {header: "pepe", title: "_DATA_"},
                {width: 50, value: "line"},
                {width: 500, value: "code"}
            ]
        }
        ,'plugins' : ['types', 'grid']
        , 'types': {

        }
    })
    .on('loaded.jstree', function() {
        $.jstree.reference(id).open_all();
        //$.jstree('open_all');
    })
//    arbol.jstree(true).refresh();
    console.log("Cargado");

}

