function sdpShinyAjax($http , $scope, $state, sdpUrl , sdpVar) {
    sdpUrl("http://192.168.1.110:3838/" + sdpUrl , sdpVar);
}

function sdpAdminAjax($http , $scope, $state, sdpUrl , sdpVar) {
    sdpAjax2($http , $scope, $state, "admin/" + sdpUrl , sdpVar, getSDPAdmin($scope));
}

function sdpAjax($http , $scope, $state, sdpUrl , sdpVar) {
    sdpAjax2($http, $scope, $state, sdpUrl, sdpVar, getSDP($scope));
}

function sdpAjax2($http , $scope, $state, sdpUrl , sdpVar, sdp) {
    console.log("BEG Ajax : " + new Date() + " - " + sdpUrl);

    var data = null;

    deb = sdp.debugging();

    sdp.debugging() ? ajaxData() :
        ajaxUrl($scope, "http://localhost:8080/SDPWebAdmin/" + sdpUrl);
    if (sdp.debugging()) {
        if (angular.isFunction(sdpVar)) {
            sdpVar($scope, $state, data);
        }
        else {
            $scope[sdpVar] = data;
        }
    }
    sdp.setDebugging(deb);
    console.log("END: " + new Date() + " - " + sdpUrl);

    function ajaxData() {
        data = getTestData(sdpUrl);
    }

    function ajaxUrl($scope, fullUrl) {
        console.log("BEG: " + new Date() + " - " + fullUrl);
        $http({
            method: 'get',
            url: fullUrl
        }).then(function (response) {
            data = response.data;
            if (angular.isFunction(sdpVar)) {
                sdpVar($scope, $state, data);
            }
            else {
                $scope[sdpVar] = data;
            }
        }, function (error) {
            console.log(error, error.data);
        });
    }

    /*
     $http.get(fullUrl)
     .success(function (data, status, headers, config) {
     if (angular.isFunction(sdpVar)) {
     sdpVar($scope, $state, data);
     }
     else {
     $scope[sdpVar] = data;
     }
     })
     .error(function (data, status, headers, config) {
     if (status == undefined) {
     if (config.headers.status == 0) {
     $scope.global.mainErr = 1;
     }
     }
     else if (status == 401) {
     window.location = "/maqueta/login.html?redirectUrl=/" // + Base64.encode(document.URL);
     //               $window.location.href = '/login.html';
     //               $location.path('/login').search('returnTo', $location.path());
     }
     console.log("error en llamada ajax");
     // called asynchronously if an error occurs
     // or server returns response with an error status.
     });
     }
     */

}

function sdpAjaxEx($http , $scope, $compile, sdpUrl , sdpVar) {

    var fullUrl = "http://localhost:8080/sdp/" + sdpUrl;
    console.log("BEG: " + new Date() + " - " + sdpUrl);
    $http.get(fullUrl)
        .success(function (data, status, headers, config) {
            if (angular.isFunction(sdpVar)) {
                sdpVar($scope, $compile, data);
            }
            else {
                $scope[sdpVar] = data;
            }
        })
        .error(function(data, status, headers, config) {
            console.log("error en llamada ajax");
            serverError();
        });
}


function sdpAjaxLog($http , $scope, base) {

    var sdp = getSDP($scope);
    var prfx = "?"
    var fullUrl = base;
    for (var idx = 0; idx < 4; idx++) {
        if (sdp.filterLog[idx] != null) {
            switch(idx) {
                case 0: fullUrl += prfx + "idMsg="  + sdp.filterLog[idx]; prfx = "&"; break
                case 1: fullUrl += prfx + "object=" + sdp.filterLog[idx]; prfx = "&"; break
                case 2: fullUrl += prfx + "tms="    + sdp.filterLog[idx]; prfx = "&"; break
                case 3: fullUrl += prfx + "uid="    + sdp.filterLog[idx]; prfx = "&"; break
            }
        }
    }
    sdpAjax($http, $scope, fullUrl , refreshLog);
}

