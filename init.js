/*
This files runs the 'server' that hosts the nodejs app.
  Run:
    node init

  Go to http://localhost:3000
*/

var express = require('express');
var bodyParser = require('body-parser');
var logger = require('./logger');


var mongoose = require('mongoose');
var passport = require('passport');
var LocalStrategy = require('passport-local').Strategy;

var routes = require('./routes/index');
var users = require('./routes/users');

var app = express();

app.use(passport.initialize());
// app.use(passport.session());

app.use(bodyParser.json()); // for parsing application/json
app.use('/', express.static('./app'));
app.use('/', routes);

// passport config
var Account = require('./models/account');
passport.use(new LocalStrategy(Account.authenticate()));
passport.serializeUser(Account.serializeUser());
passport.deserializeUser(Account.deserializeUser());

// mongoose
mongoose.connect('mongodb://localhost/passport_local_mongoose_express4');


var server = app.listen(3000);
