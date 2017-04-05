function resumenCtrl ($scope, $http, $compile) {
    $scope.nombre = "RESUMEN";
    $scope.winCopys = function(htmlView) {
        var cadena = "<div data-ng-include='windows/copys.htm'></div>";
        var compiled = $compile(cadena);
        compiled($scope);
        $scope.winCopy = $.jsPanel({
            id: 'winCopy'
            ,content: cadena
            ,controls: {maximize: 'disable' }
            ,resizable: "disabled"
            ,addClass: {
                header: "panel-heading"
//            content: "custonContentClass",
//            footer: "custonFooterClass"
            }
            ,size: {
                width: function(){ return $(window).width()/3 },
                height: 200
            }
            ,selector: '#moduloTop'
            ,title:    "Copys"
            ,position: { top: 'center', right: 'center' }
            ,theme:    'primary'
        });

    }

    $scope.winSentencias = function(htmlView) {
//        var cadena = "<div data-ng-include=" + '"' + "'windows/fechas.htm'" + '">Pepe</div>'
        var xx = angular.element('#divSentencias');
        //compile the view into a function.
        compiled = $compile(xx);

        //append our view to the element of the directive.
//        elem.append(el);

        //bind our view to the scope!
        //(try commenting out this line to see what happens!)
        compiled($scope);
        $scope.winResumen = $.jsPanel({
            id: 'winSentencias'
            ,content: xx
            ,controls: {maximize: 'disable' }
            ,resizable: "disabled"
            ,addClass: {
                header: "panel-heading"
//            content: "custonContentClass",
//            footer: "custonFooterClass"
            }
           ,size: {
              width: function(){ return $(window).width()/3 },
              height: 200
            }
            ,selector: '#moduloTop'
            ,title:    "Sentencias"
            ,position: { top: 'center', right: 'center' }
            ,theme:    'primary'
        });
    }
    $scope.ventana = function (tipoVentana) {
        showWindow(tipoVentana, $http, $scope, $compile);
        vista = (tipoVentana == 2) ? 3 : 1;
        $scope.cambiaPieModulo(vista);
    }

}

