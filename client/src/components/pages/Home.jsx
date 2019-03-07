import React, { Component } from 'react';
import Wavesurfer from '../Wavesurfer';

class Home extends Component {

  render() {   
    return (
      <div className="Home pageContent">
        <div>
          <div className="logo">
            <img src="/WaveTerminalFONT.png" alt="home logo" style={{
              width: '70%',
              height: 'auto',
              margin: 'auto',
              display: 'block',
            }}/>
          </div>
          
          {this.props.uploads && this.props.uploads.map( upload => {
            return <Wavesurfer 
              key={upload._id} 
              identifier={upload._id} 
              upload_url={upload.upload_url} 
              artist={upload.artist} 
              title={upload.title}
              genre={upload.genre}
              media="media-player"
              trackinfo="track-info"
              waveform="waveform-right"
              artistclass="artist"
            />
          })}
        </div>
      </div>
    );
  }
}

export default Home;
