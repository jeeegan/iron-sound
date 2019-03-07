import React, { Component } from 'react';
import WaveSurfer from 'wavesurfer.js';
import { Link } from 'react-router-dom';

class Wavesurfer extends Component {
  state = {
    buttonimg: "/play-button-white.png",
    currentTime: "",
    duration: ""
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

    setInterval(() => {
      this.setState({
        currentTime: this.wavesurfer.getCurrentTime()
      })
    }, 200)
  }

  componentWillUnmount() {
    this.wavesurfer.destroy();
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
            <Link style={{textDecoration: 'none', color: 'white'}} className="link" to={`/track/${this.props.identifier}`}>{this.props.title}
            </Link>
          </div>
        </div>
        
        <div className={this.props.media}>
          <div className="control-panel">          
            <button className="play-button" onClick={this.playButton}>
              <img src={this.state.buttonimg} alt=""/>
            </button>
            <div className="media-time">
              <p><span style={{ color: 'cornsilk' }}>{this.convertNumberToMinutesSeconds(this.state.currentTime)}</span> <span style={{ color: 'grey' }}> / </span>{this.convertNumberToMinutesSeconds(duration)}</p>
            </div>
          </div>

          <div className={this.props.waveform} id={`waveform${this.props.identifier}`}></div>
        </div>
      </div>
    )
  }
}

export default Wavesurfer;