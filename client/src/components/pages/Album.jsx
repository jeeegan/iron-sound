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
        <div className="track-art-container">
          {!(this.state.tracks && this.state.tracks[0].track_img)
            ? 
              ((this.state.isOwner && !this.state.tracks[0].track_img)
              ?
                <form style={{paddingTop: '30vh'}} className="form-vertical">
                  <input style={{ display: 'block', margin: 'auto' }} type="file" onChange={(e) => this.handleFileUpload(e)} /> <br />
                  <button className="form-button" onClick={(e) => this.handleClick(e)}>Upload</button>
                </form> : null)
            :
              <img className="track-art" alt="track cover" src={this.state.tracks && this.state.tracks[0].track_img}/>
          }
        </div>

        <div className="album-info">
          <h3>{this.state.tracks && this.state.tracks[0].album}</h3>
          <h7>{this.state.tracks && this.state.tracks[0].genre}</h7> <br/>
          <h7>{this.state.tracks && this.state.tracks[0].year}</h7>
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