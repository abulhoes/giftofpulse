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
var count = 0;
var touch = new five.Button({
  pin:9
 
});
// var touch2 = new five.Button({
//   pin:10

// });


console.log(count);

function increaseCount()
{
  count++;
}

function decreaseCount()
{
  count--;
}

  touch.on("down", function(){
    increaseCount();
      redLed1.pulse();
      blueLed1.blink();
      display.innerHTML= count; 
  });

  touch.on("up", function(){
    decreaseCount();

     blueLed1.stop();
      redLed1.stop();
      blueLed1.off();
       redLed1.off();
       display.innerHTML = count;
  });

  // touch2.on("down", function(){
  //   touched2 = 1;
  //   increaseCount();
  //   if(touched2 = 1){
  //     redLed2.pulse();
  //     blueLed2.blink();
  //     display.innerHTML = count;
  //   }   
  // });

  // touch2.on("up", function(){
  //   touched2 = 0;
  //   decreaseCount();
  //    blueLed2.stop();
  //     redLed2.stop();
  //     blueLed2.off();
  //      redLed2.off();
  //      display.innerHTML = count;
  // });




});//closing board 

// display();

})();