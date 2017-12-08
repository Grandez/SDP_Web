function admCtrl($rootScope, $scope , $http, $state, $cookies) {
    $scope.global = $rootScope;
    if ($scope.loaded == undefined) initSDPController();

    root = $scope.global;

    $scope.showPeriodCombo = function() {
        root.showPeriodLabel = 0;
    };

    $scope.changePeriodCombo = function(idPeriod) {
        root.showPeriodLabel = 1;
        root.periodId = idPeriod;
    };


    $scope.$on('ui.layout.resize', function(e, beforeContainer, afterContainer){
        $scope.sizeSplit = afterContainer.left;
    });

    function initSDPController() {
        $scope.nombre = "admCtrl";

        root = $scope.global
        root.nombre = "SDPADM";
        root.pageType = 0;

        root.showPeriodLabel = 1;
        root.periodLabel = "pending";

        if (root.sdp === undefined || root.sdp === null) {
            root.sdp = new SDP();
            loadAdminLabels($http, $scope, $state);
        }

        root.vertSplitter = { width: '100%'
            ,height: '100%'
            ,orientation: 'vertical'
            ,panels: [{ size: '500', min: 150 }, { min: 250}]
        };
        root.horzSplitter = { width: '100%'
            ,height: '100%'
            ,orientation: 'horizontal'
            ,panels: [{ size: '75%' }]
        };

        root.sizeSplit = 250;

        root.periodId = $cookies.get("periodId");
        if (root.periodId == undefined) {
            root.periodId = JCODES.PERIOD_ALL;
            $cookies.put("periodId", root.periodId);
        }

    }
}
