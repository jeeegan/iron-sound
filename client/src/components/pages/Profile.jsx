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
        <div className="profile-container">
          <div style={{flexGrow: '1'}}>
            <div className="profile-container-right">
              <h5>Youtube</h5>
              <iframe title="wiring the waves" width="560" height="315" src="https://www.youtube.com/embed/S6QDIW_FzQ0" frameborder="0" allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>
              
              <iframe title="bia 2" width="560" height="315" src="https://www.youtube.com/embed/gPkli_80jsM" frameborder="0" allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>

            </div>
          </div>

          <div style={{flexGrow: '4'}}>
            <h5>Audio Uploads</h5> <br/>
            {this.state.uploads && this.state.uploads.map( upload => {
              return <Wavesurfer 
                  key={upload._id} 
                  identifier={upload._id} 
                  upload_url={upload.upload_url} artist={upload.artist} 
                  title={upload.title}
                  media="media-player media-player-short"
                  trackinfo="track-info track-info-short"
                  waveform="waveform-right-small"
                />
            })}
          </div>
        </div>
        

      </div>
    );
  }
}

export default Profile;