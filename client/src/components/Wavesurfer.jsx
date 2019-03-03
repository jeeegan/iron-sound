import React, { Component } from 'react';
import WaveSurfer from 'wavesurfer.js';

class Wavesurfer extends Component {
  componentDidUpdate() {
    if (this.wavesurfer) return;
    this.wavesurfer = WaveSurfer.create({
      container: '#waveform',
      waveColor: '#FC0',
      progressColor: 'grey'
    });
    this.wavesurfer.load('track1.mp3');
  }

  playButton = () => {
    this.wavesurfer.playPause();
  }

  render() {
    return(
      <div>
        <div id="waveform"></div>
        <button onClick={this.playButton}>Play</button>
      </div>
    )
  }
}

export default Wavesurfer;