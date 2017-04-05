function sdpAdm ( $scope, $http, $compile, global, ngDialog) {
    var baseUrl = "http://localhost:8080/sdp/admin/"
    var adm = global;

//    sdpAjax($http, $scope, 'apptree', cargaArbol);
    var scope = $scope;

    $scope.nombre = "SDPADM";
    $scope.adm = $scope.adm || global;
    $scope.vista = $scope.adm.vista;

    $scope.getADM = function() { return $scope.adm; }

    $scope.modUser = function(uid) {$scope.showUser = !$scope.showUser; }
    $scope.submitUser = function(item, event) {
        var resp = $http.post(baseUrl + "saveUser", $scope.user);
        resp.success(function(dataFromServer, status, headers, config) {
            $scope.user = dataFromServer;
            if ($scope.user.errors == 0) {
                $scope.users.push(dataFromServer);
                $scope.hUser.close();
            }
        });
        resp.error(function(data, status, headers, config) {
            alert("Submitting form failed!");
        });
    }
    $scope.ventana = function (id) {
        $scope.adm.vista = id;
        $scope.vista = id;
/*
        switch(id) {
            case 2: if (adm.getUsuarios() == null) sdpAjaxAdmin($http, $scope, 'users', refreshUsers);
                    break;
            case 3: if (adm.getConfig() == null) {
                        sdpAjaxAdmin($http, $scope, 'config/label', refreshConfigLabel);
                        sdpAjaxAdmin($http, $scope, 'config',       refreshConfig);
                    }
                    break;

        }
*/
    }

}

