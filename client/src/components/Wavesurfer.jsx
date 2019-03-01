import React, { Component } from 'react';
import WaveSurfer from 'wavesurfer.js';

class Wavesurfer extends Component {
  componentDidUpdate() {
    if (this.wavesurfer) return;
    this.wavesurfer = WaveSurfer.create({
      container: '#waveform',
      waveColor: 'violet',
      progressColor: 'purple'
    });
    this.wavesurfer.load('track1.mp3');
  }

  onClickButton = () => {
    this.wavesurfer.playPause();
  }

  render() {
    return(
      <div>
        <div id="waveform"></div>
        <button onClick={this.onClickButton}>Play</button>
      </div>
    )
  }
}

export default Wavesurfer;