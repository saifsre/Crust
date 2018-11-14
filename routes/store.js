var express = require('express');
var router = express.Router();
var Customer = require('../model/Customer');
var db = require('../db');

/* GET users listing. */

//Gets all the members whose points are > 200
router.get("/members", function(req, res, next) {
  var query = "SELECT * from Member where Points > 2000";
  db.query(query, function(err, result){
    if(err) res.send(err);
    res.send((result));
})
})

router.get("/member/:id", function(req, res, next) {
  var id = req.params.id;
  var query = "SELECT * from Member where cid = " + "'" + id + "'";
  db.query(query, function(err, result){
    if(err) res.send(err);
    res.send((result));
})
})

router.get("/customers/sandwich/:sName", function(req, res, next) {
  var sName = req.params.sName;
  var query = "SELECT customerid from `Order` where sName =" + "'" + sName + "'"; 
  db.query(query, function(err, result){
    if(err) res.send(err);
    res.send((result));
})

})

module.exports = router;
