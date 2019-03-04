import React, { Component } from 'react';
import api from '../../api';
import Wavesurfer from '../Wavesurfer';

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
      <div className="pageContent">
      {/* USER PROFILE TEXT AND LINKS */}
        <div className="profile-header">
          <div className="profile-left">
            <div className="profile-text">
              <h2>{this.state.display_name}</h2>
              <div className="location">
                {this.state.location}
              </div>
              <div className="bio">
                {this.state.bio}
              </div>
            </div>
            <div className="link-icons">
              <a href={this.state.sc_url} target="_blank" rel="noopener noreferrer"><img style={{width: "6vw", paddingRight: '2vw'}} src="/icon-sc.png" alt="soundcloud link"/></a> <br/>

              <a href={this.state.bc_url} target="_blank" rel="noopener noreferrer"><img style={{width: "8vw", paddingRight: '2vw'}}src="/icon-bc.png" alt="bandcamp link"/></a>
              <br/>

              <a href={this.state.yt_url} target="_blank" rel="noopener noreferrer"><img style={{width: "6vw", paddingRight: '2vw'}} src="/icon-yt.png" alt="youtube link"/></a> <br/>
            </div>
          </div>
          {/* USER IMAGE */}
          <div className="user-img">
            <img src={this.state.user_img} alt="profile" style={{width: "30vh", height: "auto"}}/>
          </div>
        </div>
        <Wavesurfer artist="Alec Budd" title="U1 to Uhland"/>

      </div>
    );
  }
}

export default Profile;