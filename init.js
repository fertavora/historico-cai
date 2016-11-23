
var express = require('express');
var bodyParser = require('body-parser');
var reload = require('reload');
var http = require('http');

var app = express();
app.set('port', process.env.PORT || 5000)
app.use(bodyParser.json()); // for parsing application/json
app.use('/', express.static('./app'));
// app.listen(process.env.SITE_PORT || 5000);

var server = http.createServer(app);

reload(server, app);

server.listen(app.get('port'), function(){
  console.log("Web server listening on port " + app.get('port'));
});