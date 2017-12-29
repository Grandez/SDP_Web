"use strict";

function SDP() {
    var module = null;

    function debugging() { return _debug; }

//    this.getModule      = function () { return module; }


}

SDP.prototype = {
      _arrMsg: null
    , _arrMsgLang: null
    , _curMsg: 0
    , _maxCache: 5  //Cache de modulos
    , _debug: false
    , _nodeId: -1  // Nodo activo
    , _nodeType: -1  // Tipo de nodo
    , _reqId:  0
    , _reqType: 0
    , _rango: 0

// Array de objetos para cache
    , _areas: []
    , _appls: []
    , _modules: []
    , _msgGroups: [false, false, false, false, false, false, false, false]

    ,getArea        : function() { return this._areas[0];   }
    ,getAppl        : function() { return this._appls[0];   }
    ,getModule      : function() { return this._modules[0]; }

    ,isLoadedMsgGroup:  function(idx) { return (_msgGroups[idx] == true); }
    ,setMsgGroupLoaded: function(idx) { _msgGroups[idx] = true; }
    ,_addObject: function (id, arr, obj) {
        if (arr.length == this._maxCache) arr.pop();
        arr.unshift(obj); // Lo pone al inicio
        obj.setId(id);
        return obj;
    }

    ,debugging: function() {  return this._debug; }
    ,setDebugging: function(d) {  this._debug = d; }
    ,setMessages: function (msg) {
        function _insertMsgTable(arr, msg) {
            for (i = 0; i < arr.length; i++) {
                if (msg.id == arr[i].id) return i;
            }
            arr.push(msg);
            return arr.length - 1;
         }
         if (this._arrMsg != null) {
            this._curMsg = _insertMsgTable(this._arrMsg, msg);
         } else {
            this._arrMsg = [msg];
            this._curMsg = 0;
         }
        return this._arrMsg[this._curMsg];
    }
    ,getMessages: function() { return this._arrMsg[this._curMsg]; }

    ,request: function (id, type) {
       this._reqId = id;
       this._reqType = type;
    }
    ,getRequestedType: function() { return this._reqType; }
    ,getRequestedId:   function() { return this._reqId;   }

    // Inserta un nuevo Area/App/Modulo en su sitio
    ,addArea:   function (id)  { return this._addObject(id, this._areas,   new Area());   }
    ,addApp:    function (id)  { return this._addObject(id, this._appls,   new Appl());   }
    ,addModule: function (id)  { return this._addObject(id, this._modules, new Module()); }

    ,setRango:  function(r)    { this._rango = r;    }
    ,getRango:  function()     { return this._rango; }
// Chequea si el modulo esta cargado o no
// Se debe invocar primero a request

// Cada objeto tiene un id diferente
// Se pregunta antes de cargar, asi que crea uno nuevo o lo deja activo
    ,needLoad: function () {

        switch (Math.floor(this._reqType / 10)) {
           case 0: return checkNodeLoaded(this._areas);
           case 1: return checkNodeLoaded(this._areas);
           case 2: return checkNodeLoaded(this._appls);
           case 4: return checkNodeLoaded(this._modules);
        }
        function checkNodeLoaded(table) {
           for (var i = 0; i < table.length; i++) {
               if (table.getId() == this._reqId) {
                   if (i != 0) swapItem(table, i);
                   return false;
               }
           }
           return true;
        }
        function swapItem(table, idx) {
            var aux = table[0];
            table[0] = table[idx];
            table[idx] = aux;
        }
    }

}
