
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
var instructions = document.querySelector("#instructions");
var instructions2 = document.querySelector("#instruction2");
var heartDisplay = document.querySelector(".heartCon");
var hearts = document.querySelectorAll(".heart");

var count1 = 0;
var count2 = 0;
var count3 = 0;
var count;
var loop;

strip = new pixel.Strip({
        board: this,
        controller: "FIRMATA",
        strips: [ {pin: 6, length: 30}, ], // this is preferred form for definition
        gamma: 2.8, // set to a gamma that works nicely for WS2812
    });

strip.on("ready", function() {
        console.log("Strip ready, let's go");
});


function  callLedStrip() {
    //Set the entire strip to pink.
    strip.color('#ff0000');
    // Set first and seventh pixels to turquoise.
    strip.pixel(0).color('#0029ff');
    strip.pixel(15).color('#0029ff');
    // Display initial state.
    strip.show();

    // Loop the following command forever
    // at 12fps until Arduino powers down.
    loop = setInterval(function () {
      strip.shift(1, pixel.FORWARD, true);
      strip.show();
    }, 1000/12);

};

//==========Sensor 1 Variables============//

var sensorOne = new five.Sensor({
   pin:"A0",
   freq:100
 });

//==========Sensor 2 Variables============//

var sensorTwo = new five.Sensor({
   pin:"A2",
   freq:100
 });

//==========Sensor 3 Variables============//

var sensorThree = new five.Sensor({
   pin:"A4",
   freq:100
 });

//==========Methods============//

sensorOne.on("change", function(){
  console.log(this.value);
  if(sensorOne.value < 60){
    count1 = 1;
  } else {
    count1 = 0;
  }


sensorTwo.on("change", function(){
 console.log(this.value);
  if(sensorTwo.value < 60){
    count2 = 1;
  } else {
    count2 = 0;
  }
});

sensorThree.on("change", function(){
  console.log(this.value);
  if(sensorThree.value < 60){
    count3 = 1; 
  } else {
    count3 = 0;
  }
});
count = count1 + count2 + count3;

var tl = new TimelineMax();

function heartShape(){
  tl.add(TweenMax.staggerFrom(hearts, 2,{
    scale: 0.5,
    opacity:0,
    delay:0.1,
    ease:Elastic.easeOut}, 0.2));

  tl.add(TweenMax.staggerTo(hearts, 2,{
    scale: 0.5,
    opacity:0,
    delay:0.1,
    ease:Elastic.easeIn}, 0.2));
}

//==========Display Messages If Statments============//

if(count == 3){
  display.innerHTML = "<span class='finalText'>24</span>";
  instructions.innerHTML = "";
  instructions2.innerHTML = "<h2>You can save many more lives by becoming an organ donor today. <br/> Join at <span class='red'>beadonor.ca</span></h2>";
  callLedStrip();
  heartDisplay.innerHTML = "<div class='heart heart-shape'></div> <div class='heart heart-shape2'></div> <div class='heart heart-shape3'></div>";
}else if(count == 2){
  clearInterval(loop);
  strip.off();
  display.innerHTML = "16";
  instructions.innerHTML = "";
  instructions2.innerHTML = "<h2>You just need one more friend. You can do it!</h2>";
  heartDisplay.innerHTML = "<div class='heart heart-shape2'></div> <div class='heart heart-shape3'></div>";
  }else if(count == 1){
  clearInterval(loop);
  strip.off();
  display.innerHTML = "8";
  instructions.innerHTML = "";
  instructions2.innerHTML = '<h2>Grab a friend to save more lives.</h2>';
  heartDisplay.innerHTML = "<div class='heart heart-shape3'></div>";
}else{
  clearInterval(loop);
  strip.off();
  display.innerHTML = "";
  instructions.innerHTML = "Touch a sensor to save a life!";
  instructions2.innerHTML = "";
  heartDisplay.innerHTML = "";
}

});//closing sensorOne

});//closing board 
