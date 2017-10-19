function Area() {
}

Area.prototype = {
     id: -1
    ,alertas: null
    ,stats: null

    ,setId:      function (id) { this.id = id;   }
    ,getId:      function ( )  { return this.id; }
    ,setAlertas: function (data) { this.alertas = data; }
    ,getAlertas: function (    ) { return this.alertas; }
    ,setStats:   function (data) { this.stats = data; }
    ,getStats:   function (    ) { return this.stats; }

}
