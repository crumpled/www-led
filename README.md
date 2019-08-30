# www-led
Node server with attached Arduino Uno controlling WS2812 (NeoPixels).

## Install
1. Install node-pixel firmata (https://github.com/ajfisher/node-pixel/tree/master/firmware/build/node_pixel_firmata)
2. `npm install`
3. Connect arduino to computer with WS2812 lights on pin 8
4. `node app`

## Usage
Use color picker on `http://localhost:8888` to change the colors on the lights.

### Notes:
* Developed and tested on Windows x64
* Uses custom Firmata on Arduino Uno https://github.com/ajfisher/node-pixel/tree/master/firmware/build/node_pixel_firmata

## Release Notes
### Version 0.0.1
Very basics demonstration of node server getting messages from web client using websockets. Server talks to an arduino to change the color of
