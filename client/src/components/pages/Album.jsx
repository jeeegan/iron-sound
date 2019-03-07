import React, { Component } from 'react';
import api from '../../api';
import Wavesurfer from '../Wavesurfer';

class Album extends Component {
  state = {
    isOwner: false
  }

  componentDidMount() {
    api.getAlbum(this.props.match.params.name)
    .then(res => {
      this.setState({tracks: res});
      this.isOwner()
    })
    .catch(console.log);
  }

  isOwner() {
    api.userData()
      .then(res => {
        if(res._id === this.state.tracks[0]._created_by) {
          this.setState({
            isOwner: true
          });
        }
      })
      .catch(console.log);
  }
  
  render() {     
    return (
      <div className="pageContent">
        <div>
          
          {!(this.state.tracks && this.state.tracks[0].track_img)
            ? 
              ((this.state.isOwner && !this.state.tracks[0].track_img)
              ?
                <form className="form-vertical">
                  <input type="file" onChange={(e) => this.handleFileUpload(e)} /> <br />
                  <button className="form-button" onClick={(e) => this.handleClick(e)}>Upload</button>
                </form> : null)
            :
              <img alt="track cover" src={this.state.tracks && this.state.tracks[0].track_img}/>
          }
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