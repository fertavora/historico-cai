var mysql = require('mysql');

// Database connect
var connection = mysql.createConnection({
  host     : 'historicocai.db.8518296.hostedresource.com',
  user     : 'historicocai',
  password : 'HistoCai!666',
  database : 'historicocai'
});

connection.connect(function(err) {
  if (err) {
    console.error('error connecting: ' + err.stack);
    return;
  }

  console.log('connected as id ' + connection.threadId);
});
