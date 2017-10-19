// the 'layout' JSON array defines the internal structure of the layout
function layout($scope) {

    var layout2 = [
        {type : 'layoutGroup',
            orientation: "vertical",
            width: '100%',
            heigh: '100%',
            items: [
                {type: 'layoutPanel',
                    title: 'Panel1',
                    contentContainer: 'pnlLeft'
                },
                {  type: 'layoutPanel',
                    title: 'Panel2',
                    contentContainer: 'pnlRight'
                }]
                }
            ];



    var layout  = [{
        type: 'layoutGroup',
        orientation: 'horizontal',
        items: [{
            type: 'autoHideGroup',
            alignment: 'left',
            width: 80,
            unpinnedWidth: 200,
            items: [{
                type: 'layoutPanel',
                title: 'Toolbox',
                contentContainer: 'ToolboxPanel'
            }, {
                type: 'layoutPanel',
                title: 'Help',
                contentContainer: 'HelpPanel'
            }]
        }, {
            type: 'layoutGroup',
            orientation: 'vertical',
            width: 500,
            items: [{
                type: 'documentGroup',
                height: 400,
                minHeight: 200,
                items: [{
                    type: 'documentPanel',
                    title: 'Document 1',
                    contentContainer: 'Document1Panel'
                }, {
                    type: 'documentPanel',
                    title: 'Document 2',
                    contentContainer: 'Document2Panel'
                }]
            }, {
                type: 'tabbedGroup',
                height: 200,
                pinnedHeight: 30,
                items: [{
                    type: 'layoutPanel',
                    title: 'Error List',
                    contentContainer: 'ErrorListPanel'
                }, {
                    type: 'layoutPanel',
                    title: 'Output',
                    contentContainer: 'OutputPanel',
                    selected: true
                }]
            }]
        }, {
            type: 'tabbedGroup',
            width: 220,
            minWidth: 200,
            items: [{
                type: 'layoutPanel',
                title: 'Solution Explorer',
                contentContainer: 'SolutionExplorerPanel',
                initContent: function () {
                    // initialize a jqxTree inside the Solution Explorer Panel
                    var source = [{
                        icon: 'lib/jqwidgets/images/earth.png',
                        label: 'Project',
                        expanded: true,
                        items: [{
                            icon: 'lib/jqwidgets/images/folder.png',
                            label: 'css',
                            expanded: true,
                            items: [{
                                icon: 'lib/jqwidgets/images/nav1.png',
                                label: 'jqx.base.css'
                            }, {
                                icon: 'lib/jqwidgets/images/nav1.png',
                                label: 'jqx.energyblue.css'
                            }, {
                                icon: 'lib/jqwidgets/images/nav1.png',
                                label: 'jqx.orange.css'
                            }]
                        }, {
                            icon: 'lib/jqwidgets/images/folder.png',
                            label: 'scripts',
                            items: [{
                                icon: 'lib/jqwidgets/images/nav1.png',
                                label: 'jqxcore.js'
                            }, {
                                icon: 'lib/jqwidgets/images/nav1.png',
                                label: 'jqxdata.js'
                            }, {
                                icon: 'lib/jqwidgets/images/nav1.png',
                                label: 'jqxgrid.js'
                            }]
                        }, {
                            icon: 'lib/jqwidgets/images/nav1.png',
                            label: 'index.htm'
                        }]
                    }];

                    $('#solutionExplorerTree').jqxTree({ source: source, width: 190 });
                }
            }, {
                type: 'layoutPanel',
                title: 'Properties',
                contentContainer: 'PropertiesPanel'
            }]
        }]
    }];
    return layout;
}
