var five = require("johnny-five")
var board = new five.Board();
var startTime = new Date().getTime()

board.on("ready", function(){

	console.log("ready");

	led = new five.Led(9);

	var sensor = new five.Sensor({pin:"A0", freq:25});

	sensor.scale([0, 70]).on("data", function(){
		led.pulse(this.scaled);
		console.log(this.scaled);

	});
	
});

