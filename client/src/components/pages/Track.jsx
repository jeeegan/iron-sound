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
      <form className="form-vertical">
          <img src={this.state.track_img}/>
          Upload Image: <input type="file" onChange={(e) => this.handleFileUpload(e)} /> <br />

          <button className="form-button" onClick={(e) => this.handleClick(e)}>Upload</button>
        </form>
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