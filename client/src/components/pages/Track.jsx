import React, { Component } from 'react';
import api from '../../api';
import Wavesurfer from '../Wavesurfer';
import { Link } from 'react-router-dom';

class Track extends Component {
  state = {
    isOwner: false
  }

  componentDidMount() {
    api.getTrack(this.props.match.params.trackid)
    .then(res => {
      this.setState(res);
      this.isOwner();
    })
    .catch(err => console.log(err));
    
  }

  handleFileUpload = e => {
    this.setState({
      track_img: e.target.files[0]
    })
  }

  handleClick(e) {
    e.preventDefault()
    let formData = new FormData();
    formData.append("album", this.state.album);
    formData.append("track_img", this.state.track_img);
    api.uploadTrackImage(formData)
      .then(result => {
        this.props.history.push("/") // Redirect to the home page
      })
      .catch(err => console.log(err))
  }

  isOwner() {
    api.userData()
      .then(res => {
        if(res._id === this.state._created_by) {
          this.setState({
            isOwner: true
          });
        }
      })
      .catch(err => console.log(err));
  }
  
  render() {     
    return (
      <div className="pageContent">
        <div className="track-art-container">
          {(this.state.isOwner && !this.state.track_img)
              ? 
                  <form className="form-vertical">
                    <input type="file" onChange={(e) => this.handleFileUpload(e)} /> <br />
                    <button className="form-button" onClick={(e) => this.handleClick(e)}>Upload</button>
                  </form>
              :
                (this.state.track_img 
                  ?
                    <img className="track-art" alt="track cover" src={this.state.track_img}/>
                  :
                    null
                )
            }
        </div>
        {/* <div className="media-2-container">
          <h3>{this.state.title}</h3>
          <Link style={{textDecoration: 'none', color: 'cornsilk'}} className="link" to={`/profile/${this.state.artist}`}>{this.state.artist}
          </Link>
        </div> */}
        <Wavesurfer 
            key={this.state._id} 
            identifier={this.state._id} 
            upload_url={this.state.upload_url} 
            artist={this.state.artist}
            album={this.state.album} 
            albumClass='album'
            title={this.state.title}
            media="media-player"
            trackinfo="track-info"
            waveform="waveform-right"
            artistclass="artist"
          />  
      </div>
    );
  }
}

export default Track;