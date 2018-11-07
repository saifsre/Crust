var express = require('express');
var router = express.Router();
var Customer = require('../model/Customer');
/* GET users listing. */
router.get('/', function(req, res, next) {
  res.send("Works");
});

module.exports = router;
