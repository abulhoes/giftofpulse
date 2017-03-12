
var rate = [10], //hold last IBI values   
      sampleCounter = 0, //used to determine the pulse timing
      lastBeatTime = 0, //used to find IBI which is inter Beat interval, meauses the time between each pulse 
      peak = 512, //used to find peak in pulse wave              
      trough = 512,  //used to find trough in pulse wave                 
      thresh = 525,  //find instant moment of heart beat
      amp = 100,  //hold ampluite of pulse wave form            
      firstBeat = true, //start with reasonable BPM according to the rate array      
      secondBeat = false, // 
      IBI = 600, // time interval between beats, this must be seeded 
      Pulse = false,
      BPM,
      Signal,
      QS = false;


var five = require('johnny-five'),
      board, sensor;
board = new five.Board();

board.on('ready', function() {

	led = new five.Led(9);

    sensor = new five.Sensor({
                pin: "A0",
                freq: 25
            });        

    	console.log('Ready');
            sensor.scale([0,1024]).on("data", function() {
                  Signal = this.scaled;
                  find_bpm();

                if(QS === true) {
                    console.log('BPM : ', BPM); 
                    led.pulse(BPM);
                    QS = false;
        } 
            });                    
});
//this is used to make our data more accurate. 
function find_bpm() {

            sampleCounter += 2; //goes up by 2                          
            noise = sampleCounter - lastBeatTime;       //monitors the time since the last 

            if(Signal < thresh && noise > (IBI/5)*3) { //both statments must be true
                  if (Signal < trough) {                        
                        trough = Signal;                  
                  }
            }

            if(Signal > thresh && Signal > peak) {          
                  peak = Signal;                             
            }                                       


            if (noise > 250) {   

              if ((Signal > thresh) && (Pulse === false) && (noise > (IBI/5)*3)) {        
                  Pulse = true;                               
                  IBI = sampleCounter - lastBeatTime;         
                  lastBeatTime = sampleCounter;               

                  if(secondBeat) {                        
                      secondBeat = false;                  
                      for(var i=0; i<=9; i++){             
                          rate[i] = IBI;                      
                      }
                  }

                  if(firstBeat) {                         
                      firstBeat = false;               
                      secondBeat = true;      
                      return;                              
                  }   


                  var runningTotal = 0;                 

                  for(var i=0; i<=8; i++) {              
                      rate[i] = rate[i+1];                  
                      runningTotal += rate[i];         
                  }

                  rate[9] = IBI;                          
                  runningTotal += rate[9];        
                  runningTotal /= 10;               
                  BPM = 60000/runningTotal; 
                  QS = true;                            
              }                       
          }

          if (Signal < thresh && Pulse === true){   
              Pulse = false;                         
              amp = peak - trough;                           
              thresh = amp/2 + trough;               
              peak = thresh;                            
              trough = thresh;
          }

          if (noise > 2500) {                           
              thresh = 512;                        
              peak = 512;                               
              trough = 512;                               
              lastBeatTime = sampleCounter;         
              firstBeat = true;                      
              secondBeat = false;               
          }
} 