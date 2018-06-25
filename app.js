/*load config*/
var config = require("./config/config");

/*express*/
var express = require("express");
var app = express();
var server = require("http").Server(app);

/*socket io*/
var socket_io = require("socket.io");

/*Load router*/
var appRouter = require('./router/http');
app.use('/', appRouter);

/*create socket io*/
var io = socket_io.listen(server);

/*create redis connection: */
var redis = require('./redis/redisConnection');

/* on Event */
var on_socket = require("./socket/on")(io, redis);

//run server http
server.listen(config.server.port);
console.log("Start server with port : " + config.server.port);

