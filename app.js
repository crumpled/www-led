var five = require("johnny-five");
var pixel = require("node-pixel");
var express = require('express');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var request = require('request');
var fs = require('fs');
var http = require('http');
var _ = require('underscore');
var PF = require('./pixel-fun.js');

var app = express();
var server = http.createServer(app);
var io = require('socket.io').listen(server);
var board = new five.Board();

var LED_STRIP_LENGTH = 100;

// uncomment after placing your favicon in /public
//app.use(favicon(__dirname + '/public/favicon.ico'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());

app.use(express.static(__dirname + '/public'));

// catch 404 and forward to error handler
app.use(function(req, res, next) {
    var err = new Error('Not Found');
    err.status = 404;
    next(err);
});

// development error handler
// will print stacktrace
if (app.get('env') === 'development') {
    app.use(function(err, req, res, next) {
        res.status(err.status || 500);
        res.send({
            message: err.message,
            error: err
        });
    });
}

// production error handler
// no stacktraces leaked to user
app.use(function(err, req, res, next) {
    res.status(err.status || 500);
    res.send({
        message: err.message,
        error: {}
    });
});

var strip;
board.on("ready", function() {

    strip = new pixel.Strip({
        data: 8,
        length: LED_STRIP_LENGTH,
        board: this,
        controller: "FIRMATA"
    });

    strip.on("ready", function() {
        var pf = new PF(strip);
        function socketFunctions(socket) {
          function sendColor(color) {
           console.log("color: "+color);
            pf.changeColor(color);
          };

          socket.on('sendColor', sendColor);
        }
        console.log("strip ready");
        io.on('connection', socketFunctions);
        server.listen(8888);
      strip.show();
    });
});

module.exports = app;
