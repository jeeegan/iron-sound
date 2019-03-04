import React, { Component } from 'react';
import WaveSurfer from 'wavesurfer.js';

class Wavesurfer extends Component {
  state = {
    buttonimg: "/play-button-white.png",
    currentTime: "",
    duration: ""
  };
  
  componentDidMount() {
    this.wavesurfer = WaveSurfer.create({
      container: '#waveform',
      waveColor: 'Cornsilk',
      progressColor: 'maroon',
      height: '90',
      cursorColor: 'red'
    });
    this.wavesurfer.load('track1.mp3');

    setInterval(() => {
      this.setState({
        currentTime: this.wavesurfer.getCurrentTime()
      })
    }, 200)
  }

  playButton = () => {
    this.wavesurfer.playPause();
    if (this.state.buttonimg === "/play-button-white.png") {
      return this.setState( {buttonimg: "/pause-button-white.png"} )
    } else {
      return this.setState( {buttonimg: "/play-button-white.png"} )
    }  
  }

  convertNumberToMinutesSeconds(numberOfSeconds) {
    let min = Math.floor(numberOfSeconds / 60)
    let sec = Math.floor(numberOfSeconds % 60)
    if (sec < 10) {
      sec = "0" + sec;
    }
    return min + ":" + sec
  }

  render() {
    let duration = this.wavesurfer && this.wavesurfer.getDuration()
    return(
      <div>
        <div className="track-info">
          <div className="artist">{this.props.artist}</div>
          <div className="title">{this.props.title}</div>
        </div>
        <div className="media-player">
          <img className="album-art" src="albumart.jpg" alt="album-art"/>
          <div className="control-panel">          
            <button className="play-button" onClick={this.playButton}>
              <img src={this.state.buttonimg} alt=""/>
            </button>
            <div className="media-time">
              <p>{this.convertNumberToMinutesSeconds(this.state.currentTime)} / {this.convertNumberToMinutesSeconds(duration)}</p>
            </div>
          </div>

          <div className="waveform-right" id="waveform"></div>
        </div>
      </div>
    )
  }
}

export default Wavesurfer;