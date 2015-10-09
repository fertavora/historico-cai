var MongoClient = require('mongodb').MongoClient;
var mongo = new MongoClient();

mongo.connect("mongodb://localhost/",
  function(err, mongoDB){
    if(err){
      console.log(err);
      return;
    }

    var db = mongoDB.db("delivery");
    db.collection("productos",
      function(err, collection){
        if(err) return;
        var query = {};
        var cursor = collection.find(query);
        cursor.toArray(function(err, itemArr){
          for (var i in itemArr){
            console.log(itemArr[i].nombre + " " + itemArr[i].precio);
          }
          db.close();
        })
      });
  });
