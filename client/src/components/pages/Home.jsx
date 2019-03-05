import React, { Component } from 'react';
import Wavesurfer from '../Wavesurfer';

class Home extends Component {

  render() {   
    return (
      <div className="Home pageContent">
        <div>
          {this.props.uploads && this.props.uploads.map( upload => {
            return <Wavesurfer 
              key={upload._id} 
              identifier={upload._id} 
              upload_url={upload.upload_url} 
              artist={upload.artist} 
              title={upload.title}
              media="media-player"
              trackinfo="track-info"
              waveform="waveform-right"
            />
          })}
        </div>
      </div>
    );
  }
}

export default Home;
