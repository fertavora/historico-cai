app.factory('dataService', function($http, $location){
    // var urlPrefix = "http://"+$location.host() + ":" + $location.port();
    var urlPrefix = "http://localhost:3001";
    // var urlPrefix = "http://historial-cai-api.herokuapp.com";


    return{
        getEquiposOptions: function(response, error){
          $http.get(urlPrefix + "/api/equipos")
              .then(response, error);
        },
    
        getCurrentTorneosOptions: function(response, error){
          $http.get(urlPrefix + "/api/torneos-instancias?torneos_instancias_anio=2016")
              .then(response, error);
        },
    
        getArbitrosOptions: function(response, error){
          $http.get(urlPrefix + "/api/arbitros")
              .then(response, error);
        },
    
        getCurrentTecnico: function(response, error){
          $http.get(urlPrefix + "/api/tecnicos")
              .then(response, error);
        },

        getAllTecnicos: function(response, error){
            $http.get(urlPrefix + "/api/tecnicos")
                .then(response, error);
        },
    
        savePartido: function(response, error, data){
          $http.post(urlPrefix + "/api/partidos", data)
            .then(response, error);
        },
    
        getPartidosHome: function(response, error){
          $http.get(urlPrefix + "/api/partidos?limit=30")
              .then(response, error);
        },
    
        getTorneosOptions: function(response, error, data){
          $http.get(urlPrefix + "/api/torneos")
              .then(response, error);
        },
    
        saveTorneoInstancia: function(response, error, data){
          $http.post(urlPrefix + "/api/torneos-instancias", data)
            .then(response, error);
        },
    
        saveTorneo: function(response, error, data){
          $http.post(urlPrefix + "/api/torneos", data)
            .then(response, error);
        },
    
        saveEquipo: function(response, error, data){
          $http.post(urlPrefix + "/api/equipos", data)
            .then(response, error);
        },
    
        getPaises: function(response, error, data){
          $http.get(urlPrefix + "/api/paises")
            .then(response, error);
        },
    
        getProvincias: function(response, error, data){
          $http.get(urlPrefix + "/api/provincias")
            .then(response, error);
        },
    
        getCiudades: function(response, error, data){
          $http.get(urlPrefix + "/api/ciudades")
            .then(response, error);
        },
    
        saveArbitro: function(response, error, data){
          $http.post(urlPrefix + "/api/arbitros", data)
            .then(response, error);
        },
    
        saveTecnico: function(response, error, data){
          $http.post(urlPrefix + "/api/tecnicos", data)
            .then(response, error);
        },
    
        historialEquipo: function(response, error, data){
          $http.post(urlPrefix + "/api/historial-equipo", data)
            .then(response, error);
        },
    
        historialTorneo: function(response, error, data){
          $http.post(urlPrefix + "/api/historial-torneo", data)
            .then(response, error);
        },
    
        getTorneosTodos: function(response, error){
          $http.get(urlPrefix + "/api/torneos-instancias")
              .then(response, error);
        }
    }
});
