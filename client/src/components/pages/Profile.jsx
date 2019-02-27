import React, { Component } from 'react';
import api from '../../api';

class Profile extends Component {
  state = {
    user: null,
  }

  componentDidMount() {
    api.userData()
    .then(res => console.log(res))
    .catch(console.log)
  }
  
  render() {     
    console.log(this.props.match.params.id);           
    return (
      <div className="Profile">
        <h2>Profile</h2>
      </div>
    );
  }
}

export default Profile;