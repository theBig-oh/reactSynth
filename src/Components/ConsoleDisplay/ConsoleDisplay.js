import React, { Component }  from 'react';
import MakeSound from '../../Tools/MakeSound';
import context from '../../Tools/audioContext';





export default class ConsoleDisplay extends Component { 
  constructor() {
    super()
  }

  render() {

    let masterVol = this.props.masterVol,
        ADSRNames = ['attack','decay','sustain','release'],
        ADSRVals = this.props.adsrVals.map((adsr,i) => {
            return (
                <div key={`console_adsr_display_${i}`}className={`console_adsr_${ADSRNames[i]} console_adsr`}>
                    <div className='console_adsr_display_title'>
                      {ADSRNames[i]}
                    </div>
                    <div className='console_adsr_display_value'>
                      {adsr}
                    </div>

                </div>
              )
    });

    return (
        <div className='console_display'> 
          <div className='console_display_innerContainer'> 
            <div className='console_canvas'>

            </div>
            <div className='adsr_value_display'>
              {
                ADSRVals
              }
            </div>        
          </div>
        </div>
      )
  }
}