app.factory('dataService', function($http, $location){
var urlPrefix = "http://"+$location.host() + ":" + $location.port();
 return{
    getEquiposOptions: function(response, error){
      $http.get(urlPrefix + "/node/equipos")
          .then(response, error);
    },

    getCurrentTorneosOptions: function(response, error){
      $http.get(urlPrefix + "/node/torneos")
          .then(response, error);
    },

    getArbitrosOptions: function(response, error){
      $http.get(urlPrefix + "/node/arbitros")
          .then(response, error);
    },

    getCurrentTecnico: function(response, error){
      $http.get(urlPrefix + "/node/tecnicos")
          .then(response, error);
    },

    savePartido: function(response, error, data){
      $http.post(urlPrefix + "/node/guardar-partido", data)
        .then(response, error);
    },

    getPartidosHome: function(response, error, data){
      $http.get(urlPrefix + "/node/partidos-home")
          .then(response, error);
    },

    getTorneosOptions: function(response, error, data){
      $http.get(urlPrefix + "/node/tipoTorneos")
          .then(response, error);
    },

    saveTorneoInstancia: function(response, error, data){
      $http.post(urlPrefix + "/node/guardar-torneoInstancia", data)
        .then(response, error);
    },

    saveTorneo: function(response, error, data){
      $http.post(urlPrefix + "/node/guardar-torneo", data)
        .then(response, error);
    },

    saveEquipo: function(response, error, data){
      $http.post(urlPrefix + "/node/guardar-equipo", data)
        .then(response, error);
    },

    getPaises: function(response, error, data){
      $http.get(urlPrefix + "/node/paises")
        .then(response, error);
    },

    getProvincias: function(response, error, data){
      $http.get(urlPrefix + "/node/provincias")
        .then(response, error);
    },

    getCiudades: function(response, error, data){
      $http.get(urlPrefix + "/node/ciudades")
        .then(response, error);
    },

    saveArbitro: function(response, error, data){
      $http.post(urlPrefix + "/node/guardar-arbitro", data)
        .then(response, error);
    },

    saveTecnico: function(response, error, data){
      $http.post(urlPrefix + "/node/guardar-tecnico", data)
        .then(response, error);
    },

    historialEquipo: function(response, error, data){
      $http.post(urlPrefix + "/node/historial-equipo", data)
        .then(response, error);
    },

    historialTorneo: function(response, error, data){
      $http.post(urlPrefix + "/node/historial-torneo", data)
        .then(response, error);
    },

    getTorneosTodos: function(response, error){
      $http.get(urlPrefix + "/node/torneos-todos")
          .then(response, error);
    }
  }
});
