import React, { Component } from 'react';
import api from '../../api';

class Upload extends Component {
  constructor(props) {
    super(props);
    this.state = {
      title: "",
      artist: "",
      album: "",
      year: 1990,
      genre: "",
      tags: [],
      embed_url: "",
      host: 'bc',
      upload_img: null,
      upload_type: "track",
    };
  }

  handleInputChange(stateFieldName, event) {
    this.setState({
      [stateFieldName]: event.target.value
    })
  }

  handleFileUpload = e => {
    this.setState({
      upload_img: e.target.files[0]
    })
  }

  handleClick(e) {
    e.preventDefault()
    let formData = new FormData();
    formData.append("title", this.state.title);
    formData.append("artist", this.state.artist);
    formData.append("album", this.state.album);
    formData.append("year", this.state.year);
    formData.append("genre", this.state.genre);
    formData.append("tags", this.state.tags);
    formData.append("embed_url", this.state.embed_url);
    formData.append("host", this.state.host);
    formData.append("upload_img", this.state.upload_img);
    formData.append("upload_type", this.state.upload_type);
    api.upload(formData)
      .then(result => {
        console.log('SUCCESS!')
        this.props.history.push("/") // Redirect to the home page
      })
      .catch(err => this.setState({ message: err.toString() })
    );
  }

  render() {
    return(
      <div className="pageContent">
        <h2>Add Content</h2>
        <form action="/upload" class="form">
          
          <label for="title">Title</label>
          <input id="title" type="text" value={this.state.title} onChange={(e) => this.handleInputChange("title", e)} />

          <label for="artist">Artist</label>
          <input id="artist" type="text" value={this.state.artist} onChange={(e) => this.handleInputChange("artist", e)} />

          <label for="album">Album</label>
          <input id="album" type="text" value={this.state.album} onChange={(e) => this.handleInputChange("album", e)} />

          <label for="year">Year</label>
          <input type="number" value={this.state.year} onChange={(e) => this.handleInputChange("year", e)} />

          <label for="genre">Genre</label>
          <input type="text" value={this.state.genre} onChange={(e) => this.handleInputChange("genre", e)} />

          <label for="trackUrl">Track URL</label>
          <input id="trackUrl" type="text" value={this.state.embed_url} onChange={(e) => this.handleInputChange("embed_url", e)} />

          <label for="trackHost">Host</label>
          <select id="trackHost" type="select" value={this.state.host} onChange={(e) => this.handleInputChange("host", e)}>
            <option value="bc">Bandcamp</option>
            <option value="sc">Soundcloud</option>
            <option value="yt">Youtube</option>
          </select>

          <label for="trackImage">Track Image</label>
          <input id="trackImage" type="file" onChange={(e) => this.handleFileUpload(e)} />

          <label for="uploadType">Upload Type</label>
          <select id="uploadType" type="select" value={this.state.upload_type} onChange={(e) => this.handleInputChange("upload_type", e)}>
            <option value="track">Track</option>
            <option value="album">Album</option>
          </select>
          <button onClick={(e) => this.handleClick(e)}>Upload</button>
        </form>
      </div>
    )
  }
}

export default Upload;