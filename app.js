var express = require("express");
var app = express();
var server = require("http").Server(app);
var socket_io = require("socket.io").listen(server);
var redis = require('./redis/redis');

var appRouter = require('./router/http');
//run server http
server.listen(2222);

app.use('/',appRouter);
console.log("Start server with port");

/*init socket io*/
io = socket_io.listen(server);

/*listen : data send to channel*/
redis.subscriber.on("message", function(channel, message) {
    console.log("channel : " + channel);
    console.log("message : " + message);

});

/* listen : subcriber channel */
redis.subscriber.on("subscribe", function (channel, count) {
    console.log('dang ky channel : "' + channel + '"');
    console.log('all channel : ' + count);
});


/*socket io listen client connect*/
io.on("connection", function(socket) {
    console.log("connected");
    console.log(socket.id);

    /*listen something event*/
    socket.on("something", function(clientData){
        console.log(clientData);
    });

    /*listen something event with callback*/
    socket.on("something_cb", function(clientData, fn_callback){
        console.log(clientData);
    });

    /*subcriber channel*/
    socket.on("subcriber", function(channelData){
        console.log("[subcriber]");
        // ["channel 1", "channel 2", "channel 3"]
        listChannel = null;
        if(typeof channelData === "string"){
            try {
                listChannel = JSON.parse(channelData);
            } catch (e) {}
        }
        if(typeof channelData === "object"){
            listChannel = channelData;
        }
        if(Array.isArray(listChannel) === false){
            if(channelData){
                listChannel = [channelData];
            }
        }
        if(listChannel){
            listChannel.forEach(function(channel){
                redis.subscriber.subscribe(channel);
            });
        }
    });

    socket.on("send", function(clientData){
        console.log("[send]");
        obj = null;
        if(typeof clientData === "string"){
            try {
                obj = JSON.parse(clientData);
            } catch (e) {}
        }
        if(typeof clientData === "object"){
            obj = clientData;
        }
        if(obj){
            channel  = clientData.channel;
            data  = clientData.data;
            /*clientData {"channel" : "channel 1", "data" : "data"} */
            redis.publisher.publish(channel, data);
        }
    });

    /*listen disconnect*/
    socket.on("disconnect", function() {
        console.log("disconnected");
    });
});


