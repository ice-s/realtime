/**
 * Created by SonNT on 10/23/2017.
 */

var redis = require("redis");
var config = require("../config/config");
var client = redis.createClient(config.redis.port,config.redis.host);
console.log("Redis start with : "  + config.redis.port + " - " + config.redis.host);
client.on("error", function(err) {
    console.log("Error connect redis" + err);
});

module.exports = {
    subscriber: redis.createClient(),
    publisher : redis.createClient(),
    client    : client
};