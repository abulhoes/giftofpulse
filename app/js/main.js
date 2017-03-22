(function(){
var Readable = require('stream').Readable  
var util = require('util');
var five = require("johnny-five");



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

var blueLed1 = new five.Led("13");
var redLed1 = new five.Led("5");
var blueLed2 = new five.Led("3");
var redLed2 = new five.Led("6");

var touch = new five.Button(9);
var touch2 = new five.Button(10);
// var sensorThree = new five.Button()
// var sensorFour = new five.Button()

  touch.on("hold", function(){
    redLed1.pulse();
    blueLed1.blink();
     
  });

  touch.on("release", function(){
     blueLed1.stop();
      redLed1.stop();
      blueLed1.off();
       redLed1.off();
  });

  touch2.on("hold", function(){
    redLed2.pulse();
    blueLed2.blink();
     
  });

  touch2.on("release", function(){
     blueLed2.stop();
      redLed2.stop();
      blueLed2.off();
       redLed2.off();
  });




// if(sensorOne.value < 100 && sensorTwo.value < 100 && sensorThree.value < 100 && sensorfour.value < 100) { 
//    display.innerHTML = "32 lives";
// } else if(sensorOne.value < 100 && sensorTwo.value < 100 && sensorThree.value < 100 && sensorfour.value > 100) {
//   display.innerHTML="24 Lives";
// else if(sensorOne.value < 100 && sensorTwo.value < 100 && sensorThree.value > 100 && sensorfour.value < 100) {
//   display.innerHTML="24 Lives";
// }
// else if(sensorOne.value < 100 && sensorTwo.value > 100 && sensorThree.value < 100 && sensorfour.value < 100) {
//   display.innerHTML="24 Lives";
// }
// else if(sensorOne.value > 100 && sensorTwo.value < 100 && sensorThree.value < 100 && sensorfour.value < 100) {
//   display.innerHTML="24 Lives";
// }
// else if(sensorOne.value < 100 && sensorTwo.value < 100 && sensorThree.value > 100 && sensorfour.value > 100) {
//   display.innerHTML="16 Lives";
// }
// else if(sensorOne.value < 100 && sensorTwo.value > 100 && sensorThree.value > 100 && sensorfour.value < 100) {
//   display.innerHTML="16 Lives";
// }
// else if(sensorOne.value > 100 && sensorTwo.value > 100 && sensorThree.value < 100 && sensorfour.value < 100) {
//   display.innerHTML="16 Lives";

// }
// else if(sensorOne.value > 100 && sensorTwo.value < 100 && sensorThree.value < 100 && sensorfour.value > 100) {
//   display.innerHTML="16 Lives";
// }
// else if(sensorOne.value > 100 && sensorTwo.value < 100 && sensorThree.value > 100 && sensorfour.value < 100) {
//   display.innerHTML="16 Lives";
// }
// else if(sensorOne.value < 100 && sensorTwo.value > 100 && sensorThree.value < 100 && sensorfour.value > 100) {
//   display.innerHTML="16 Lives";
// }
// if(sensorOne.value < 100 && sensorTwo.value > 100 && sensorThree.value > 100 && sensorfour.value > 100) { 
//    display.innerHTML = "8 lives";
// } 
// if(sensorOne.value > 100 && sensorTwo.value < 100 && sensorThree.value > 100 && sensorfour.value > 100) { 
//    display.innerHTML = "8 lives";
// } 
// if(sensorOne.value > 100 && sensorTwo.value > 100 && sensorThree.value < 100 && sensorfour.value > 100) { 
//    display.innerHTML = "8 lives";
// } 
// if(sensorOne.value > 100 && sensorTwo.value > 100 && sensorThree.value > 100 && sensorfour.value < 100) { 
//    display.innerHTML = "8 lives";
// } 
// } else {
//   display.innerHTML="";
// }



//});//closing sensorOne



});//closing board 

// display();

})();