import React, { Component } from 'react';
import WaveSurfer from 'wavesurfer.js';

class Wavesurfer extends Component {
  state = {
    buttonimg: "/play-button-white.png",
    duration: ""
  };
  
  componentDidUpdate() {
    if (this.wavesurfer) return;
    this.wavesurfer = WaveSurfer.create({
      container: '#waveform',
      waveColor: 'Cornsilk',
      progressColor: 'maroon',
      height: '90',
      cursorColor: 'red'
    });
    this.wavesurfer.load('track1.mp3');
  }

  playButton = () => {
    this.wavesurfer.playPause();
    if (this.state.buttonimg === "/play-button-white.png") {
      return this.setState( {buttonimg: "/pause-button-white.png"} )
    } else {
      return this.setState( {buttonimg: "/play-button-white.png"} )
    }  
  }

  render() {
    return(
      <div>
        <div className="media-player">

          <div className="control-panel">
            <button className="media-controls play-button" onClick={this.playButton}>
              <img src={this.state.buttonimg} alt=""/>
            </button>
            <div className="media-time">
              <p>{this.state.duration}</p>
            </div>
          </div>

          <div className="waveform-right" id="waveform"></div>

        </div>
      </div>
    )
  }
}

export default Wavesurfer;