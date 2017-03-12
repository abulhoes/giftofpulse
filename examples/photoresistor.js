var five = require("johnny-five");
var board = new five.Board();
var photoresistor;

board.on("ready", function() {
photoresistor = new five.Sensor({pin: "A2",freq: 250});

	var led = new five.Led.RGB({
		pins: {red: 6, green: 5, blue: 3}

	});
	var piezo = new five.Piezo(10);

photoresistor.on("data", function() {
		console.log(this.value);
		var newBlue = (this.value*0.3) - 100;
		var newRed = this.value*0.1;
		var newGreen = (this.value*0.2) -50;
		led.color([newRed,newBlue,newGreen]);
		piezo.frequency(this.value, 1000);
	});

});

