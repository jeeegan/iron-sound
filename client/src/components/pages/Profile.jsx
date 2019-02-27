import React, { Component } from 'react';
import api from '../../api';

class Profile extends Component {
  state = {}

  componentDidMount() {
    api.userData()
    .then(res => {
      console.log(res)
      this.setState(res)
      console.log(this.state.user)
    })
    .catch(console.log)
  
  }
  
  render() {     
    console.log(this.props.match.params.id);           
    return (
      <div className="Profile">
        <h2>Profile</h2>
        {this.state.display_name}
      </div>
    );
  }
}

export default Profile;