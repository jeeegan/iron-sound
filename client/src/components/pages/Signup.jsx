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
      message: null
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
    formData.append("user_img", this.state.user_img);
    api.signup(formData)
      .then(result => {
        console.log('SUCCESS!')
        this.props.history.push("/") // Redirect to the home page
      })
      .catch(err => this.setState({ message: err.toString() }))
  }

  render() {
    return (
      <div className="Signup pageContent">
        <h2>Signup</h2>
        <form>
          Display Name: <input type="text" value={this.state.display_name} onChange={(e) => this.handleInputChange("display_name", e)} /> <br />
          Password: <input type="password" value={this.state.password} onChange={(e) => this.handleInputChange("password", e)} /> <br />
          Email: <input type="email" value={this.state.email} onChange={(e) => this.handleInputChange("email", e)} /> <br />
          Bandcamp URL: <input type="text" value={this.state.bc_url} onChange={(e) => this.handleInputChange("bc_url", e)} /> <br />
          SoundCloud URL: <input type="text" value={this.state.sc_url} onChange={(e) => this.handleInputChange("sc_url", e)} /> <br />
          YouTube URL: <input type="text" value={this.state.yt_url} onChange={(e) => this.handleInputChange("yt_url", e)} /> <br />
          Personal Website URL: <input type="text" value={this.state.custom_url} onChange={(e) => this.handleInputChange("custom_url", e)} /> <br />
          Bio: <input type="text" value={this.state.bio} onChange={(e) => this.handleInputChange("bio", e)} /> <br />
          Location: <input type="text" value={this.state.location} onChange={(e) => this.handleInputChange("location", e)} /> <br />
          Profile Picture: <input type="file" onChange={(e) => this.handleFileUpload(e)} /> <br />
          <button onClick={(e) => this.handleClick(e)}>Signup</button>
        </form>
        {this.state.message && <div className="info info-danger">
          {this.state.message}
        </div>}
      </div>
    );
  }
}

export default Signup;
