function loadRules($scope, $state, datos) {
    var arbol = "#arbRules";
    var oldState = -1;

    var arbol = angular.element($(arbol));

    var sdp = getSDP($scope);
    var raiz;
    var data = [];
    var nodoRaiz = datos[0].id;
/*
    var nodo = datos[0];
    data.push(nodo);
    for (var iGroup = 0; iGroup < nodo.children.length; iGroup++) {
        nodo = nodo.children[iGroup];
        data.push(nodo);
        for (var iItem = 0; iItem < nodo.children.length; iItem++) {
            nodo = nodo.children[iItem];
            data.push(nodo);
            for (var iRule = 0; iRule < nodo.children.length; iRule++) {
                nodo = nodo.children[iRule];
                data.push(nodo);
            }
        }
    }
*/
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
/*
    for (var idx = 0; idx < datos.length; idx++) {
        addGroup(datos[idx], idx);
    }
    function addGroup(datos, idx) {
        var nodo = createNode(datos);
        if (idx == 0) {
            nodo.type = "root";
            nodo.icon = "../img/root.png";
            nodo.parent = "#";
            nodo.state = { opened: true, selected: true};
        }
        data.push(nodo);
        for (var idx = 0; idx < datos.items.length; idx++) {
            data.push(createNode(datos.items[idx]));
            for (var iRules = 0; iRules < datos.items[idx].rules.length; iRules++) {
                data.push(createNode(datos.items[idx].rules[iRules]));
            }
        }
    }
    function createNode(data) {
        var nodo = {};
        nodo.id = data.id;
        nodo.text = data.name;
        nodo.parent = data.parent;
        nodo.data = {};
//         nodo.data.type = datos[idx].tipo;
        return nodo;
    }
*/
    arbol.jstree({
        'plugins': ["search", "ui", "types"]
        ,core: {
            'data': datos
            ,themes: {
                "name": "default"
                ,'url': '../lib/jstree/themes/default/style.css'
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
            $.jstree.reference(arbol).select_node(nodoRaiz, false, true);
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
/*
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
*/
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

function loadConfigTree($scope, $state, datos, id) {
    var idDiv = "div#cfgGrid";
    var arbol = angular.element($(idDiv));

    var sdp = getSDP($scope);
    var raiz;

    var width = $("#configContainer").width() / 10;
    var w = [0,0,0];
    w[0] = width * 2;
    w[1] = width * 1;
    w[2] = width * 2;

    arbol.jstree({
        plugins: ["themes", "json", "grid", "dnd"],
        core: {
            data: datos
        }
        , grid: {
            columns: [
                {header: "Nodes", title: "_DATA_", width: w[0]}
                , {value: "clave", header: "clave", title: "clave", width: w[1]}
                , {value: "valor", header: "valor", title: "valor", width: w[2]}
            ]
        }
    });

}
