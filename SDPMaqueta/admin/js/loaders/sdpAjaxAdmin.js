function sdpAjaxAdmin($http , $scope, $state, sdpUrl , sdpVar) {
    console.log("BEG Ajax : " + new Date() + " - " + sdpUrl);

    $scope.http = $http;

    var data = null;
    var fullUrl = "http://localhost:8080/SDPWebAdmin/" + sdpUrl;

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

    console.log("END: " + new Date() + " - " + sdpUrl);
}

