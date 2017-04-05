function Usuario(data) {
    var usuarios = data;
    return {
        getUsuarios:  function ()    { return usuarios;  }
       ,setUsuarios: function (data) { usuarios = data; }
    }
}

function User() {
    return {
        uid: null
       ,nuevo: true
       ,nombre: null
       ,apellido: null
       ,alta: null
       ,baja: null
       ,pwd: null
       ,correo: null
       ,rol: 0
       ,errors: 0
       ,tbErr: [0, 0, 0, 0, 0, 0, 0, 0, 0, 0]
       ,msgErr:""
    }
}
function Config() {
    return {
         id: 0
        ,clave: ""
        ,valor: ""
        ,grupo: null
        ,tipo: 0
        ,chg: 0
    }
}
