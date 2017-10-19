function EditCtrl($scope, item, dialog){

    $scope.item = item;

    $scope.save = function() {
        dialog.close($scope.item);
    };

    $scope.close = function(){
        dialog.close(undefined);
    };
}
