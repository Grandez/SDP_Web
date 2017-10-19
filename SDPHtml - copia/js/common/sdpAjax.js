function sdpAjax($http , $scope, sdpUrl , sdpVar) {

    if (sdpUrl.toString().match("tree")) {
        data = datTree;
    } else if (sdpUrl.toString().match("messages")) {
        data = lstMsg;
    }  else {
        return
    }
    if (angular.isFunction(sdpVar)) {
        sdpVar($scope, data);
    }
    else {
        $scope[sdpVar] = data;
    }
    return;

    var fullUrl = "http://localhost:8080/sdp/" + sdpUrl;
   console.log("BEG: " + new Date() + " - " + sdpUrl);
   $http.get(fullUrl)
      .success(function (data, status, headers, config) {
          if (angular.isFunction(sdpVar)) {
             sdpVar($scope, data);
          }
          else {
          $scope[sdpVar] = data;
       }
      })
      .error(function(data, status, headers, config) {
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

function sdpAjaxAdmin($http , $scope, sdpUrl , sdpVar) {

    var fullUrl = "http://localhost:8080/sdp/admin/" + sdpUrl;

    $http.get(fullUrl)
        .success(function (data, status, headers, config) {
            if (angular.isFunction(sdpVar)) {
                sdpVar($scope, data);
            }
            else {
                $scope[sdpVar] = data;
            }
        })
        .error(function(data, status, headers, config) {
            if (status == undefined) {
                if (config.headers.status == 0) {
                    $scope.global.mainErr = 1;
                }
            }
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

