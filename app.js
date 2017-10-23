var express = require("express");
var app = express();
var server = require("http").Server(app);
var socket_io = require("socket.io");
var config = require("./config/config");
var appRouter = require('./router/http');
app.use('/', appRouter);

/*init socket io*/
var io = socket_io.listen(server);
/*connect redis*/
var redis = require('./redis/redis');

var on_redis = require("./redis/on")(io, redis);
var on_socket = require("./socket/on")(io, redis);

//run server http
server.listen(config.server.port);
console.log("Start server with port : " + config.server.port);

