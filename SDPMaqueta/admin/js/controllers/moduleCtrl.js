function moduleCtrl ($rootScope, $scope, $http, $state) {
    $scope.global = $rootScope;

    if ($scope.loaded == undefined) initModuleCtrl();
    console.log("Entra en el controlador " + $scope.nombre);

    root = $scope.global;
    root.pageType = 3;

//    $scope.theme = "shinyblack";

    sdp = getSDP($scope);
    if (sdp.needLoad()) loader($scope, $http, $state, sdp);

    $scope.moduleSplitter = { width: '100%', height: '900', orientation: 'vertical'
        ,panels: [{ size: '10%', min: 150 }, { size: '90%', min: 250}] };

    $scope.getIframeSrc = function (name) {
        var baseUrl = "http://192.168.1.110:3838/R/master";

        url = baseUrl + "?" + "src=" + name + "&"  + "id=" + $scope.node.id;
        /*
        qs = [];
        qs.push("src");
        qs.push(name);
        qs.push("id");
        qs.push($scope.node.id);

        parms = qs.map(function(name, value) {
            return encodeURIComponent(name) + "=" +
                encodeURIComponent(value);
        }).join("&");

            // `baseUrl` isn't exposed to a user's control, so we don't have to worry about escaping it.
            return baseUrl + "?" + parms;
        */
        return url;
    }
    $scope.codeStyle = function (codigo) {
        var estilo = "codigo";
        switch(codigo.tipo) {
            case 1:  estilo += ", comment "; break;
            case 2:  estilo += ", parrafo "; break;
            default: estilo += ", normal ";
        }
        if (codigo.usado == 1) {
            if (codigo.tipo == 3) estilo += ", usado";
        }

        if (codigo.malo == true) {
            estilo += ", malo";
        }

        for (var idx = 0; idx < codigo.issues.length ; idx++) {

            switch (codigo.issues[idx]) {
                case 1001: estilo += ", unused"  ; break;
                case 1004: estilo += ", escrito" ; break;
            }
        }

        return estilo;
    };

    $scope.styleApplyIssues = function(issue) {
        node = getNode($scope);
        rot = 90 * (node.issues[issue].delta / 100);
        rot = rot * -1;

        st = "filter: progid: DXImageTransform.Microsoft.BasicImage(rotation=0.5);";
        st = st + "-webkit-transform: rotate(" + rot + "deg);";
        st = st + "-moz-transform: rotate(" + rot + "deg);";
        st = st + "-ms-transform: rotate(" + rot + "deg);";
        st = st + "-o-transform: rotate(" + rot + "deg);";
        st = st + "transform: rotate(" + rot + "deg);";
        st = st + "display: inline-block;";
        if (st > 0) {
            st = st + "color: green;";
        } else if (st < 0) {
            st = st + "color: red;";
        } else {
            st = st + "color: yellow;";
        }
        return st;
    };

    function initModuleCtrl() {
        $scope.loaded = true;
        $scope.nombre = "moduleCtrl";
        $scope.sdp = getSDP($scope);
        loadLabels(3, $http, $scope, $state);
    }
}

