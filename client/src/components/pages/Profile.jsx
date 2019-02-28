import React, { Component } from 'react';
import api from '../../api';

class Profile extends Component {
  state = {}

  componentDidMount() {
    api.userData()
    .then(res => {
      this.setState(res)
    })
    .catch(console.log)
  
  }
  
  render() {     
    return (
      <div className="Profile">
        <h2>Profile</h2>
        {this.state.display_name} <br/>
        {this.state.user_img} <br/>
        {this.state.location} <br/>
        {this.state.bio} <br/>
        {this.state.bc_url} <br/>
        {this.state.sc_url} <br/>
        {this.state.yt_url} <br/>
      </div>
    );
  }
}

export default Profile;