var _ = require("underscore");
var PF = function(strip){
  var that = this;
  function adjustValue (startingValue, inputValue, range){
    // console.log(startingValue, inputValue, range, Math.floor(startingValue * (inputValue / range)));
    return Math.floor(startingValue * (inputValue / range));
  }
  that.strip = strip;
  that.originalPixels = [];
  that.updateOriginal = function(strip){
    for(var i = 0; i < that.strip.stripLength(); i++) {
      that.originalPixels[i] = _.extend({},that.strip.pixel(i).color());
    }
  };

  that.changeColor = function(color){
    _.defer(function (){
      that.strip.color(color);
      that.strip.show();
      that.updateOriginal(that.strip);
    });
  };

  that.init = function () {
    that.updateOriginal(strip);
  };

  that.init();

  return that;
};


module.exports = PF;
