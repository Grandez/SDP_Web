function configCtrl ($rootScope, $scope, $http, $state, $window) {

    $scope.global = $rootScope;
    root = $scope.global;
    if ($scope.loaded == undefined) initConfigCtrl();
    console.log("Entra en el controlador " + $scope.nombre);

    root.pageType = 2;

    getRootScope($scope).pageType = 2;

    $scope.tabSelected = function (tab) {
        var idDiv = "div#cfgGrid";
        var arbol = angular.element($(idDiv));
        var data = [];
        var items = $scope.items;
        if (tab == -1) {
            data = items;
        }
        else {
           for (var idx = 0; idx < items.length; idx++) {
               if (items[idx].data.grupo == tab.id) {
                   data.push(items[idx]);
               }
           }
        }
        arbol.jstree(true).settings.core.data = data;
        arbol.jstree(true).refresh();
        //Broadcast or emit your event here.
        console.log(caller);
    };

    function initConfigCtrl() {
        $scope.loaded = true;
        $scope.nombre = "configCtrl";
        $scope.sdp = getSDP($scope);
//        loadLabels(2, $http, $scope, $state);
        sdpAjax($http, $scope, $state, 'configuration', cargaConfiguration);
    }

}
