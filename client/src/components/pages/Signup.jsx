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
      user_img: "",
      message: null
    }
  }

  handleInputChange(stateFieldName, event) {
    this.setState({
      [stateFieldName]: event.target.value
    })
  }

  handleClick(e) {
    e.preventDefault()
    let data = {
      display_name: this.state.display_name,
      password: this.state.password,
      email: this.state.email,
      bc_url: this.state.bc_url,
      sc_url: this.state.sc_url,
      yt_url: this.state.yt_url,
      custom_url: this.state.custom_url,
      bio: this.state.bio,
      location: this.state.location,
      user_img: this.state.user_img,
      message: null
    }
    api.signup(data)
      .then(result => {
        console.log('SUCCESS!')
        this.props.history.push("/") // Redirect to the home page
      })
      .catch(err => this.setState({ message: err.toString() }))
  }

  render() {
    return (
      <div className="Signup">
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
          Profile Picture: <input type="text" value={this.state.user_img} onChange={(e) => this.handleInputChange("user_img", e)} /> <br />
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
