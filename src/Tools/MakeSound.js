import context from './audioContext.js';

/*
  Currently uses a really fake version of a fourier equation to calculate 
    overtones. 


  This current one on 'centValues', returns back a 
    tone with Major Chord overtones.

  Need to check other methods for more sound "presets". 


*/



export default class MakeSound {
  constructor(context, frequency, waveType, detune) {
    this.overtoneCount = Array(12).fill(null);
    this.oscBank = {};

    const centValues = [0,2,-14,14]; // Major overtones 
    this.overtoneCount.map((osci,i) => {
      if(!this.oscBank[i]) {
       this.oscBank[i] = {
        "osci": context.createOscillator(),
        "gain": context.createGain(),
       }

       /*
          Some functions act funky when done 
      
       */

       this.oscBank[i].osci.frequency.value = frequency;
       this.oscBank[i].osci.detune.value = centValues[i%centValues.length];
       this.oscBank[i].gain.gain.setValueAtTime(0, 0);
       this.oscBank[i].osci.connect(this.oscBank[i].gain);
       this.oscBank[i].gain.connect(context.destination);
       this.oscBank[i].osci.start(0);

      }

    })


  } 


  /*

      Notes for myself: 

      - Triangle wave type with current centValues makes it sound like an accordion.
      - Currently there's a problem on setting the decay value. 
        - Tried to use a modulo to config each osc in the oscBank, to either a 
            Attack - 
              - Sets the ramp up to the master volume aka volSet, with 
                atkVal as the time to the master volume

            sustain value
              - Decays down from the Attack volume, to the sustain volume aka susVa, using 
                the decayVal.
        - Tried to use another Synth bank ( A ready set of constructed keys in SynthView ) 
          to supplement with the decay/sustain
        
        - Both methods caused the oscillators to glitch and ignore the keyup function,
          and play indefinitely after a certain amount of time. 

        - Current method just sets it to master volume once it reaches its attack length. 
        - Same goes for the stop(), except with the release length aka releaseVal.
  
      - Seems adding the startDecay() into the start() might work as a temp fix. 
        - Sounds awesome on square and sawtooth wave types. 
          - Can possibly play eruption or push it to the limit
        - Sine wave type sounds very dissonant.   

  */


  start(volSet, time, atkVal, decayVal,susVal, releaseVal, waveType, repeat) {
    console.log(this.oscBank);
    const tones = this.overtoneCount;
    const volRatio = [1,0.5,0.33,0.25,0.10];
    console.log(volSet);
    tones.map((oscii,i) => {
      let masterOrSus = repeat ? [(susVal * volRatio[i]).toFixed(tones.length + 1), time + decayVal] : [(volSet * volRatio[i]).toFixed(tones.length + 1), time + atkVal]; 


/*
      This works for now. 

      If the event that's being passed is repeated, which returns as true, then it will adjust the volume to the sustain level. 

*/

      this.oscBank[i].gain.gain.linearRampToValueAtTime(masterOrSus[0], masterOrSus[1]);
      if(repeat) {
        this.oscBank[i].gain.gain.linearRampToValueAtTime(masterOrSus[0], masterOrSus[1]);
      }
      this.oscBank[i].osci.type = Array.isArray(waveType) ? waveType[i%waveType.length] : waveType; // Implementation of this will be done later
   
    })
  }
  stop(volSet, time, atkVal, decayVal,susVal, releaseVal, waveType) {
    const tones = this.overtoneCount;
    const volRatio = [1,0.5,0.33,0.25,0.10];
    console.log('stopped');

    tones.map((oscii,i) => {

      this.oscBank[i].gain.gain.linearRampToValueAtTime(0, time + releaseVal);

    })
  }
  startDecay(susVal, time, decayVal, waveType) {
    const tones = this.overtoneCount;
    const volRatio = [1,0.5,0.33,0.25,0.10];
    console.log(susVal, time, decayVal, waveType);
    console.log('from startDecay()');
    tones.forEach((oscii,i)=> {
      this.oscBank[i].gain.gain.linearRampToValueAtTime((susVal * volRatio[i%volRatio.length]).toFixed(volRatio.length), time + decayVal);
      this.oscBank[i].osci.type = Array.isArray(waveType) ? waveType[i%waveType.length] : waveType; // Implementation of this will be done later
      
    })

  }
  disconnect() {
    this.oscillator.disconnect();
  }
} 