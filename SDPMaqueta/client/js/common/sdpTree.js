function cargaArbolAreas($scope, $state, datos) {
    var oldState = -1;

    var arbol = angular.element($("#arbol"));
    var nodoRaiz = datos[0].id;

    var sdp = getSDP($scope);
    var raiz;
    var data = [];

    // Esta variable la usa tree
    // Aqui para rellenar el icono

    var tipos =  {
        "valid_children" : [ "all" ]
        ,"root"       : { "icon": "../img/root_16.png"        }
        ,"area_closed": { "icon": "../img/folder_closed.png"}
        ,"area_open"  : { "icon": "../img/folder_open.png"  }
        ,"appl_closed": { "icon": "../img/folder_closed.png"}
        ,"appl_open"  : { "icon": "../img/folder_closed.png"}
        ,"cobol"      : { "icon": "../img/cobol2.png"        }
        ,"cics"       : { "icon": "../img/cics2.png"         }
        ,"db2"        : { "icon": "../img/db2.png"           }
        ,"cicsdb2"    : { "icon": "../img/cicsdb22.png"      }
    }

    for (var idx = 0; idx < datos.length; idx++) {
        var nodo = {};
        nodo.id     = datos[idx].id;
        nodo.text   = datos[idx].text;
        nodo.parent = datos[idx].parent;
        nodo.type = parseType(datos[idx].tipo);
        nodo.icon = eval("tipos." + nodo.type + ".icon");
        nodo.data   = {};
        nodo.data.type = datos[idx].tipo;

        if (idx == 0) {
            nodo.type = "root";
            nodo.icon = "../img/root.png"
            raiz = nodo.id;
            nodo.state = { opened: true, selected: true};
        }
        data.push(nodo);
    }

    arbol.jstree({
        'plugins': ["search", "ui", "types"]
        ,core: {
            'data': data
            ,themes: {
                "name": "default"
                ,'url': '.../lib/jstree/themes/default/style.css'
            }

        }

        , 'ui': {'select_limit': 1}
        , 'search': {
            "case_insensitive": true
            , "show_only_matches": true
        }
        ,"types": tipos
    })
        .on('loaded.jstree', function() { // node, data) {
            $.jstree.reference('#arbol').select_node(nodoRaiz, false, true);
            changeState(data[0]); // No se lanza el evento
        })
        .on('select_node.jstree', function(event, selected) {
            changeState(selected.node);
        })
        .on('open_node.jstree', function (event, data) {
            data.instance.set_type(data.node,'area_open');
        })
        .on('close_node.jstree', function (event, data) {
            data.instance.set_type(data.node,'area_closed');
        })

    arbol.jstree(true).refresh();

    function changeState(node) {
        sdp.request(node.id, node.data.type);

        var tipo =  Math.floor(node.data.type / 10);

        if (oldState != -1) {
            if (oldState == tipo) { // En el mismo estado no se refrescan los datos
                loader ($scope, $scope.http, $state, sdp);
            }
        }
        oldState = tipo;
        switch (tipo) {
            case 1: state = "area";   break;
            case 2: state = "appl";   break;
            case 4: state = "module"; break;
            case 9: state = "area";   break;  // Root
        }

        $state.go(state);
    }
    /*
     * Recibe un numero de dos digitos
     *  nm -> n grupo : 1 - Area, 2 - Appl, 4 - Mod
     *        m atributo
     */
    function parseType(tipo) {

        grupo = tipo / JCODES.GROUP;
        attr  = tipo % JCODES.GROUP;
        if (grupo & JCODES.AREA) return "area_closed";
        if (grupo & JCODES.APPL) return "appl_closed";
        // Modulo
        if (attr & JCODES.DB2) { // DB2
            return  (attr & JCODES.CICS) ? "cicsdb2" : "db2";
        }
        return (attr & JCODES.CICS) ? "cics" : "cobol";
    }

}


function cargaCodigo($scope, $state, datos) {
    var id = "#source";
    var arbol = angular.element($(id));

//    module.setLoaded("code");

//    var datos = module.source;
//    var datos = source0;
//    var nodoRaiz = datos [0].linea;

    var sdp = getSDP($scope);
    var raiz;
    var data = [];

    var nodo = {};
    nodo.id     = 0;
    nodo.text   = "Raiz";
    nodo.parent = "#";
    nodo.data   = {line: 0, code: "cabecera"}
    data.push(nodo);

    for (var idx = 0; idx < datos.length; idx++) {
        var nodo = {};

        let clsIdx  = datos[idx].type % 10;
        var clsType = JCODES.SRC_TYPES_0;

        switch (Math.floor(datos[idx].type / 10)) {
            case 0: clsType = JCODES.SRC_TYPES_0; break;
            case 2: clsType = JCODES.SRC_TYPES_2; break;
        }

        nodo.id     = datos[idx].linea;
        nodo.parent = datos[idx].parent;

        //nodo.text   = datos[idx].code;
        nodo.data   = { line: datos[idx].linea + ". "
                       ,code: datos[idx].code
                       ,cls:  clsType[clsIdx]
                      }
        data.push(nodo);
    }

    arbol.jstree({
         plugins : ['types', 'grid']
        ,core: {
            'data': data
            ,themes: {
                 "name": "code"
                ,'url': 'lib/jstree/themes/code/code.css'
                //,'url': 'lib/jstree/themes/proton/style.css'
//                ,'icons': false
            }

        }
        ,grid: {
            columns: [

                 {header: "Linea", value: "line", columnClass: "codeLine"} // , tree: false , columnClass: "codeLine", headerClass: "gridHeader"}
                ,{header: "Code",  value: "code", columnClass: "codeSource", valueClass: "cls"} // ,  tree: false, columnClass: "codeSource", headerClass: "gridHeader"}
                ,{header: "Arbol", tree: true} // , headerClass: "gridHeader"}

            ]
            //,fixedHeader: "false"
        }
        , types: {

        }
    })
        .on('loaded.jstree', function() {
            $.jstree.reference(id).open_all();
            //$.jstree('open_all');
        })

//    arbol.jstree(true).refresh();
}

function cargaRules($scope, $state, datos) {
    var id = "#rules";

    var oldState = -1;

    var arbol = angular.element($(id));
    var nodoRaiz = datos[0].id;

    var sdp = getSDPAdmin($scope);
    sdp.setRules(datos);

    var raiz;
    var data = [];

    for (var idx = 0; idx < datos.length; idx++) {
        var nodo = {};
        nodo.id     = datos[idx].id;
        nodo.text   = datos[idx].desc;
        nodo.parent = (datos[idx].idParent > 0) ? datos[idx].idParent : "#";
        nodo.data   = datos[idx];
        switch (nodo.data.active) {
            case  0: nodo.data.idActive = 0; break;
            case -1: nodo.data.idActive = 1; break;
            case -2: nodo.data.idActive = 2; break;
            default: nodo.data.idActive = 3;
        }
        setStatus(nodo.data.items0);
        setStatus(nodo.data.items1);

        nodo.state = (idx == 0) ? { opened: true, selected: true} : {opened: true, selected: false};
        data.push(nodo);
    }

    arbol.jstree({
        'plugins': ["search", "ui", "types"]
        ,core: {
            'data': data
            , dblclick_toggle : false
            ,themes: {
                "name": "classic"
                ,'url': 'lib/jstree/themes/classic/style.css'
            }

        }
        , 'ui': {'select_limit': 1}
        , 'search': {
            "case_insensitive": true
            , "show_only_matches": true
        }
        ,"types": {
              "active"  : {"a_attr": {"style" : "color:black"}}
            , "inactive": {"a_attr": {"style" : "color:grey; font-style: italic"}}
        }
    })
        .on('loaded.jstree', function() { // node, data) {
            $.jstree.reference(id).select_node(nodoRaiz, false, true);
        })
        .on('select_node.jstree', function(event, selected) {
            $scope.ruleLeaf = (selected.node.children.length == 0);
            $scope.node = selected.node.data;
        })
/*
        .on('click', '.jstree-anchor', function (e, data) {
            $(id).jstree(true).toggle_node(e.target);

        })
*/
    arbol.jstree(true).refresh();

    function  setStatus(items) {
        for (var i = 0; i < items.length; i++) {
            switch (nodo.data.items0[i].active) {
                case  0: items[i].idActive = 0; break;
                case -1: items[i].idActive = 1; break;
                case -2: items[i].idActive = 2; break;
                default: items[i].idActive = 3;
            }
        }
    }
}
