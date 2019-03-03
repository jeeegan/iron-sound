import React, { Component } from 'react';
import WaveSurfer from 'wavesurfer.js';

class Wavesurfer extends Component {
  componentDidUpdate() {
    if (this.wavesurfer) return;
    this.wavesurfer = WaveSurfer.create({
      container: '#waveform',
      waveColor: 'Cornsilk',
      progressColor: 'Maroon',
      height: '110',
      cursorColor: 'white'
    });
    this.wavesurfer.load('track1.mp3');
  }

  playButton = () => {
    this.wavesurfer.playPause();
  }

  render() {
    return(
      <div>
        <div className="media-player">
          <div className="waveform-right" id="waveform"></div>
          <div className="media-left">
            <button className="media-controls play-button" onClick={this.playButton}>
              <img src="/play-button-white.png" alt=""/>
            </button>
          </div>
        </div>
      </div>
    )
  }
}

export default Wavesurfer;