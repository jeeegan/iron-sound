import React, { Component } from 'react';
import api from '../../api';
import Wavesurfer from '../Wavesurfer';

class Profile extends Component {
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
      console.log(this.state.uploads)
    })
    .catch(console.log);
    
  }
  
  render() {     
    return (
      <div className="pageContent">
      {/* USER PROFILE TEXT AND LINKS */}
        <div className="profile-header">
          <div className="profile-left">
            <div className="profile-text">
              <h2>{this.state.user.display_name}</h2>
              <div className="location">
                {this.state.user.location}
              </div>
              <div className="bio">
                {this.state.user.bio}
              </div>
            </div>
            <div className="link-icons">
              <a href={this.state.user.sc_url} target="_blank" rel="noopener noreferrer"><img style={{width: "6vw", paddingRight: '2vw'}} src="/icon-sc.png" alt="soundcloud link"/></a> <br/>

              <a href={this.state.user.bc_url} target="_blank" rel="noopener noreferrer"><img style={{width: "8vw", paddingRight: '2vw'}}src="/icon-bc.png" alt="bandcamp link"/></a>
              <br/>

              <a href={this.state.user.yt_url} target="_blank" rel="noopener noreferrer"><img style={{width: "6vw", paddingRight: '2vw'}} src="/icon-yt.png" alt="youtube link"/></a> <br/>
            </div>
          </div>
          {/* USER IMAGE */}
          <div className="user-img">
            <img src={this.state.user.user_img} alt="profile" style={{width: "30vh", height: "auto"}}/>
          </div>
        </div>
        <div>
          <h5>Uploads:</h5>
          {this.state.uploads && this.state.uploads.map( upload => {
            return <Wavesurfer key={upload._id} identifier={upload._id} upload_url={upload.upload_url} artist={upload.artist} title={upload.title}/>
          })}
        </div>

      </div>
    );
  }
}

export default Profile;