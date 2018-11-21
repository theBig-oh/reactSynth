/*import '../css/style.scss';
import MakeElement from './Tools/MakeElement.js';





function RenderSite(){
  let body = document.querySelector('body');

  console.log(body);

  let makeEle = new MakeElement;

  let bodyContainer = makeEle.createEle('div','bodyContainer',[12,12,12,12],'bodyContain');  
      bodyContainer.innerHTML = `<div> Hey, Welcome to PureJS </div>`;

  
  body.append(bodyContainer);
}

RenderSite(); */
import '../css/style.scss';
import React, {Component} from 'react';
import ReactDOM from 'react-dom';
import SynthView from './Components/Synth/SynthView.js';

const targetBodyElement = document.querySelector('#root');



class App extends Component {
  constructor() {
    super();
  }

  render() {


    return (
        <div className='appContainer divContainer'>
  
          <SynthView />

        </div>  

      )
  }
}


ReactDOM.render(<App />, targetBodyElement);