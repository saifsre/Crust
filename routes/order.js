var express = require('express');
var router = express.Router();
var Order = require('../model/Order');
var db = require('../db');

router.get('/all', function(req, res, next) {
    var query = "SELECT * from `Order`";
    db.query(query, function(err, result){
        if(err) res.send(err);
        res.send((result));
    })
})

router.get('/sandwiches/all', function(req, res, next) {
    var query = "SELECT * from Sandwich";
    db.query(query, function(err, result){
        if(err) res.send(err);
        res.send((result));
    })
})

router.post('/sandwich/make/:oid', function(req, res, next) {
    console.log("Hit");
    var sandwich = req.body;
    var parameters = [sandwich["sName"],sandwich["Size"],sandwich["toasted"],sandwich["Price"], sandwich["Vegetarian"], sandwich["calories"], req.params.oid];
    var query = "INSERT INTO Sandwich (sName, Size, toasted, Price, Vegetarian, calories, oid) values (?,?,?,?,?,?,?);"
    db.query(query, parameters, function(err,result) {
        if(err) res.send(err);
        res.send(result); 
    });
  });

router.post('/place', function(req, res, next) {
  var order = req.body;
  var parameters = [order["customerId"],order["EmpId"],order["PaymentMethod"], order["TimeStamp"], order["Price"]];
  var query = "INSERT INTO `Order` (customerId, EmpId, PaymentMethod, TimeStamp, Price) values (?,?,?,?,?);"
  db.query(query, parameters, function(err,result) {
      if(err) res.send(err);
      res.send(result); 
  });
});

router.put('/update', function(req, res, next) {
    var restQuery = " ";
    var body = req.body;
    let count = 0;
    for(let k in body){
        console.log(k);
        if(k=="customerid") {
            restQuery = restQuery + "customerid = " + body["customerid"];
        }
        if(k=="EmpId") {
            restQuery = restQuery + "EmpId = " + body["EmpId"];
        }
        if(k=="PaymentMethod") {
            restQuery = restQuery + "PaymentMethod = " + body["PaymentMethod"];
        }
        if(k=="TimeStamp") {
            restQuery = restQuery + "TimeStamp = " + body["TimeStamp"];
        }
        if(k=="Price") {
            restQuery = restQuery + "Price = " + body["Price"];
        }
        count++
        if(count!=Object.keys(body).length) {
            restQuery = restQuery + ", "
        }
    }
    var parameters = [];
    var query = "UPDATE `Order` set" + restQuery;
    res.send(query);
    // db.query(query, parameters, function(err,result) {
    //     if(err) res.send(err);
    //     res.send(result); 
    // });
})

router.delete('/cancel/:oid', function(req, res, next) {
    var oid = req.params.oid*1;
    var query = "DELETE from Sandwich where oid = ?"
    db.query(query, oid, function(err,result) {
        if(err) res.send(err);
        var q2 =  "DELETE from `Order` where oid = ?"
        db.query(q2, oid, function(err, result) {
            if(err) res.send(err);
            res.send(result); 
        })
    });
})

router.get('/sandwiches/:oid', function(req, res, next){
    var id = req.params.oid;
    console.log(id);
    var query = "SELECT * from Sandwich where oid = ?"
    db.query(query, id, function(err,result) {
        if(err) res.send(err);
        res.send(result); 
    });
})

module.exports = router;
