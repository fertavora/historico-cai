/*
This files runs the 'server' that hosts the nodejs app.
  Run:
    node init

  Go to http://localhost:3000
*/

var express = require('express');
var mysql = require('mysql');
var bodyParser = require('body-parser');
var app = express();
var connection;

var dbProd = {
  host     : 'historicocai.db.8518296.hostedresource.com',
  user     : 'historicocai',
  password : 'HistoCai!666',
  database : 'historicocai'
};

var dbLocal = {
  host     : 'localhost',
  user     : 'root',
  password : 'Joaquin!01',
  database : 'historicocai_dev'
};

var databaseConnect = function(){
  connection = mysql.createConnection(dbProd);

  connection.connect(function(err) {
      if(err) {
        console.log('error when connecting to db:', err);
        setTimeout(databaseConnect, 2000);
      }else{
        console.log('db connected!');
      }
    });

  connection.on('error', function(err) {
      console.log('db error', err);
      if(err.code === 'PROTOCOL_CONNECTION_LOST') {
        console.log('reconnecting...');
        databaseConnect();
      } else {
        throw err;
    }
  });
};

app.use(bodyParser.json()); // for parsing application/json
app.use('/', express.static('./app'));
databaseConnect();
//this is url with params example
app.get('/node/partidos/:id', function(req, res){
  res.status(200).send(req.params.id);
});

app.post('/node/guardar-torneoInstancia', function(req, res){
  // databaseConnect();
  connection.query("select max(torneos_instancias_id) as id from torneos_instancias;", function(err, rows, fields){
    if (!err){
      var torneos_instancias_id = rows[0].id+1;
      var torneos_instancias_nombre = req.body.nombre;
      var torneos_instancias_anio = req.body.anio;
      var torneos_id = req.body.torneo.torneos_id;
      var torneos_instancias_ubicacion = null;
      var toSave = {torneos_instancias_id: torneos_instancias_id,
                    torneos_instancias_nombre: torneos_instancias_nombre,
                    torneos_id: torneos_id,
                    torneos_instancias_anio: torneos_instancias_anio,
                    torneos_instancias_ubicacion: torneos_instancias_ubicacion}

      connection.query("INSERT INTO torneos_instancias SET ? ", toSave, function(err, result){
        if(!err){
          res.json("{'status': 'ok'}");
        }else{
          res.status(500).send('Error while performing Query.');
        }
      });
    }else{
        res.status(500).send('Error while performing Query.');
    }
  });
});

app.post('/node/guardar-equipo', function(req, res){
  connection.query("select max(equipos_id) as id from equipos", function(err, rows, fields){
    if(!err){
      var equipos_id = rows[0].id+1;
      var equipos_nombre = req.body.nombre;
      var equipos_fecha = req.body.fecha;
      var equipos_estadio = req.body.estadio;
      var equipos_escudo = req.body.escudo;
      var ciudades_id = req.body.ciudad.ciudades_id;
      var provincia_id = req.body.provincia.provincia_id;
      var paises_id = req.body.pais.paises_id;

      var toSave = {equipos_id: equipos_id,
                    equipos_nombre: equipos_nombre,
                    equipos_fecha: equipos_fecha,
                    equipos_estadio: equipos_estadio,
                    equipos_escudo: equipos_escudo,
                    ciudades_id: ciudades_id,
                    provincia_id: provincia_id,
                    paises_id: paises_id};

      connection.query("INSERT INTO equipos SET ?", toSave, function(err, result){
        if(!err){
          res.json("{'status': 'ok'}");
        }else{
          res.status(500).send('Error while performing Query.');
        }
      });
    }else{
      res.status(500).send('Error while performing Query.');
    }
  });
});

app.post('/node/guardar-torneo', function(req, res){
  // databaseConnect();
  connection.query("select max(torneos_id) as id from torneos;", function(err, rows, fields){
    if (!err){
      var torneos_id = rows[0].id+1;
      var torneos_nombre = req.body.nombre;
      var torneos_tipo = req.body.tipo;

      var toSave = {torneos_id: torneos_id,
                    torneos_nombre: torneos_nombre,
                    torneos_tipo: torneos_tipo}

      connection.query("INSERT INTO torneos SET ? ", toSave, function(err, result){
        if(!err){
          res.json("{'status': 'ok'}");
        }else{
          res.status(500).send('Error while performing Query.');
        }
      });
    }else{
        res.status(500).send('Error while performing Query.');
    }
  });
});


app.post('/node/guardar-partido', function(req, res){
//get max partidos_id and add 1
  connection.query("select max(partidos_id) as id from partidos;", function(err, rows, fields){
    if (!err){
      var partidos_id = rows[0].id+1;
      var equipos_id = req.body.equipo.equipos_id;
      var ti_id = req.body.torneo.torneos_instancias_id;
      var tecnico = req.body.tecnico.personas_id;
      var partidos_dia = req.body.dia;
      var partidos_instancia = req.body.instancia;
      var partidos_condicion = req.body.condicion;
      var goles_cai = req.body.golescai;
      var goles_rival = req.body.golesrival;
      var penales = null;
      var observaciones = null;
      var arbitro = req.body.arbitro.personas_id;

      var toSave = {partidos_id: partidos_id,
                    equipos_id: equipos_id,
                    torneos_instancias_id: ti_id,
                    personas_id: tecnico,
                    partidos_dia: partidos_dia,
                    partidos_instancia: partidos_instancia,
                    partidos_condicion: partidos_condicion,
                    partidos_goles_cai: goles_cai,
                    partidos_goles_rival: goles_rival,
                    partidos_penales: penales,
                    partidos_observaciones: observaciones,
                    arbitros_id: arbitro}

      connection.query("INSERT INTO partidos SET ? ", toSave, function(err, result){
        if(!err){
          res.json("{'status': 'ok'}");
        }else{
          res.status(500).send('Error while performing Query.');
        }
      });

    }else{
        res.status(500).send('Error while performing Query.');
    }

    });
});


//this is to get the tecnicos options for the <select>
app.get('/node/tecnicos', function(req, res){
  // databaseConnect();
  connection.query("SELECT p.personas_id, p.personas_nombre, p.personas_apellido from personas as p inner join tecnicos on p.personas_id = tecnicos.personas_id where tecnicos.tecnicos_activo = 1 order by p.personas_apellido asc;", function(err, rows, fields) {
    if (!err){
      res.status(200).send(rows);

    }else{
      res.status(500).send('Error while performing Query.');

    }
  });
});

app.get('/node/provincias', function(req, res){
  // databaseConnect();
  connection.query("SELECT * from provincias order by provincia_nombre;", function(err, rows, fields) {
    if (!err){
      res.status(200).send(rows);

    }else{
      res.status(500).send('Error while performing Query.');

    }
  });
});

app.get('/node/ciudades', function(req, res){
  // databaseConnect();
  connection.query("SELECT * from ciudades order by ciudades_nombre;", function(err, rows, fields) {
    if (!err){
      res.status(200).send(rows);

    }else{
      res.status(500).send('Error while performing Query.');

    }
  });
});

app.get('/node/paises', function(req, res){
  // databaseConnect();
  connection.query("SELECT * from paises order by paises_nombre;", function(err, rows, fields) {
    if (!err){
      res.status(200).send(rows);

    }else{
      res.status(500).send('Error while performing Query.');

    }
  });
});

//this is to get the torneos options for the <select>
app.get('/node/tipoTorneos', function(req, res){
  // databaseConnect();
  // connection.connect();
  connection.query("SELECT * FROM torneos ORDER BY torneos.torneos_nombre ASC;", function(err, rows, fields) {
    if (!err){
      res.status(200).send(rows);

    }else{
      res.status(500).send('Error while performing Query.');

    }
  });
});

//this is to get the arbitros options for the <select>
app.get('/node/arbitros', function(req, res){
  // databaseConnect();
  connection.query("SELECT p.personas_id, p.personas_nombre, p.personas_apellido FROM personas as p INNER JOIN arbitros on p.personas_id = arbitros.personas_id ORDER BY p.personas_apellido ASC;", function(err, rows, fields) {
    if (!err){
      res.status(200).send(rows);

    }else{
      res.status(500).send('Error while performing Query.');

    }
  });
});

//this is to get the torneos options for the <select>
app.get('/node/torneos', function(req, res){
  // databaseConnect();
  connection.query("SELECT torneos_instancias_id, torneos_instancias_nombre FROM torneos_instancias WHERE torneos_instancias_anio = year(now());", function(err, rows, fields) {
    if (!err){
      res.status(200).send(rows);

    }else{
      res.status(500).send('Error while performing Query.');

    }
  });
});

//this is to get the equipos options for the <select>
app.get('/node/equipos', function(req, res){
  // databaseConnect();
  connection.query('SELECT * from equipos order by equipos_nombre asc', function(err, rows, fields) {
    if (!err){
      res.status(200).send(rows);

    }else{
      res.status(500).send('Error while performing Query.');

    }
  });
});

app.post('/node/guardar-tecnico', function(req, res){
  connection.query("select max(personas_id) as id from personas;", function(err, rows, fields){
    if(!err){
      var personas_id = rows[0].id+1;
      var personas_nombre = req.body.nombre;
      var personas_apellido = req.body.apellido;
      var paises_id = req.body.pais.paises_id;
      var personas_fecha_nac = req.body.fecha_nac;
      var tecnicos_activo = req.body.activo;

      var toSave = {personas_id: personas_id,
                    personas_nombre: personas_nombre,
                    personas_apellido: personas_apellido,
                    paises_id: paises_id,
                    personas_fecha_nac: personas_fecha_nac}

      connection.query("INSERT INTO personas SET ? ", toSave, function(err, result){
        if(!err){
          //reset all tecnicos
          if(tecnicos_activo==1){
            connection.query("UPDATE tecnicos SET tecnicos_activo = 0;", function(err, result){
              if(err){
                res.status(500).send('Error while performing Query.');
              }
            });
          }

          var toSave = {personas_id: personas_id,
                        tecnicos_activo: tecnicos_activo}
          connection.query("INSERT INTO tecnicos SET ? ", toSave, function(err, result){
            if(!err){
              res.json("{'status': 'ok'}");
            }else{
              res.status(500).send('Error while performing Query.');
            }
          });
        }else{
          res.status(500).send('Error while performing Query.');
        }
      });
    }else{
      res.status(500).send('Error while performing Query.');
    }
  });

});

app.post('/node/guardar-arbitro', function(req, res){
    // databaseConnect();
    connection.query("select max(personas_id) as id from personas;", function(err, rows, fields){
      if(!err){
        var personas_id = rows[0].id+1;
        var personas_nombre = req.body.nombre;
        var personas_apellido = req.body.apellido;
        var paises_id = req.body.pais.paises_id;
        var personas_fecha_nac = req.body.fecha_nac;
        var tecnicos_activo = req.body.activo;

        var toSave = {personas_id: personas_id,
                      personas_nombre: personas_nombre,
                      personas_apellido: personas_apellido,
                      paises_id: paises_id,
                      personas_fecha_nac: personas_fecha_nac}

        connection.query("INSERT INTO personas SET ? ", toSave, function(err, result){
          if(!err){
            var toSave = {personas_id: personas_id}
            connection.query("INSERT INTO arbitros SET ? ", toSave, function(err, result){
              if(!err){
                res.json("{'status': 'ok'}");
              }else{
                res.status(500).send('Error while performing Query.');
              }
            });
          }else{
            res.status(500).send('Error while performing Query.');
          }
        });
      }else{
        res.status(500).send('Error while performing Query.');
      }
    });
});

//this is to get the partidos list for the home page>
app.get('/node/partidos-home', function(req, res){
  // databaseConnect();
  // connection.connect();
  connection.query('SELECT * FROM partidos_detalle LIMIT 8;', function(err, rows, fields) {
    if (!err){
      res.status(200).send(rows);

    }else{
      res.status(500).send(err);

    }
  });
});

var server = app.listen(3000);
