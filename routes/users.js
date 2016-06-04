/**
 * Created by tavete on 6/1/16.
 *
 * This is to implemnt the passport-local auth
 * https://www.npmjs.com/package/passport-local
 * https://www.npmjs.com/package/passport
 * https://github.com/mjhea0/passport-local-express4
 */

var express = require('express');
var router = express.Router();

/* GET users listing. */
router.get('/', function(req, res, next) {
  res.send('respond with a resource');
});

module.exports = router;
