/**
 * Factoria con los datos de administracion
 *
 */

function sdpFactoryAdmin() {
    var usuarios    = null;
    var config      = null;
    return {
        orden:    [0, 0, 0, 0, 0]
       ,cfgLabels: null
       ,showUser: false
       ,vista: 4

       ,setUsuarios: function(data) {usuarios = data;   }
       ,setConfig:   function(data) {config   = data;   }

       ,getUsuarios: function()     {return usuarios;   }
       ,getConfig:   function()     { return config; }
       ,getUsuario:  function(uid)  { for (var idx = 0; idx < usuarios.length; idx++) {
                                           if (usuarios[idx].uid == uid) return usuarios[idx];
                                      }
                                    }

    };
}

