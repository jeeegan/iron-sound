import React, { Component } from 'react';
import api from '../../api';

class Settings extends Component {
  state = {
    user: {},
    uploads: []
  }

  componentDidMount() {
    api.getProfile()
    .then(res => {
      this.setState({
        user: res.user,
        uploads: res.uploads
      });
    })
    .catch(console.log);
    
  }

  handleClick(e) {
    console.log(this.state.user.display_name)
    e.preventDefault();
    let formData = new FormData();
    formData.append("display_name", this.state.user.display_name);
    formData.append("location", this.state.user.location);
    formData.append("bio", this.state.user.bio);
    formData.append("sc_url", this.state.user.sc_url);
    formData.append("bc_url", this.state.user.bc_url);
    formData.append("yt_url", this.state.user.yt_url);
    console.log(this.state.user)
    console.log("***** DEBUG: formData:", formData)
    api.update(formData)
      .then(result => {
        console.log('SUCCESS!')
        this.props.history.push("/") // Redirect to the home page
      })
      .catch(err => this.setState({ message: err.toString() })
    );
  }

  handleInputChange(stateFieldName, event) {
    this.setState({
      user : {...this.state.user, [stateFieldName]: event.target.value}
    });
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
                <label className="form-label" htmlFor="bio">Bio</label> <br/>
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
            </div>

            <div className="form-vertical">
            <div className="form-item">
              <div className="user-img">
                <img src={this.state.user.user_img} alt="profile" style={{width: "30vh", height: "auto"}}/>
              </div>
              </div>

            </div>
          </div>

          <button className="form-button" onClick={(e) => this.handleClick(e)}>Update</button>
        </form>
      </div>
    )}
}

export default Settings;