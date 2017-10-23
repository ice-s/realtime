/**
 * Created by SonNT on 10/23/2017.
 */

module.exports = function (redis, socket) {
    /*listen : data send to channel*/
    redis.subscriber.on("message", function (channel, message) {
        console.log("channel : " + channel);
        console.log("message : " + message);

    });

    /* listen : subcriber channel */
    redis.subscriber.on("subscribe", function (channel, count) {
        console.log('dang ky channel : "' + channel + '"');
        console.log('all channel : ' + count);
    });
};