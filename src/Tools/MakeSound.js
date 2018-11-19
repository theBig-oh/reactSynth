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

       this.oscBank[i].osci.frequency.value = frequency;
       this.oscBank[i].osci.detune.value = centValues[i%centValues.length];
       this.oscBank[i].gain.gain.setValueAtTime(0, 0);
       this.oscBank[i].osci.connect(this.oscBank[i].gain);
       this.oscBank[i].gain.connect(context.destination);
       this.oscBank[i].osci.start(0);

      }

    })


  } 

  start(volSet, time, atkVal, decayVal) {
    console.log(this.oscBank);
    const tones = this.overtoneCount;
    const volRatio = [1,0.5,0.33,0.25,0.10];
    tones.map((oscii,i) => {
      this.oscBank[i].gain.gain.linearRampToValueAtTime((volSet * volRatio[i]).toFixed(tones.length + 1), time + atkVal);
      this.oscBank[i].osci.type = 'triangle';
    })
  }
  stop(volSet, time, decayVal) {
    console.log(this.oscBank);
    const tones = this.overtoneCount;

    const volRatio = [1,0.5,0.33,0.25,0.10]
    tones.map((oscii,i) => {
      this.oscBank[i].gain.gain.linearRampToValueAtTime((volSet * volRatio[i]).toFixed(tones.length + 1), time + decayVal);

    })
  }
  disconnect() {
    this.oscillator.disconnect();
  }
} 