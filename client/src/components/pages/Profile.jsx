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
      <div className="pageContent">
        <div className="profile-header">
          <div className="user-img">
            {this.state.user_img}
          </div>
          <h2>{this.state.display_name}</h2>
        </div>
        
        
        
        {this.state.location} <br/>
        {this.state.bio} <br/>
        
        <a href={this.state.sc_url} target="_blank" rel="noopener noreferrer"><img style={{width: "3vw"}} src="/icon-sc.png" alt="soundcloud link"/></a> <br/>

        <a href={this.state.bc_url} target="_blank" rel="noopener noreferrer"><img style={{width: "2.5vw"}}src="/icon-bc.png" alt="bandcamp link"/></a>
        <br/>
       
        <a href={this.state.yt_url} target="_blank" rel="noopener noreferrer"><img style={{width: "3vw"}} src="/icon-yt.png" alt="youtube link"/></a> <br/>
      </div>
    );
  }
}

export default Profile;