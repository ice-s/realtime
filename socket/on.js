/**
 * Created by SonNT on 10/23/2017.
 */

module.exports = function(io, redis){
    
    /*socket io listen client connect*/
    io.on("connection", function(socket) {
        /*subcriber channel*/
        socket.on("subscribe", function(channelData){
            console.log("**********[subscribe]**********");
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
            console.log("**********[subscribe end]**********");
        });

        socket.on("send", function(clientData){
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

    /* listen : subcriber channel */
    redis.subscriber.on("subscribe", function (channelName, count) {
        console.log('dang ky channel : "' + channelName + '"');
        console.log('all channel : ' + count);

        /*TODO : io send message to channel: new connection*/
    });

    /*listen : data send to channel*/
    redis.subscriber.on("message", function (channelName, message) {
        console.log("channel : " + channelName);
        console.log("message : " + message);
        io.of('/').emit(channelName, message);
        /*TODO : io send message to channel*/
    });
};