var redis = require("redis");
var client = redis.createClient('6379','localhost');

client.on("error", function(err) {
    console.log("Error " + err);
});

module.exports = {
    subscriber: redis.createClient(),
    publisher : redis.createClient(),
    client    : client
};