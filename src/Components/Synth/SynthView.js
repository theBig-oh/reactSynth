import React, { Component }  from 'react';
import MakeSound from '../../Tools/MakeSound';
import context from '../../Tools/audioContext';
import Synth from '../../Tools/Synth'; 
//              z  s  x  d  c  v  g  b  h   n  j
const keycodes = [90,83,88,68,67,86,71,66,72,78,74,77];

// 
/*
    OctKeycode has a bug dealing with keyboards. The '-' and '=' key is listed differently between a large keyboard and a laptop

*/


const octKeycode = [89,55,85,56,73,79,48,80,189,219,187,221];
//                y   7 u   8  i  o 0   p  -   [   =  ]



const eventKeys = [
                    ['z','s','x','d','c','v','g','b','h','n','j','m'],
                    ['y','7','u','8','i','o','0','p','-','[','=',']'],
                    ['_','{','+','}'], // 
                  ];


// This is more intended for a full scale keyboard. 
const auxKeycode = {
                    "numPad":[
                              96, //  0
                              97, //  1
                              98, //  2
                              99, //  3
                              100, // 4
                              101, // 5
                              102, // 6
                              103, // 7
                              104, // 8
                              105, // 9
                              110, // .
                              107, // +
                              109, // -
                              106, // *
                              111, // /
                            ],
                    "fullKeyInserGroup": [
                                          45, //  Insert
                                          46, //  Delete
                                          36, //  Home
                                          35, //  End
                                          33, //  Page Up / PgUp
                                          34, //  Page Down / PgDwn
                                        ]
                  };


// Set at Middle C.
const notes = [  {'tone':261,'rootNote':'c','kCode':[eventKeys[0][0],eventKeys[1][0]],'eventIndex':[0,12,24,36]},  // 0
                 {'tone':277,'rootNote':'c#','kCode':[eventKeys[0][1],eventKeys[1][1]],'eventIndex':[1,13,25,37]}, // 1
                 {'tone':293,'rootNote':'d','kCode':[eventKeys[0][2],eventKeys[1][2]],'eventIndex':[2,14,26,38]},   // 2 
                 {'tone':311,'rootNote':'d#','kCode':[eventKeys[0][3],eventKeys[1][3]],'eventIndex':[3,15,27,39]}, // 3 
                 {'tone':329,'rootNote':'e','kCode':[eventKeys[0][4],eventKeys[1][4]],'eventIndex':[4,16,28,40]},   // 4
                 {'tone':349,'rootNote':'f','kCode':[eventKeys[0][5],eventKeys[1][5]],'eventIndex':[5,17,29,41]},   // 5 
                 {'tone':369,'rootNote':'f#','kCode':[eventKeys[0][6],eventKeys[1][6]],'eventIndex':[6,18,30,42]}, // 6
                 {'tone':392,'rootNote':'g','kCode':[eventKeys[0][7],eventKeys[1][7]],'eventIndex':[7,19,31,43]},   // 7
                 {'tone':415,'rootNote':'g#','kCode':[eventKeys[0][8],eventKeys[1][8], eventKeys[2][0]],'eventIndex':[8,20,32,44]}, // 8
                 {'tone':440,'rootNote':'a','kCode':[eventKeys[0][9],eventKeys[1][9], eventKeys[2][1]],'eventIndex':[9,21,33,45]},   // 9
                 {'tone':466,'rootNote':'a#','kCode':[eventKeys[0][10],eventKeys[1][10], eventKeys[2][2]],'eventIndex':[10,22,34,46]}, //10 
                 {'tone':493,'rootNote':'b','kCode':[eventKeys[0][11],eventKeys[1][11], eventKeys[2][3]],'eventIndex':[11,23,35,47]}];  //11

function PianoKey(props, keyNum, keyType, noteName) {
  return <div className={`pianoKeys ${props.keyType} key_${props.keyNum}`}> {props.note} </div>
}





export default class SynthView extends Component {
  constructor() {
    super() 
    this.state = { 
      numberOfKeys: Array(48).fill(null),
      waveType: ['sine','square','triangle','sawtooth'],
      volume: 0.5,
      pianoKeys: [],
      activeSynth: [],
      adsr: [
            0.5, // Attack
            0.1, // Decay
            1,   // Sustain
            0.5  // Release
            ],
    }

  }

  initializeOscill() {
    const keyCount = this.state.numberOfKeys;
    const waveType = this.state.waveType[0];
    let synthArray = []; 

      for(let x=0; x<keyCount.length; x++) {
        let octaveNum = x%12;

        synthArray.push(Synth(x,octaveNum, waveType));
          
      }
      this.setState({
        activeSynth: synthArray,
      })

  
  }
  soundOn() {
    document.querySelector('body').addEventListener('keydown', (event) => {
      if(!event.metaKey) {
        event.preventDefault();
      }
      let synth = this.state.activeSynth;
      let shifted =event.shiftKey; 
      let eKey = event.key.toString().toLowerCase();
      let now = context.currentTime; 

      notes.forEach((note,i) => {
        let notePosition = 12; // Default will be middle C. 
        let midOvertone, lowerOvertone = null; // Debating to use this or not


        /*
          This can probably be
        
        */


        switch(eKey) {
          case note.kCode[0] :
            if(shifted) {
              notePosition = note.eventIndex[0];
              document.querySelector('.key_'+notePosition).classList.add('activeKey');
              synth[notePosition].start(this.state.volume, now, this.state.adsr[1])
            } else {
              notePosition = note.eventIndex[1];
              document.querySelector('.key_'+notePosition).classList.add('activeKey');
              synth[notePosition].start(this.state.volume, now, this.state.adsr[1])
            }
            break;
          case note.kCode[1] :
            if(shifted) {
              notePosition = note.eventIndex[3];
              document.querySelector('.key_'+notePosition).classList.add('activeKey');
              synth[notePosition].start(this.state.volume, now, this.state.adsr[1])
            } else {
              notePosition = note.eventIndex[2];
              document.querySelector('.key_'+notePosition).classList.add('activeKey');
              synth[notePosition].start(this.state.volume, now, this.state.adsr[1])
            }
            break;  
          case note.kCode[2] :
            if(shifted) {
              notePosition = note.eventIndex[3];
              document.querySelector('.key_'+notePosition).classList.add('activeKey');
              synth[notePosition].start(this.state.volume, now, this.state.adsr[1])
            } 
            break;                       
        }
      })
    })
  }
  soundOff() {
    document.querySelector('body').addEventListener('keyup', (event) => {
      if(!event.metaKey) {
        event.preventDefault();
      }
      let synth = this.state.activeSynth;
      let shifted =event.shiftKey; 
      let eKey = event.key.toString().toLowerCase();
      let now = context.currentTime; 
      notes.forEach((note,i) => {
        let notePosition = 12; // Default will be middle C. 
        let midOvertone, lowerOvertone = null;

        switch(eKey) {
          case note.kCode[0] :
            if(shifted) {
              notePosition = note.eventIndex[0];
              document.querySelector('.key_'+notePosition).classList.remove('activeKey');
              synth[notePosition].stop(0, now, this.state.adsr[3]);
            } else {
              notePosition = note.eventIndex[1];
              document.querySelector('.key_'+notePosition).classList.remove('activeKey');
              synth[notePosition].stop(0, now, this.state.adsr[3]);
            }
            break;
          case note.kCode[1] :
            if(shifted) {
              notePosition = note.eventIndex[3];
              document.querySelector('.key_'+notePosition).classList.remove('activeKey');
              synth[notePosition].stop(0, now, this.state.adsr[3]);
            } else {
              notePosition = note.eventIndex[2];
              document.querySelector('.key_'+notePosition).classList.remove('activeKey');
              synth[notePosition].stop(0, now, this.state.adsr[3]);
            }
            break;  
          case note.kCode[2] :
            if(shifted) {
              notePosition = note.eventIndex[3];
              document.querySelector('.key_'+notePosition).classList.remove('activeKey');
              synth[notePosition].stop(0, now, this.state.adsr[3]);
            } 
            break;                       
        }
      })
    })
  }


  componentWillMount() {
    this.initializeOscill();

  }
  componentDidMount() {
    this.soundOn();
    this.soundOff();
  }

  changeVol(volVal) {
    const newVol = volVal / 100;

    this.setState({
      volume: newVol
    })
  }

  render() {
    let blackKeys = [];
    let whiteKeys = [];
    const numOfKeys = this.state.numberOfKeys;
    const blackKeyOrder = [1,3,6,8,10];
    const numOfFans = Array(6).fill(null);
    numOfKeys.map((pianoKey, i) => {
      let octaveNum = i%12;
      let whiteOrBlackKey = 'whiteKeys';
      let noteName = null;
      let noteTrigger = null;
      let needShift = true;
      if(i >= 24 && i <= 35) {
          noteName = notes[octaveNum].rootNote + '5';
          noteTrigger = notes[octaveNum].kCode[1];
          needShift = false;
        } else if (i >= 11 && i <= 23) {
          noteName = notes[octaveNum].rootNote + '4';
          noteTrigger = notes[octaveNum].kCode[0];
          needShift = false;
        } else if(i >= 36) {
          noteName = notes[octaveNum].rootNote + '6';
          noteTrigger = notes[octaveNum].kCode[1];
        } else {
          noteName = notes[octaveNum].rootNote + '3';
          noteTrigger = notes[octaveNum].kCode[0]; 
       }
       if(blackKeyOrder.includes(octaveNum)) {
        whiteOrBlackKey = 'blackKeys';
       }
       let pKey = <PianoKey key={'renderPiano_'+i} shiftRequired={needShift} keyNum={i} keyType={whiteOrBlackKey} triggerCode={noteTrigger} note={noteName} />;
       
        this.state.pianoKeys.push(pKey);
    })



    return(
        <div className='synthView'>
          <div className='synthConsole'>
           <div className='leftSpeakerArray speakerArray'> 
             <div className='topSpeakerPart leftSpeaker'>
             {
              numOfFans.map((key,i)=>{
                return (
                    <div className={`speakerFan fan_${i}`}></div>

                  )
              })

             }
            </div>
            <div className='bottomSpeakerPart leftSpeaker'>
             {
              numOfFans.map((key,i)=>{
                return (
                    <div className={`speakerFan fan_${i}`}></div>

                  )
              })

             }
            </div>

           </div>
            <div className='consoleControls'>
              <div className='leftSide consolePart'>
                <div className='volume_control'>
                  <input type='range'className='vol_slide' max={100} min={0} onChange={(e)=>{this.changeVol(e.target.value)}}/> 
                </div>
              </div>
              <div className='midSide consolePart'>
                  <div className='consoleDisplay standIn'> </div>
              </div>
              <div className='rightSide consolePart'>

              </div>
            </div>

           <div className='rightSpeakerArray speakerArray'> 
             <div className='topSpeakerPart rightSpeaker'>
             {
              numOfFans.map((key,i)=>{
                return (
                    <div className={`speakerFan fan_${i}`}></div>

                  )
              })

             }
            </div>
            <div className='bottomSpeakerPart rightSpeaker'>
             {
              numOfFans.map((key,i)=>{
                return (
                    <div className={`speakerFan fan_${i}`}></div>

                  )
              })

             }
            </div>

           </div>
          </div> 
          <div className='synthKeys'>
            <div className='whiteKeyRow'>
              {
                this.state.pianoKeys.map((pK,i)=> {
                  let octaveNum = i%12;
             

                  if(!blackKeyOrder.includes(octaveNum)) {
                    return pK
                  } 
                  
                })


              }
            </div>
            <div className='blackKeyRow'>
              {

                this.state.pianoKeys.map((pK,i)=> {
                  let octaveNum = i%12;
                  

                  if(blackKeyOrder.includes(octaveNum)) {
                    return pK
                  }
                })

              }
            </div>
          </div> 
        </div>
      )
  }
}