var diagram;

function cargaGrafo($scope, datos) {
//    var diagram = graphBase("grafo");

    if (datos.data == false) {
        $scope.graphData = false;
        return;
    }
    $scope.graphData = true;
    for (var idx = 0; idx < datos.nodes.length; idx++) {
        switch(datos.nodes[idx].type) {
            case 2: datos.nodes[idx].category = "begin"; break;
            case 3: datos.nodes[idx].category = "end"; break;
            case 6: datos.nodes[idx].category = "code"; break;
            case 11:
            case 12: datos.nodes[idx].category = "connector";
            break;
            case 51: datos.nodes[idx].category = "paragraph"; break;
            default: datos.nodes[idx].category = "code";
        }
    }

    var nodeDataArray = datos.nodes;
    var linkDataArray = datos.edges;

    /*
        var nodeDataArray = [
            { name: "Inicio",category: "begin" },
            { name: "Code", category: "code" },
            { name: "Fin", category: "end" }
        ];

        var linkDataArray = [
            { from: "Inicio", to: "Code" }
            ,{ from: "Code", to: "Fin" }
        ];
    */
    $scope.diagram.model = new go.GraphLinksModel(nodeDataArray, linkDataArray);
    $scope.diagram.alignDocument(go.Spot.Center);
}

function cargaCall($scope, datos) {
//    var diagram = graphBase("grafo");

    if (datos.data == false) {
        $scope.graphData = false;
        return;
    }
    $scope.graphData = true;

    for (var idx = 0; idx < datos.nodes.length; idx++) {
        switch(datos.nodes[idx].data.method) {
            case  0: prefx = "module"; break;
            case  1: prefx = "call"  ; break;
            case  2: prefx = "link"  ; break;
            case  4: prefx = "xctl"  ; break;
            case  8: prefx = "tran"  ; break;
            case 16: prefx = "ret"   ; break;
            default: prefx = "code";
        }
        if (datos.nodes[idx].data.method != 0) {
            switch (datos.nodes[idx].data.mode) {
                case  0:
                    prefx = prefx + "Dynamic";
                    break;
                case  1:
                    prefx = prefx + "Static";
                    break;
                case  2:
                    prefx = prefx + "Dynamic";
                    break;
                default:
                    prefx = prefx + "Dynamic";
                    break;
            }
        }
        datos.nodes[idx].category = prefx;
    }

    var nodeDataArray = datos.nodes;
    var linkDataArray = datos.edges;

    $scope.diagram.model = new go.GraphLinksModel(nodeDataArray, linkDataArray);
    $scope.diagram.alignDocument(go.Spot.Center);
}

function initGraphCanvas($scope, idDiv) {
    var $ = go.GraphObject.make;     // for conciseness in defining templates
    diagram = $(go.Diagram, idDiv,  // create a Diagram for the DIV HTML element
        {
            initialDocumentSpot: go.Spot.TopCenter,
            initialViewportSpot: go.Spot.TopCenter,
            initialAutoScale: go.Diagram.Uniform,
            layout: $(go.LayeredDigraphLayout,
                {
                    direction: 90
//                            , initialContentAlignment: go.Spot.Center
                })
        });

    var group =
        $(go.Group, "Auto",
            { // define the group's internal layout
                layout: $(go.LayeredDigraphLayout,
                           { angle: 90, isRealtime: false }),
                // the group begins unexpanded;
                // upon expansion, a Diagram Listener will generate contents for the group
                           isSubGraphExpanded: false,
                // when a group is expanded, if it contains no parts, generate a subGraph inside of it
                subGraphExpandedChanged: function(group) {
                    if (group.memberParts.count === 0) {
                        randomGroup(group.data.key);
                    }
                }
            },
            $(go.Shape, "Rectangle",
                { fill: null, stroke: "gray", strokeWidth: 2 }),
            $(go.Panel, "Vertical",
                { defaultAlignment: go.Spot.Left, margin: 4 },
                $(go.Panel, "Horizontal",
                    { defaultAlignment: go.Spot.Top },
                    // the SubGraphExpanderButton is a panel that functions as a button to expand or collapse the subGraph
                    $("SubGraphExpanderButton"),
                    $(go.TextBlock,
                        { font: "Bold 18px Sans-Serif", margin: 4 },
                        new go.Binding("text", "key"))
                ),
                // create a placeholder to represent the area where the contents of the group are
                $(go.Placeholder,
                    { padding: new go.Margin(0, 10) })
            )  // end Vertical Panel
        );  // end Group

    var begin =
        $(go.Node, "Auto",
            $(go.Shape, "Start", { fill: "black"   }),
            $(go.TextBlock, textBlockStyle())
        );
    var end =
        $(go.Node, "Auto",
            $(go.Shape, "Terminator", { fill: "white"  }),
            $(go.TextBlock, textBlockStyle())
        );

    var connector =
        $(go.Node, "Auto",
            $(go.Shape, "Circle",{ fill: "white" }),
            $(go.TextBlock, connectStyle())
        );
    var code =
        $(go.Node, "Auto",
            $(go.Shape, "RoundedRectangle", { fill: "blue" }),
            $(go.TextBlock, textBlockStyle())
        );
    var paragraph =
        $(go.Node, "Auto",
            $(go.Shape, "Rectangle",{ fill: "green" }),
            $(go.TextBlock, textBlockStyle())
        );
    var module =
        $(go.Node, "Auto",
            $(go.Shape, "Procedure", { fill: "green" }),
            $(go.TextBlock, textBlockStyle())
        );

    // Modulos
    var callStatic =
        $(go.Node, "Auto",
            $(go.Shape, "Procedure", { fill: "blue" }),
            $(go.TextBlock, textBlockStyle())
        );

    var callDynamic =
        $(go.Node, "Auto",
            $(go.Shape, "Procedure", { fill: "grey" }),
            $(go.TextBlock, textBlockStyle())
        );

    var linkStatic =
        $(go.Node, "Auto",
            $(go.Shape, "Procedure", { fill: "cyan" }),
            $(go.TextBlock, textBlockStyle())
        );

    var linkDynamic =
        $(go.Node, "Auto",
            $(go.Shape, "Procedure", { fill: "turquoise" }),
            $(go.TextBlock, textBlockStyle())
        );

    var xctlStatic =
        $(go.Node, "Auto",
            $(go.Shape, "Procedure", { fill: "deepskyblue" }),
            $(go.TextBlock, textBlockStyle())
        );

    var xctlDynamic =
        $(go.Node, "Auto",
            $(go.Shape, "Procedure", { fill: "salmon" }),
            $(go.TextBlock, textBlockStyle())
        );

    var tranStatic =
        $(go.Node, "Auto",
            $(go.Shape, "Procedure", { fill: "red" }),
            $(go.TextBlock, textBlockStyle())
        );

    var tranDynamic =
        $(go.Node, "Auto",
            $(go.Shape, "Procedure", { fill: "aquamarine" }),
            $(go.TextBlock, textBlockStyle())
        );

    var retStatic =
        $(go.Node, "Auto",
            $(go.Shape, "Procedure", { fill: "black" }),
            $(go.TextBlock, textBlockStyle())
        );
    var retDynamic =
        $(go.Node, "Auto",
            $(go.Shape, "Procedure", { fill: "yellow" }),
            $(go.TextBlock, textBlockStyle())
        );

    // create the nodeTemplateMap, holding three node templates:
    var templmap = new go.Map("string", go.Node);
    // for each of the node categories, specify which template to use
    templmap.add("begin", begin);
    templmap.add("end",   end);
    templmap.add("connector", connector);
    templmap.add("module", module);
    templmap.add("paragraph", paragraph);
    templmap.add("code", code);
    templmap.add("callStatic", callStatic);
    templmap.add("callDynamic", callDynamic);
    templmap.add("linkStatic",    linkStatic);
    templmap.add("linkDynamic",    linkDynamic);
    templmap.add("xctlStatic",    xctlStatic);
    templmap.add("xctlDynamic",    xctlDynamic);
    templmap.add("tranStatic",    tranStatic);
    templmap.add("tranDynamic",    tranDynamic);
    templmap.add("retStatic",    retStatic);
    templmap.add("retDynamic",    retDynamic);
    // for the default category, "", use the same template that Diagrams use by default;
    // this just shows the key value as a simple TextBlock
    templmap.add("", diagram.nodeTemplate);

    diagram.nodeTemplateMap = templmap;

//    var linkmap = new go.Map("string", go.Link);
//    diagram.linkTemplateMap =
    $scope.diagram = diagram;
}

function textBlockStyle() {
    return [
        {
            font: 'bold 11pt helvetica, bold arial, sans-serif',
            margin: 2,
            stroke: "white"
            ,editable: false,
            textAlign: 'center',
            _isNodeLabel: true
//            alignment: new go.Spot(0.5, 0.5, 0, 0)
        },
        new go.Binding('text', 'name')
    ];
}

function connectStyle() {
    return [
        {
            font: 'bold 11pt helvetica, bold arial, sans-serif',
            margin: 1,
            stroke: "white"
            ,editable: false,
            textAlign: 'center',
            _isNodeLabel: true
//            alignment: new go.Spot(0.5, 0.5, 0, 0)
        },
        new go.Binding('text', 'name')
    ];
}

function init() {

    diagram = initGraph("grafo");
    var nodeDataArray = [
//                { key: "Alpha", desc: "first letter", color: "green" },  // uses default category: ""
         { key:  1, name: "Inicio",    color: "lightblue", category: "begin" }
        ,{ key:  2, name: "Parrafo 1", color: "yellow",    category: "paragraph", isGroup: true }
        ,{ key:  3, name: "Parrafo 2", color: "yellow",    category: "paragraph", isGroup: true }
        ,{ key:  4, name: "Parrafo 3", color: "yellow",    category: "paragraph", isGroup: true }
        ,{ key: 99, name: "Final",     color: "red",       category: "begin" }
        ,{ key:  11, name: "Inicio",    color: "lightblue", category: "begin"    , group: 2}
        ,{ key:  12, name: "Parrafo 1", color: "yellow",    category: "paragraph", group: 2}
        ,{ key:  13, name: "Parrafo 2", color: "yellow",    category: "paragraph", group: 2}
        ,{ key:  14, name: "Parrafo 3", color: "yellow",    category: "paragraph", group: 2}
        ,{ key: 199, name: "Final",     color: "red",       category: "begin"    , group: 2}

    ];

    var linkDataArray = [
         { from: 1, to:  2, category: "link1" }
        ,{ from: 2, to:  3, category: "link1" }
        ,{ from: 3, to:  4, category: "link1" }
        ,{ from: 4, to:  2 , fromSpot: "Left", toSpot: "Left"}
        ,{ from: 4, to: 99, category: "link1" }
        ,{ from: 11, to:  12, category: "link1" }
        ,{ from: 12, to:  13, category: "link1" }
        ,{ from: 13, to:  14, category: "link1" }
        ,{ from: 13, to:    4, category: "link2" }
        ,{ from: 14, to:  12 , fromSpot: "Left", toSpot: "Left"}
        ,{ from: 14, to: 199 }

    ];


    var node2 = [
         { key:  11, name: "Inicio",    color: "lightblue", category: "begin"    , group: 101}
        ,{ key:  12, name: "Parrafo 1", color: "yellow",    category: "paragraph", group: 101}
        ,{ key:  13, name: "Parrafo 2", color: "yellow",    category: "paragraph", group: 101}
        ,{ key:  14, name: "Parrafo 3", color: "yellow",    category: "paragraph", group: 101}
        ,{ key: 199, name: "Final",     color: "red",       category: "begin"    , group: 101}
    ];

    var link2 = [
         { from: 11, to:  12, category: "link1" }
        ,{ from: 12, to:  13 }
        ,{ from: 13, to:  14 }
        ,{ from: 14, to:  12 , fromSpot: "Left", toSpot: "Left"}
        ,{ from: 14, to: 199 }
    ];
    diagram.model = new go.GraphLinksModel(nodeDataArray, linkDataArray);
    //diagram.startTransaction("make new group");
    //diagram.model.addNodeData(node2);
    //diagram.model.addLinkData(link2);
    //diagram.commitTransaction("make new group");

}

function initGraph(idDiv) {
    var $ = go.GraphObject.make;     // for conciseness in defining templates
    diagram = $(go.Diagram, idDiv,  // create a Diagram for the DIV HTML element
        {
            initialDocumentSpot: go.Spot.TopCenter,
            initialViewportSpot: go.Spot.TopCenter,
            initialAutoScale: go.Diagram.Uniform,
            layout: $(go.LayeredDigraphLayout,
                {
                    direction: 90
//                            , initialContentAlignment: go.Spot.Center
                })
        });

    // define the group template
    diagram.groupTemplate =
        $(go.Group, "Auto",
            { // define the group's internal layout
                layout: $(go.TreeLayout,
                    { angle: 90, arrangement: go.TreeLayout.ArrangementHorizontal, isRealtime: false }),
                // the group begins unexpanded;
                // upon expansion, a Diagram Listener will generate contents for the group
                isSubGraphExpanded: false,
                // when a group is expanded, if it contains no parts, generate a subGraph inside of it
                subGraphExpandedChanged: function(group) {
                    if (group.memberParts.count === 0) {
                        randomGroup(group.data.key);
                    }
                }
            },
            $(go.Shape, "Rectangle",
                { fill: null, stroke: "gray", strokeWidth: 2 }),
            $(go.Panel, "Vertical",
                { defaultAlignment: go.Spot.Left, margin: 4 },
                $(go.Panel, "Horizontal",
                    { defaultAlignment: go.Spot.Top },
                    // the SubGraphExpanderButton is a panel that functions as a button to expand or collapse the subGraph
                    $("SubGraphExpanderButton"),
                    $(go.TextBlock,
                        { font: "Bold 18px Sans-Serif", margin: 4 },
                        new go.Binding("text", "name"))
                ),
                // create a placeholder to represent the area where the contents of the group are
                $(go.Placeholder,
                    { padding: new go.Margin(0, 10) })
            )  // end Vertical Panel
        );  // end Group

    var begin =
        $(go.Node, "Auto",
            $(go.Shape, "Start", { fill: "black"   }),
            $(go.TextBlock, textBlockStyle())
        );
    var end =
        $(go.Node, "Auto",
            $(go.Shape, "Terminator", { fill: "white"  }),
            $(go.TextBlock, textBlockStyle())
        );

    var connector =
        $(go.Node, "Auto",
            $(go.Shape, "Circle",{ fill: "white" }),
            $(go.TextBlock, connectStyle())
        );
    var code =
        $(go.Node, "Auto",
            $(go.Shape, "RoundedRectangle", { fill: "blue" }),
            $(go.TextBlock, textBlockStyle())
        );
    var paragraph =
        $(go.Node, "Auto",
            $(go.Shape, "Rectangle",{ fill: "green" }),
            $(go.TextBlock, textBlockStyle())
        );
    var module =
        $(go.Node, "Auto",
            $(go.Shape, "Procedure", { fill: "yellow" }),
            $(go.TextBlock, textBlockStyle())
        );

    // Modulos
    var callStatic =
        $(go.Node, "Auto",
            $(go.Shape, "Procedure", { fill: "yellow" }),
            $(go.TextBlock, textBlockStyle())
        );

    var callDynamic =
        $(go.Node, "Auto",
            $(go.Shape, "Procedure", { fill: "yellow" }),
            $(go.TextBlock, textBlockStyle())
        );

    var modLink =
        $(go.Node, "Auto",
            $(go.Shape, "Procedure", { fill: "yellow" }),
            $(go.TextBlock, textBlockStyle())
        );

    var modXctl =
        $(go.Node, "Auto",
            $(go.Shape, "Procedure", { fill: "yellow" }),
            $(go.TextBlock, textBlockStyle())
        );

    var modTran =
        $(go.Node, "Auto",
            $(go.Shape, "Procedure", { fill: "yellow" }),
            $(go.TextBlock, textBlockStyle())
        );

    diagram.linkTemplate =
        $(go.Link,
            { routing: go.Link.AvoidsNodes,  // may be either Orthogonal or AvoidsNodes
                curve: go.Link.JumpOver },
            $(go.Shape),
            $(go.Shape, { toArrow: "Standard" })
        );

    var link2 =
        $(go.Link,
            { routing: go.Link.Orthogonal,  // may be either Orthogonal or AvoidsNodes
                curve: go.Link.JumpOver },
            $(go.Shape),
            $(go.Shape, { fromArrow: "Standard", toArrow: "Standard" })
        );

    // create the nodeTemplateMap, holding three node templates:
    var templmap = new go.Map("string", go.Node);
    // for each of the node categories, specify which template to use
    templmap.add("begin", begin);
    templmap.add("end",   end);
    templmap.add("connector", connector);
    templmap.add("module", module);
    templmap.add("paragraph", paragraph);
    templmap.add("code", code);
//    templmap.add("link1", link1);
//    templmap.add("link2", link2);
    diagram.l
//    templmap.add("group", group);
    // for the default category, "", use the same template that Diagrams use by default;
    // this just shows the key value as a simple TextBlock
    templmap.add("", diagram.nodeTemplate);

    diagram.nodeTemplateMap = templmap;

    return diagram;
}

function randomGroup(group) {
    diagram.startTransaction("addGroupContents");
    var node2 = [
         { key:  11, name: "Inicio",    color: "lightblue", category: "begin"    , group: group}
        ,{ key:  12, name: "Parrafo 1", color: "yellow",    category: "paragraph", group: group}
        ,{ key:  13, name: "Parrafo 2", color: "yellow",    category: "paragraph", group: group}
        ,{ key:  14, name: "Parrafo 3", color: "yellow",    category: "paragraph", group: group}
        ,{ key: 199, name: "Final",     color: "red",       category: "begin"    , group: group}
    ];

    var link2 = [
        { from: 11, to:  12 }
        ,{ from: 12, to:  13 }
        ,{ from: 13, to:  14 }
        ,{ from: 14, to:  12 , fromSpot: "Left", toSpot: "Left"}
        ,{ from: 14, to: 199 }
    ];
    diagram.model.addNodeData(node2);
    diagram.model.addLinkData(link2);
    diagram.commitTransaction("addGroupContents");

/*
    // all modification to the diagram is within this transaction

    var addedKeys = [];  // this will contain the keys of all nodes created
    var groupCount = 0;  // the number of groups in the diagram, to determine the numbers in the keys of new groups
    myDiagram.nodes.each(function(node) {
        if (node instanceof go.Group) groupCount++;
    });
    // create a random number of groups
    // ensure there are at least 10 groups in the diagram
    var groups = Math.floor(Math.random() * 2);
    if (groupCount < 10) groups += 1;
    for (var i = 0; i < groups; i++) {
        var name = "group" + (i + groupCount);
        myDiagram.model.addNodeData({ key: name, isGroup: true, group: group });
        addedKeys.push(name);
    }
    var nodes = Math.floor(Math.random() * 3) + 2;
    // create a random number of non-group nodes
    for (var i = 0; i < nodes; i++) {
        var color = go.Brush.randomColor();
        // make sure the color, which will be the node's key, is unique in the diagram before adding the new node
        if (myDiagram.findPartForKey(color) === null) {
            myDiagram.model.addNodeData({ key: color, group: group });
            addedKeys.push(color);
        }
    }
    // add at least one link from each node to another
    // this could result in clusters of nodes unreachable from each other, but no lone nodes
    var arr = [];
    for (var x in addedKeys) arr.push(addedKeys[x]);
    arr.sort(function (x, y) { return Math.random(2)-1; });
    for (var i = 0; i < arr.length; i++) {
        var from = Math.floor(Math.random() * (arr.length - i)) + i;
        if (from !== i) {
            myDiagram.model.addLinkData({ from: arr[from], to: arr[i] });
        }
    }
    myDiagram.commitTransaction("addGroupContents");
*/
}
