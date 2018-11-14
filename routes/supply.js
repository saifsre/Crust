var express = require('express');
var router = express.Router();
var db = require('../db');

/* GET home page. */
router.get('/ingredient/:shipdate/expiry', function(req, res, next) {
    var id = req.params.shipdate;
    var query = "SELECT * from Member where cid = " + "'" + id + "'";
    db.query(query, function(err, result){
    if(err) res.send(err);
    res.send((result));
})
});

router.get('/distributor/all', function(req, res, next) { 
    var query = "SELECT * from Distributor";
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

router.get('/ingredientproducer', function(req, res, next) {
    var id = req.params.did;
    var query = "SELECT * from IngredientProducer";
    db.query(query, function(err, result){
    if(err) res.send(err);
    res.send((result));
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
