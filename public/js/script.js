$( document ).ready(function() {
  //UI Setup
  $('#tabs').tabs();

  var socket = io();

  // takes color information in the jQueryColorPicker's value's schema, and socket emits the color to node.
  var emitColor = function(color){
    socket.emit('sendColor', spectrumColorToRGB(color));
  };

  var spectrumColorToRGB = function (color) {
    return 'rgb('+Math.floor(color._r)+', '+Math.floor(color._g)+', '+Math.floor(color._b)+')';
  };

  var colorPicker = $('#colorPickerHolder').spectrum({
    flat: true,
    move: $.throttle(32,emitColor),
    showButtons: false
  });

});
