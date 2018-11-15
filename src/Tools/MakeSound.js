import context from './audioContext.js';

export default class MakeSound {
  constructor(context, frequency, waveType, detune) {
    this.oscillator = context.createOscillator();
    this.gainNode = context.createGain();
    this.volume = this.gainNode.gain;
    this.oscillator.type = waveType;
    this.oscillator.frequency.value = frequency;
    this.volume.value = 0;
    console.log(this);
    this.oscillator.connect(this.gainNode);
    this.gainNode.connect(context.destination);

    this.oscillator.start(0);
  } 

  start(volSet, time) {
    this.volume.value = volSet;
  }
  stop(volSet, time) {
    this.volume.value = volSet;
  }
  disconnect() {
    this.oscillator.disconnect();
  }
} 