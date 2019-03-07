import React, { Component } from 'react';
import WaveSurfer from 'wavesurfer.js';
import { Link } from 'react-router-dom';

class Wavesurfer extends Component {
  
  state = {
    isPlaying: false,
    currentTime: "",
    duration: 0
  };
  
  componentDidMount() {
    this.wavesurfer = WaveSurfer.create({
      container: '#waveform'+this.props.identifier,
      waveColor: 'Cornsilk',
      progressColor: 'rgb(121, 0, 0)',
      height: '90',
      cursorColor: 'red'
    });
    this.wavesurfer.load(this.props.upload_url);
    this.wavesurfer.on('ready', () => {
      this.setState({
        duration: this.wavesurfer.getDuration()
      })
    })
  }

  componentWillUnmount() {
    this.wavesurfer.destroy();
    clearInterval(this.intervalId)
  }
  
  playButton = () => {
    this.wavesurfer.playPause();
    if (this.state.isPlaying) {
      this.setState( {
        isPlaying: false
      })
      clearInterval(this.intervalId)
    }
    else {
      this.setState( {
        isPlaying: true
      })
      this.intervalId = setInterval(() => {
        this.setState({
          currentTime: this.wavesurfer.getCurrentTime()
        })
      }, 200)
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

  handleClick = () => {
    setTimeout(() => {
      this.setState({
        currentTime: this.wavesurfer.getCurrentTime()
      })
    }, 200)
  }

  render() {

    let isLoaded = this.state.duration > 0
    
    return(
      <div onClick={this.handleClick}>
        <div className='track-info-container'>
          <div className={this.props.trackinfo}>
            <div className={this.props.artistclass}>
              <Link style={{textDecoration: 'none', color: 'cornsilk'}} className="link" to={`/profile/${this.props.artist}`}>{this.props.artist}
              </Link>
            </div>
            <div className="title">
              <Link style={{textDecoration: 'none', color: 'white'}} className="link" to={`/track/${this.props.identifier}`}>{this.props.title}
              </Link>
            </div>
          </div>
          <div>
            <Link style={{textDecoration: 'none', color: 'white', paddingRight: '4vw'}} className="link" to={`/album/${this.props.album}`}>{this.props.album}
            </Link>
          </div>
        </div>
        
        <div className={this.props.media}>
          <div className="control-panel">          
            <button className="play-button" onClick={this.playButton}>
              <img src={(this.state.isPlaying ? "pause" : "play") + "-button-white.png"} alt=""/>
            </button>
            <div className="media-time">
              <p><span style={{ color: 'cornsilk' }}>{this.convertNumberToMinutesSeconds(this.state.currentTime)}</span> <span style={{ color: 'grey' }}> / </span>{this.convertNumberToMinutesSeconds(this.state.duration)}</p>
            </div>
          </div>

          <div>
            {!isLoaded && <div><div className="loader"/>Loading...</div>}
          </div>

          <div className={this.props.waveform} id={`waveform${this.props.identifier}`}>
          </div>
        </div>
      </div>
    )
  }
}

export default Wavesurfer;