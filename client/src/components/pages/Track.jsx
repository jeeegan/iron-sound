import React, { Component } from 'react';
import api from '../../api';
import Wavesurfer from '../Wavesurfer';

class Track extends Component {
  state = {}

  componentDidMount() {
    api.getTrack(this.props.match.params.trackid)
    .then(res => {
      this.setState(res);
    })
    .catch(console.log);
    
  }
  
  render() {     
    return (
      <div className="pageContent">
        <div>
        <h3>{this.state.title}</h3><br/>
        </div>
        <Wavesurfer 
            key={this.state._id} 
            identifier={this.state._id} 
            upload_url={this.state.upload_url} 
            artist={this.state.artist} 
            title={this.state.title}
            media="media-player"
            trackinfo="track-info"
            waveform="waveform-right"
          />  
      </div>
    );
  }
}

export default Track;