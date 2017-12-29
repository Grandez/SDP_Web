
function Module() {

}

Module.prototype = {
      id: null
    , load:{"code": false}
    ,_arrMsg: null
    , _arrMsgLang: null
    , _curMsg: 0
    , _maxCache: 5  //Cache de modulos
    , _debug: true
    , _nodeId: -1  // Nodo activo
    , _nodeType: -1  // Tipo de nodo
    , _reqId: 0
    , _reqType: 0
    , _rango: 0
    ,setId: function(idModule) { this.id = idModule; }
    ,isLoaded:  function(component) { return this.load[component];     }
    ,setLoaded: function(component) { this.load[component] = true;     }
}
/*
        reqId = id;
        reqType = type;
        switch (type) {
            case 0: return checkNodeLoaded(id, areas);
            case 1: return checkNodeLoaded(id, appls);
            case 2: return checkNodeLoaded(id, modules);
        }
    }

    function checkNodeLoaded(id, table) {
        for (i = 0; i < table.length; i++) {
            if (table.getId() == id) return false;
        }
        return true;
    }
}
*/
/**
 * Define los ojetos manejados en la aplicacion
 */

/*
 * Una area y una aplicacion son tecnicamente iguales
 * pero funcionalmente diferentes
 */
/*
function Area(idArea) {
    var id      = idArea;
    var log     = null;
    var alertas = null;
    var stats   = null;
    var nombre  = null;
    var hijos   = null;
    var stats   = null;
    var quartiles = null;
    var exist   = false;
    return {
        getId:        function() {return id;        }
        ,getLog:       function() {return log;       }
        ,getHijos:     function() {return hijos;     }
        ,getQuartiles: function() {return quartiles; }

        ,setData: function (data) { nombre = data.nombre;
            exist = data.exist;
            hijos = data.hijos;
            stats = data.stats;
        }
        ,setAlertas:   function(a) { alertas = a; }
        ,setLog:       function(l) { log = l;  }
        ,setQuartiles: function(q) { quartiles = q;}
    }
}
*/

/* Informacion de resumen del modulo  */
/*
function Resumen() {
    this.nombre = null;
    this.lineas = 0;
    this.sentencias = 0;
    this.parrafos = 0;
    this.lastCompile = null;
    this.uid = null;
}
*/
/* caracteristicas  */
/*
function Attrs() {
    this.completo = false;
    this.cics = false;
    this.sgdb = false;
    this.file = false;
    this.call = false;
}
*/
/* Resumen dependencias */
/*
function DepSummary() {
    this.files = 0;
    this.copys = 0;
    this.link  = 0;
    this.code  = 0;
    this.call  = 0;
    this.callAll = 0;
}
*/
/* Estadisticas */
/*
function Stats() {
    this.ejecuciones  = 0;
    this.elapsedTime  = 0;
    this.elapsedMin   = 0;
    this.elapsedMax   = 0;
    this.cpuTime      = 0;
    this.cpuMin       = 0;
    this.cpuMax       = 0;
    this.input        = 0;
    this.output       = 0;
    this.ioTotal      = 0;
    this.arbolModulos = null;
    this.arbolRutinas = null;
    this.arbolDepth   = null;
}

function Rutina() {
    this.nombre = null;
    this.tipo = 0;
    this.subtipo = 0;
    this.estado = 0;
    this.desc = "";
}

function Modulo(idModulo) {

    this.id       = idModulo;
    this.version  = null;
    this.nombre   = null;

    this.loading  = true;
    this.status   = 0;

    this.resumen    = new Resumen();
    this.attrs      = new Attrs();
    this.depSummary = new DepSummary();
    this.stats      = new Stats();

    this.sesiones = [];
    this.sesionesName = [];
    this.deps = [];
    this.issues   = [];

    this.log      = null;
    this.alertas  = null;
    this.codigo   = null;
    this.arbol    = null;
    this.copys    = null;
    this.rutinas  = null;
    this.resumen  = null;
    this.usoParrafos = null;


    this.setData = function(d) {
        this.id       = d.idModulo;
        this.version  = d.idVersion;
        this.nombre   = d.nombre;
        this.resumen  = d.resumen;
        this.attrs    = d.attrs;


    }
    this.setStats = function(d) {
        this.stats       = d;
    }
*/
    /*
     return {

     getId:       function()  {return id;       }
     ,getVersion:  function()  {return version;  }
     ,getNombre:   function()  {return nombre;   }
     ,getLog:      function()  {return log;      }
     ,getSesiones: function()  {return sesiones; }
     ,getSesionesName: function()  {return sesionesName; }
     ,getCodigo:   function()  {return codigo;   }
     ,getStats:    function()  {return stats;    }
     ,getArbol:    function()  {return arbol;    }
     ,getCopys:    function()  {return copys;    }
     ,getRutinas:  function()  {return rutinas;  }
     ,getResumen:  function()  {return resumen;  }
     ,getParrafos: function()  {return parrafos; }
     ,getUsoParrafos: function() {return usoParrafos; }
     ,getIssues:      function() {return issues;      }

     ,setId:       function(d) {id = d;       }
     ,setVersion:  function(d) {version = d;  }
     ,setNombre:   function(d) {nombre = d;   }
     ,setCodigo:   function(c) {codigo = c;   }
     ,setArbol:    function(a) {arbol = a;    }
     ,setCopys:    function(c) {copys = c;    }
     ,setRutinas:  function(r) {rutinas = r;  }
     ,setResumen:  function(r) {resumen = r;  }
     ,setLog:      function(l) {log = l;      }
     ,setStats:    function(s) {stats = s;    }
     ,setAlertas:  function(a) {alertas = a;  }
     ,setUsoParrafos: function(u) {usoParrafos = u; }
     ,setQuartiles:   function(q) {}
     ,setIssues:      function(i) { issues = i;     }
     ,setData:     function(d) {
     id       = d.idModulo;
     version  = d.idVersion;
     nombre   = d.nombre;
     resumen  = d.resumen;
     parrafos = d.parrafos;
     }
     }*/
// }
