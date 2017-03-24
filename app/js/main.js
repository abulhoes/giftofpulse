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

//==========Sensor 1 Variables============//

var sensorOne = new five.Sensor({
   pin:"A0",
   freq:250
 });
var led = new five.Led("11");
var led2 = new five.Led("6");

//==========Sensor 2 Variables============//

var sensorTwo = new five.Sensor({
   pin:"A2",
   freq:250
 });
var led3 = new five.Led("10");
var led4 = new five.Led("9");

//==========Sensor 3 Variables============//

var sensorThree = new five.Sensor({
   pin:"A4",
   freq:250
 });
var led5 = new five.Led("5");
var led6 = new five.Led("3");

//==========Methods============//

sensorOne.on("change", function(){
  console.log(this.value);
  if(sensorOne.value < 100){
    led.pulse();
    led2.blink(); 
  } else {
    led.off();
    led2.off(); 
    led.stop();
    led2.stop();
  }

sensorTwo.on("change", function(){
  console.log(this.value);
  if(sensorTwo.value < 100){
    led3.pulse();
    led4.blink(); 
  } else {
    led3.off();
    led4.off(); 
    led3.stop();
    led4.stop();
  }
});

sensorThree.on("change", function(){
  console.log(this.value);
  if(sensorThree.value < 100){
    led5.pulse();
    led6.blink(); 
  } else {
    led5.off();
    led6.off(); 
    led5.stop();
    led6.stop();
  }
});

//==========Display Messages If Statments============//

if(sensorOne.value < 100 && sensorTwo.value < 100 && sensorThree.value < 100) { 
   display.innerHTML = "24 lives";
} 
else if(sensorOne.value < 100 && sensorTwo.value < 100  && sensorThree.value > 100) {
  display.innerHTML="16 Lives";
} 
else if(sensorOne.value > 100 && sensorTwo.value < 100  && sensorThree.value < 100) {
  display.innerHTML="16 Lives";
} 
else if(sensorOne.value < 100 && sensorTwo.value > 100  && sensorThree.value < 100) {
  display.innerHTML="16 Lives";
}  
else if(sensorOne.value < 100 && sensorTwo.value > 100  && sensorThree.value > 100) {
  display.innerHTML="8 Lives";
} 
else if(sensorOne.value > 100 && sensorTwo.value > 100  && sensorThree.value < 100) {
  display.innerHTML="8 Lives";
} 
else if(sensorOne.value > 100 && sensorTwo.value < 100  && sensorThree.value > 100) {
  display.innerHTML="8 Lives";
}
else {
  display.innerHTML="";
}


});//closing sensorOne



});//closing board 

// display();

})();