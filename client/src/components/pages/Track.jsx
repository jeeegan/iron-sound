import React, { Component } from 'react';
import api from '../../api';
import Wavesurfer2 from '../Wavesurfer2';
import { Link } from 'react-router-dom';

class Track extends Component {
  state = {}

  componentDidMount() {
    api.getTrack(this.props.match.params.trackid)
    .then(res => {
      this.setState(res);
    })
    .catch(console.log);
    
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
      .catch(err => this.setState({ message: err.toString() }))
  }
  
  render() {     
    return (
      <div className="pageContent">
        <div className="track-art-container">     {this.state.track_img && <img className="track-art" alt="track cover"src={this.state.track_img}/>}
        </div>
        <div className="media-2-container">
          <h3>{this.state.title}</h3>
          <Link style={{textDecoration: 'none', color: 'cornsilk'}} className="link" to={`/profile/${this.state.artist}`}>{this.state.artist}
          </Link>
        </div>
        <Wavesurfer2 
            key={this.state._id} 
            identifier={this.state._id} 
            upload_url={this.state.upload_url} 
            artist={this.state.artist} 
            title={this.state.title}
            media="media-player"
            trackinfo="track-info"
            waveform="waveform-right"
          />  

        {/* <form className="form-vertical">
          <input type="file" onChange={(e) => this.handleFileUpload(e)} /> <br />
          <button className="form-button" onClick={(e) => this.handleClick(e)}>Upload</button>
        </form> */}
      </div>
    );
  }
}

export default Track;