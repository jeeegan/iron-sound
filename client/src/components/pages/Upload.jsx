import React, { Component } from 'react';
import api from '../../api';

class Upload extends Component {
  constructor(props) {
    super(props);
    this.state = {
      title: "",
      artist: "",
      album: "",
      year: "",
      genre: "",
      upload_url: null,
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
      upload_url: e[0]
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
    formData.append("upload_url", this.state.upload_url);
    api.upload(formData)
      .then(result => {
        this.props.history.push("/") // Redirect to the home page
      })
      .catch(err => this.setState({ message: err.toString() })
    );
  }

  render() {
    return(
      <div className="pageContent">
        <h2>Add Content</h2>
        <form action="/upload">
          <div className="form-horizontal">
            <div className="form-vertical">

              <div className="form-item">
                <label className="form-label" htmlFor="upload_url">Track Upload</label> <br/>
                <input className="form-input" id="upload_url" type="file" onChange={(e) => this.handleFileUpload(e.target.files)} />
              </div>
              
            </div>

            <div className="form-vertical">
              <div className="form-item">
                <label className="form-label" htmlFor="title">Title</label> <br/>
                <input className="form-input" id="title" type="text" value={this.state.title} onChange={(e) => this.handleInputChange("title", e)} />
              </div>

              <div className="form-item">
                <label className="form-label" htmlFor="artist">Artist</label> <br/>
                <input className="form-input" id="artist" type="text" value={this.state.artist} onChange={(e) => this.handleInputChange("artist", e)} />
              </div>

              <div className="form-item">
                <label className="form-label" htmlFor="album">Album</label> <br/>
                <input className="form-input" id="album" type="text" value={this.state.album} onChange={(e) => this.handleInputChange("album", e)} />
              </div>

              <div className="form-item">
                <label className="form-label" htmlFor="year">Year</label> <br/>
                <input className="form-input" type="number" value={this.state.year} onChange={(e) => this.handleInputChange("year", e)} />
              </div>

              <div className="form-item">
                <label className="form-label" htmlFor="genre">Genre</label> <br/>
                <input className="form-input" type="text" value={this.state.genre} onChange={(e) => this.handleInputChange("genre", e)} />
              </div>
            </div>
          </div>

          <button className="form-button" onClick={(e) => this.handleClick(e)}>Upload</button>
        </form>
      </div>
    )
  }
}

export default Upload;