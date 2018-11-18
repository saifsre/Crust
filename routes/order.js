var express = require('express');
var router = express.Router();
var Order = require('../model/Order');
var db = require('../db');
var employees = null;
const UUID = require("uuidjs");


//Get all the orders

    var query = "SELECT * from `Employee`";
    db.query(query, function(err, result){
        if(err) throw err;
        employees = result;
    }) 

router.get('/all', function(req, res, next) {
    var query = "SELECT * from `Order`";
    db.query(query, function(err, result){
        if(err) res.send(err);
        res.send((result));
    })
})

//Get all the SAndwiches
router.get('/sandwiches/all', function(req, res, next) {
    var query = "SELECT * from Sandwich";
    db.query(query, function(err, result){
        if(err) res.send(err);
        res.send((result));
    })
})

//Make a Sandwich
router.post('/sandwich/make', function(req, res, next) {
    var sandwich = req.body;
    var parameters = [sandwich["sName"],sandwich["Size"],sandwich["toasted"],sandwich["Price"], sandwich["Vegetarian"], sandwich["calories"]];
    var query = "INSERT INTO Sandwich (sName, Size, toasted, Price, Vegetarian, calories) values (?,?,?,?,?,?,?);"
    db.query(query, parameters, function(err,result) {
        if(err) res.send(err);
        res.send(result); 
    });
  })
  
  function getRandomInt(max) {
    return Math.floor(Math.random() * Math.floor(max));
  }
  // Place an Order
  router.post('/place',  async function(req, res, next) {
    var order = req.body;
    var customerId = getRandomInt(99999999);
    TimeStamp = new Date();
    let empId = employees[getRandomInt(employees.length)].empId
    console.log(empId);
    db.query("INSERT into `Customer` (cid) values (?)", customerId, function(err,result){
        var parameters = [customerId,empId,order["PaymentMethod"], TimeStamp, order["Price"], order["sName"]];
        var query = "INSERT INTO `Order` (customerId, EmpId, PaymentMethod, TimeStamp, Price, sName) values (?,?,?,?,?,?);"
          db.query(query, parameters, function(err,result) {
          db.query("SELECT oid from `Order` where customerId = ?", customerId, function(err,result) {
            if(err) res.send(err);
            console.log(result[0].oid);
            res.json({id: result[0].oid});
          })
      });
    })
});

router.put('/update', function(req, res, next) {
    var body = req.body;
    var query = "UPDATE `Order` set sName = ?, Price = ? where oid = ?"
    var parameters = [body["sName"], body["Price"], body["orderId"]];
    db.query(query, parameters,function(err,result) {
        if(err) res.send(err);
        res.send(result); 
    });
})

router.delete('/cancel/:oid', function(req, res, next) {
    var oid = req.params.oid*1;
    var query = "DELETE from `Order` where oid = ?"
    db.query(query, oid, function(err,result) {
        if(err) res.send(err);
        res.send(result);
    });
})



module.exports = router;
