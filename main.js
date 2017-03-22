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
var led = new five.Led("");
var led2 = new five.Led(");
var led3 = new five.Led("");
var led4 = new five.Led(");

var sensorOne = new five.Sensor({
   pin:"",
   freq:250
 });
var sensorTwo = new five.Sensor({
   pin:"",
   freq:250
 });
var sensorThree = new five.Sensor({
   pin:"",
   freq:250
 });
var sensorFour = new five.Sensor({
   pin:"",
   freq:250
 });

sensorOne.on("change", function(){
  console.log(this.value);
  if(sensorOne.value < 100){
    led.on();
  } else {
    led.off();
  }

sensorTwo.on("change", function(){
  console.log(this.value);
  if(sensorTwo.value < 100){
    led2.on(); 
  } else {
    led2.off();
  }
});
sensorThree.on("change", function(){
  console.log(this.value);
  if(sensorTwo.value < 100){
    led2.on(); 
  } else {
    led2.off();
  }
});
sensorFour.on("change", function(){
  console.log(this.value);
  if(sensorTwo.value < 100){
    led2.on(); 
  } else {
    led2.off();
  }
});

if(sensorOne.value < 100 && sensorTwo.value < 100 && sensorThree.value < 100 && sensorfour.value < 100) { 
   display.innerHTML = "32 lives";
} else if(sensorOne.value < 100 && sensorTwo.value < 100 && sensorThree.value < 100 && sensorfour.value > 100) {
  display.innerHTML="24 Lives";
else if(sensorOne.value < 100 && sensorTwo.value < 100 && sensorThree.value > 100 && sensorfour.value < 100) {
  display.innerHTML="24 Lives";
}
else if(sensorOne.value < 100 && sensorTwo.value > 100 && sensorThree.value < 100 && sensorfour.value < 100) {
  display.innerHTML="24 Lives";
}
else if(sensorOne.value > 100 && sensorTwo.value < 100 && sensorThree.value < 100 && sensorfour.value < 100) {
  display.innerHTML="24 Lives";
}
else if(sensorOne.value < 100 && sensorTwo.value < 100 && sensorThree.value > 100 && sensorfour.value > 100) {
  display.innerHTML="16 Lives";
}
else if(sensorOne.value < 100 && sensorTwo.value > 100 && sensorThree.value > 100 && sensorfour.value < 100) {
  display.innerHTML="16 Lives";
}
else if(sensorOne.value > 100 && sensorTwo.value > 100 && sensorThree.value < 100 && sensorfour.value < 100) {
  display.innerHTML="16 Lives";

}
else if(sensorOne.value > 100 && sensorTwo.value < 100 && sensorThree.value < 100 && sensorfour.value > 100) {
  display.innerHTML="16 Lives";
}
else if(sensorOne.value > 100 && sensorTwo.value < 100 && sensorThree.value > 100 && sensorfour.value < 100) {
  display.innerHTML="16 Lives";
}
else if(sensorOne.value < 100 && sensorTwo.value > 100 && sensorThree.value < 100 && sensorfour.value > 100) {
  display.innerHTML="16 Lives";
}
if(sensorOne.value < 100 && sensorTwo.value > 100 && sensorThree.value > 100 && sensorfour.value > 100) { 
   display.innerHTML = "8 lives";
} 
if(sensorOne.value > 100 && sensorTwo.value < 100 && sensorThree.value > 100 && sensorfour.value > 100) { 
   display.innerHTML = "8 lives";
} 
if(sensorOne.value > 100 && sensorTwo.value > 100 && sensorThree.value < 100 && sensorfour.value > 100) { 
   display.innerHTML = "8 lives";
} 
if(sensorOne.value > 100 && sensorTwo.value > 100 && sensorThree.value > 100 && sensorfour.value < 100) { 
   display.innerHTML = "8 lives";
} 
} else {
  display.innerHTML="";
}



});//closing sensorOne



});//closing board 

// display();

})();

