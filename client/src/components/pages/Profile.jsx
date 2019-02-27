import React, { Component } from 'react';
import api from '../../api';

class Profile extends Component {
  state = {
    user: null,
  }

  // getUser() {
  //   api.showProfile()
  // }
  
  render() {                
    return (
      <div className="Profile">
        <h2>Profile</h2>
      </div>
    );
  }
}

export default Profile;