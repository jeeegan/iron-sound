import React, { Component } from 'react';
import api from '../../api';

class Settings extends Component {
  state = {
    user: {},
    uploads: []
  }

  componentDidMount() {
    this.updateInfo();
  }

  updateInfo() {
    api.getProfile()
    .then(res => {
      this.setState({
        user: res.user,
        uploads: res.uploads
      });
    })
    .catch(console.log);
  }

  handleUpdateClick(e) {
    e.preventDefault();
    let formData = new FormData();
    formData.append("display_name", this.state.user.display_name);
    formData.append("location", this.state.user.location);
    formData.append("bio", this.state.user.bio);
    formData.append("sc_url", this.state.user.sc_url);
    formData.append("bc_url", this.state.user.bc_url);
    formData.append("yt_url", this.state.user.yt_url);
    formData.append("yt_embed_1", this.state.user.yt_embed_1);
    formData.append("yt_embed_2", this.state.user.yt_embed_2);
    formData.append("_id", this.state.user._id);
    api.update(formData)
      .then(result => {
        this.props.history.push(`/profile`) // Redirect to the home page
      })
      .catch(err => this.setState({ message: err.toString() })
    );
  }

  handleDeleteClick(e) {
    e.preventDefault()
    api.deleteUser()
      .then(res => {
        api.logout();
        this.props.history.push('/');
      })
  }

  handleInputChange(stateFieldName, event) {
    this.setState({
      user : {...this.state.user, [stateFieldName]: event.target.value}
    });
  }

  handleTrackDelete(e, trackId) {
    e.preventDefault();
    api.deleteTrack(trackId)
      .then( res => {
        this.updateInfo();
      })
  }
  
  render() {     
    return (
      <div className="pageContent">
        <form action="/update">
          <div className="form-horizontal">

            <div className="form-vertical">
              <div className="form-item">
                <label className="form-label" htmlFor="display_name">Display Name</label> <br/>
                <input className="form-input" id="display_name" type="text" value={this.state.user.display_name} onChange={(e) => this.handleInputChange("display_name", e)} />
              </div>

              <div className="form-item">
                <label className="form-label" htmlFor="location">Location</label> <br/>
                <input className="form-input" id="location" type="text" value={this.state.user.location} onChange={(e) => this.handleInputChange("location", e)} />
              </div>

              <div className="form-item">
                <label className="form-label" htmlFor="bio">Headline</label> <br/>
                <input className="form-input" id="bio" type="text" value={this.state.user.bio} onChange={(e) => this.handleInputChange("bio", e)} />
              </div>

              <div className="form-item">
                <label className="form-label" htmlFor="sc_url">Soundcloud URL</label> <br/>
                <input className="form-input" id="sc_url" type="text" value={this.state.user.sc_url} onChange={(e) => this.handleInputChange("sc_url", e)} />
              </div>

              <div className="form-item">
                <label className="form-label" htmlFor="bc_url">Bandcamp URL</label> <br/>
                <input className="form-input" type="text" value={this.state.user.bc_url} onChange={(e) => this.handleInputChange("bc_url", e)} />
              </div>

              <div className="form-item">
                <label className="form-label" htmlFor="yt_url">Youtube URL</label> <br/>
                <input className="form-input" type="text" value={this.state.user.yt_url} onChange={(e) => this.handleInputChange("yt_url", e)} />
              </div>

              <div className="form-item">
                <label className="form-label" htmlFor="yt_url">Youtube Embed URL 1</label> <br/>
                <input className="form-input" type="text" value={this.state.user.yt_embed_1} onChange={(e) => this.handleInputChange("yt_embed_1", e)} />
              </div>

              <div className="form-item">
                <label className="form-label" htmlFor="yt_url">Youtube Embed URL 2</label> <br/>
                <input className="form-input" type="text" value={this.state.user.yt_embed_2} onChange={(e) => this.handleInputChange("yt_embed_2", e)} />
              </div>
            </div>

          <div className="form-vertical">
            <h3>Track List</h3>
            <div className="form-item">
              {this.state.uploads.map(upload => <div key={upload._id}><span>{upload.title}  </span><button onClick={(e) => this.handleTrackDelete(e, upload._id)}>DELETE</button></div>)}
            </div>

          </div>
        </div>
          
        <button className="form-button" onClick={(e) => this.handleUpdateClick(e)}>Update</button>
        </form>

        <form action="/update">
          <div className="form-horizontal">
            <button className="form-button" onClick={(e) => this.handleDeleteClick(e)}>Delete Account</button>
          </div>
        </form>
      </div>
    )}
}

export default Settings;