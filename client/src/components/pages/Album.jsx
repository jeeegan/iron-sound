import React, { Component } from 'react';
import api from '../../api';
import Wavesurfer from '../Wavesurfer';

class Album extends Component {
  state = {}

  componentDidMount() {
    api.getAlbum(this.props.match.params.name)
    .then(res => {
      this.setState({tracks: res});
      console.log(this.state.tracks);
    })
    .catch(console.log);
    
  }
  
  render() {     
    return (
      <div className="pageContent">
        <div>
          <img src={this.state.tracks && this.state.tracks[0].track_img}/>
        </div>
        <div>
          {this.state.tracks && this.state.tracks.map( (track) => {
            return <Wavesurfer 
              key={track._id} 
              identifier={track._id} 
              upload_url={track.upload_url} 
              artist={track.artist} 
              title={track.title}
              genre={track.genre}
              media="media-player"
              trackinfo="track-info"
              waveform="waveform-right"
              artistclass="artist"
            />})
          }
        </div>
      </div>
    );
  }
}

export default Album;