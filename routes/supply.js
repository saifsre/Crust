var express = require('express');
var router = express.Router();
var db = require('../db');

/* GET home page. */
router.get('/ingredient/:shipdate/', function(req, res, next) {
    var id = req.params.shipdate.toString();
    console.log(id);
    var query = "SELECT iName, ship_date, bb_date from distview where bb_date like " + "'" + id + "'";
    // var query = "select ship_date from distview where ship_date like '2012-09-28'"
    db.query(query, id, function(err, result){
    if(err) res.send(err);
    res.send(result);
})
});


router.get('/distributor/all', function(req, res, next) { 
    var query = "SELECT * from distview";
    db.query(query, function(err, result){
    if(err) res.send(err);
    res.send((result));
})
});

router.get('/distributor/:did', function(req, res, next) {
    var id = req.params.did;
    var query = "SELECT * from Member where cid = " + "'" + id + "'";
    db.query(query, function(err, result){
    if(err) res.send(err);
    res.send((result));
})
});

router.get('/distributor/:did', function(req, res, next) {
    var id = req.params.did;
    var query = "SELECT * from Member where cid = " + "'" + id + "'";
    db.query(query, function(err, result){
    if(err) res.send(err);
    res.send((result));
})
});

router.get('/ingredientproducer/:pid', function(req, res, next) {
    var id = req.params.pid;
    var query = "SELECT * from IngredientProducer where prodid = ?";
    db.query(query,id, function(err, result){
    if(err) res.send(err);
    res.send(result[0]);
})
});

router.get('/ingredients', function(req, res, next) {
    var id = req.params.did;
    var query = "SELECT * from Ingredient";
    db.query(query, function(err, result){
    if(err) res.send(err);
    res.send((result));
})
});

module.exports = router;
