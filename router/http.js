/**
 * Created by SonNT on 10/20/2017.
 */

var express = require("express");

//get router
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
    res.send("hello!");
});

module.exports = router;

