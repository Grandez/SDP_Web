

function SDPADM() {
    var sdpadm = null;

    function debugging() { return _debug; }

//    this.getModule      = function () { return module; }
    return this;
}




SDPADM.prototype = {
    _arrMsg: null
    , _arrMsgLang: null
    , _curMsg: 0
    , config: null  // Connfguracion de la base de datos
    , _debug: false
    , _rulesDetail: []
    ,setConfiguration: function(cfg) {
        config = cfg;
        this.config = cfg;
    }

    ,getConfiguration: function() { return this._config;   }

    ,_addObject: function (id, arr, obj) {
        if (arr.length == this._maxCache) arr.pop();
        arr.unshift(obj);
        obj.setId(id);
        return obj;
    }

    ,getRuleDetail:  function(key) {
        try {
            return this._rulesDetail[key];
        } catch (e) {
            return null;
        }
    }
    ,setRuleDetail: function(key, value) {
        this._rulesDetail[key] = value;
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

        switch (this._reqType / 10) {
            case 0: return checkNodeLoaded(this._areas);
            case 1: return checkNodeLoaded(this._areas);
            case 2: return checkNodeLoaded(this._appls);
            case 4: return checkNodeLoaded(this._modules);
        }
        function checkNodeLoaded(table) {
            for (i = 0; i < table.length; i++) {
                if (table.getId() == this._reqId) return false;
            }
            return true;
        }
    }

}

