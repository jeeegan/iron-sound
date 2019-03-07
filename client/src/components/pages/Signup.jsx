import React, { Component } from 'react';
import api from '../../api';

class Signup extends Component {
  constructor(props) {
    super(props)
    this.state = {
      display_name: "",
      password: "",
      email: "",
      bc_url: "",
      sc_url: "",
      yt_url: "",
      custom_url: "",
      bio: "",
      location: "",
      user_img: null,
      message: null,
      yt_embed_1: null,
      yt_embed_2: null,
    }
  }

  handleInputChange(stateFieldName, event) {
    this.setState({
      [stateFieldName]: event.target.value
    })
  }

  handleFileUpload = e => {
    this.setState({
      user_img: e.target.files[0]
    })
  }

  handleClick(e) {
    e.preventDefault()
    let formData = new FormData();
    formData.append("display_name", this.state.display_name);
    formData.append("password", this.state.password);
    formData.append("email", this.state.email);
    formData.append("bc_url", this.state.bc_url);
    formData.append("sc_url", this.state.sc_url);
    formData.append("yt_url", this.state.yt_url);
    formData.append("custom_url", this.state.custom_url);
    formData.append("bio", this.state.bio);
    formData.append("location", this.state.location);
    formData.append("yt_embed_1", this.state.yt_embed_1);
    formData.append("yt_embed_2", this.state.yt_embed_2);
    formData.append("extendedBio", this.state.extendedBio);
    formData.append("user_img", this.state.user_img);
    api.signup(formData)
      .then(result => {
        this.props.history.push("/") // Redirect to the home page
      })
      .catch(err => console.log(err));
  }

  render() {
    return (
      <div className="pageContent">
        <h2 style={{ textAlign: 'left', padding: '4vh 0 1vh 0' }}>Signup</h2>
        <p>To embed YouTube videos on your profile: navigate to the video you wish to embed, click "SHARE", click "Embed", copy and paste the portion of the HTML inside of the src attribute so you have a link like this one: <span style={{ color: 'red' }}>https://www.youtube.com/embed/S6QDIW_FzQ0</span></p>
        <form>
          <div className="form-horizontal">
            <div className="form-vertical2 signup">
              *Email: <input className="signup-input" type="email" value={this.state.email} onChange={(e) => this.handleInputChange("email", e)} /> <br />
              *Password: <input className="signup-input" type="password" value={this.state.password} onChange={(e) => this.handleInputChange("password", e)} /> <br />
              *Display Name: <input className="signup-input" type="text" value={this.state.display_name} onChange={(e) => this.handleInputChange("display_name", e)} /> <br />
              Location: <input className="signup-input" type="text" value={this.state.location} onChange={(e) => this.handleInputChange("location", e)} /> <br />
              Headline: <input className="signup-input" type="text" value={this.state.bio} onChange={(e) => this.handleInputChange("bio", e)} /> <br />
              Profile Picture: <input className="signup-input" type="file" onChange={(e) => this.handleFileUpload(e)} /> <br />  
            </div>
            <div className="form-vertical2 signup">
              Bandcamp URL: <input className="signup-input" type="text" value={this.state.bc_url} onChange={(e) => this.handleInputChange("bc_url", e)} /> <br />
              SoundCloud URL: <input className="signup-input" type="text" value={this.state.sc_url} onChange={(e) => this.handleInputChange("sc_url", e)} /> <br />
              YouTube URL: <input className="signup-input" type="text" value={this.state.yt_url} onChange={(e) =>  this.handleInputChange("yt_url", e)} /> <br />
              YouTube iFrame 1: <input className="signup-input" type="text" value={this.state.yt_embed_1} onChange={(e) => this.handleInputChange("yt_embed_1", e)} /> <br />
              YouTube iFrame 2: <input className="signup-input" type="text" value={this.state.yt_embed_2} onChange={(e) => this.handleInputChange("yt_embed_2", e)} /> <br />
              Personal Website URL: <input className="signup-input" type="text" value={this.state.custom_url} onChange={(e) => this.handleInputChange("custom_url", e)} /> <br />
            </div>
          </div>
          Bio: <br/> <textarea rows="7" style={{ width: '95.5%'}} className="signup-input" type="text" value={this.state.extendedBio} onChange={(e) => this.handleInputChange("extendedBio", e)}></textarea> <br />
          <button className="form-button" onClick={(e) => this.handleClick(e)}>Signup</button>
        </form>
        {this.state.message && <div className="info info-danger">
          {this.state.message}
        </div>}
      </div>
    );
  }
}

export default Signup;
