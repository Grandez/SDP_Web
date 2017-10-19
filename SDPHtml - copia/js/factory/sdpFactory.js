/**
 * Factoria con los datos necesarios a todas las vistas
 *
 */

function globalFactory() {
    var sdpArea    = null;
    var sdpAppl    = null;
    var sdpModulo  = null;

    var activo     =   -1;   // Componente activo

    var tmpLog       = null;
    var tmpAlertas   = null;
    var tmpStats     = null;
    var tmpQuartiles = null;

    var putTempData = function putTempData(tgt) {
        if (tmpLog       != null) { tgt.setLog       (tmpLog);     }
        if (tmpAlertas   != null) { tgt.setAlertas   (tmpAlertas); }
        if (tmpStats     != null) { tgt.setStats     (tmpStats);   }
        if (tmpQuartiles != null) { tgt.setQuartiles (tmpQuartiles);   }
        tmpLog       = null;
        tmpAlertas   = null;
        tmpStats     = null;
        tmpQuartiles = null;
    };

    return {
         idNodo:    0   // Identificador del nodo actual
        ,tipoNodo:  0   // Tipo del nodo actual
        ,txtObject: ""  // Nombre del objeto para errores
        ,rango:     4   // Rango de fechas por defecto. Trimestre
        ,oldRango:  5   // Rango anterior
        ,mainErr:   0
        ,ordenSesiones: 0 // Orden del grafico de tiempos de las sesiones
        ,maxCC: 0
        ,maxStmt: 0
        ,maxCCParr: 0
        ,filterLog: [null, null, null, null]
        ,setArea:   function(idArea)   {sdpArea   = new Area(idArea);     putTempData(sdpArea);   return sdpArea;   }
        ,setAppl:   function(idAppl)   {sdpAppl   = new Area(idAppl);     putTempData(sdpAppl);   return sdpAppl;   }
//        ,setModulo: function(idModulo) {sdpModulo = new Modulo(idModulo); putTempData(sdpModulo); return sdpModulo; }
        ,setModulo: function(idModulo) {sdpModulo = new Modulo(idModulo); return sdpModulo; }
        ,setActivo: function(vista)    { activo = vista;  }

        ,getArea:   function()         {return sdpArea;   }
        ,getAppl:   function()         {return sdpAppl;   }
        ,getModulo: function()         {return sdpModulo; }
        ,getActivo: function()  {
            switch(activo) {
                case 1: return this.getArea();
                case 2: return this.getAppl();
                case 3: return this.getModulo();
            }
            return null;
        }
        ,setAlertas: function (alertas) {
            var tgt = this.getActivo();
            tmpAlertas = alertas;
            if (tgt != null) tgt.setAlertas(alertas);
        }
        ,setLog:    function(tgt, data) {
            var tgt = this.getActivo();
            tmpLog = data;
            if (tgt != null) tgt.setLog(data);
        }
        ,setQuartiles: function (datos) {
            var tgt = this.getActivo();
            tmpQuartiles = datos;
            if (tgt != null) tgt.setQuartiles(datos);
        }
        ,setStatsModulo: function (datos) {
            tmpStats = datos;
            if (sdpModulo != null) sdpModulo.stats = datos;
        }

    };
}

