/**
 * Created by tavete on 6/1/16.
 *
 * This is to implemnt the passport-local auth
 * https://www.npmjs.com/package/passport-local
 * https://www.npmjs.com/package/passport
 * https://github.com/mjhea0/passport-local-express4
 */

var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var passportLocalMongoose = require('passport-local-mongoose');

var Account = new Schema({
  username: String,
  password: String
});

Account.plugin(passportLocalMongoose);

module.exports = mongoose.model('accounts', Account);