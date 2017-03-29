
var Readable = require('stream').Readable  
var util = require('util');
var five = require("johnny-five");
var pixel = require("node-pixel");

var strip = null;

util.inherits(MyStream, Readable);  
function MyStream(opt) {  
  Readable.call(this, opt);
}
MyStream.prototype._read = function() {};  
// hook in our stream
process.__defineGetter__('stdin', function() {  
  if (process.__stdin) return process.__stdin
  process.__stdin = new MyStream()
  return process.__stdin
});

var board = new five.Board();

 board.on("ready", function()  {

var display = document.querySelector("#display");

var count1 = 0;
var count2 = 0;
var count3 = 0;
var count;
strip = new pixel.Strip({
        board: this,
        controller: "FIRMATA",
        strips: [ {pin: 2, length: 30}, ], // this is preferred form for definition
        gamma: 2.8, // set to a gamma that works nicely for WS2812
    });

strip.on("ready", function() {
        console.log("Strip ready, let's go");

});


function  callLedStrip() {
  console.log("Working!!");
    // Set the entire strip to pink.
    strip.color('#ff0000');
    // Set first and seventh pixels to turquoise.
    strip.pixel(0).color('#0029ff');
    strip.pixel(15).color('#0029ff');
    // Display initial state.
    strip.show();

    // Loop the following command forever
    // at 12fps until Arduino powers down.
    var loop = setInterval(function () {
      // Shift all pixels clockwise
      strip.shift(1, pixel.FORWARD, true);
      strip.show();
    }, 2000 / 12);
 
};

//==========Sensor 1 Variables============//

var sensorOne = new five.Sensor({
   pin:"A0",
   freq:250
 });
var led1 = new five.Led("11");

//==========Sensor 2 Variables============//

var sensorTwo = new five.Sensor({
   pin:"A2",
   freq:250
 });
var led2 = new five.Led("6");

//==========Sensor 3 Variables============//

var sensorThree = new five.Sensor({
   pin:"A4",
   freq:250
 });
var led3 = new five.Led("5");

//==========Methods============//

sensorOne.on("change", function(){
  if(sensorOne.value < 60){
    led1.pulse();
    count1 = 1;
  } else {
    led1.off();
    led1.stop();
    count1 = 0;
  }


sensorTwo.on("change", function(){
 // console.log(count);
  if(sensorTwo.value < 60){
    led2.pulse();
   
    count2 = 1;
  } else {
    led2.off(); 
    led2.stop();
    count2 = 0;
  }
});

sensorThree.on("change", function(){
  //console.log(count);
  if(sensorThree.value < 60){
    led3.pulse();
    count3 = 1; 
  } else {
    led3.off();
    led3.stop();
    count3 = 0;
  }
});
count = count1 + count2 + count3;

//==========Display Messages If Statments============//

if(count == 3){
  display.innerHTML = "24 Lives";
  callLedStrip();
}else if(count == 2){
  display.innerHTML = "16 Lives";
  strip.off();
}else if(count == 1){
  display.innerHTML = "8 Lives";
  strip.off();
}else{
  display.innerHTML = "";
  strip.off();
}

});//closing sensorOne

});//closing board 

// display();
