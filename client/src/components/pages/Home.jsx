import React, { Component } from 'react';
import api from '../../api';

class Home extends Component {
  state = {};

  componentDidMount() {
    api.userData()
      .then(res => {
        this.setState(res);
      })
      .catch(console.log)
    api.getUploadData()
      .then(res => {
        this.setState({uploads: res});
        console.log(this.state);
      })
  }

  render() {                
    return (
      <div className="Home">
        <h2>Welcome, {this.state.display_name}!</h2>
        <div>
          <h3>Uploads:</h3>
          {this.state.uploads && this.state.uploads.map( upload => <p key={upload._id}>{upload.title}</p>)}
          <iframe width="100%" height="450" scrolling="no" frameBorder="no" allow="autoplay" src="https://w.soundcloud.com/player/?url=https%3A//api.soundcloud.com/playlists/282989974&color=%23ff5500&auto_play=false&hide_related=false&show_comments=true&show_user=true&show_reposts=false&show_teaser=true"></iframe>
        </div>
      </div>
    );
  }
}

export default Home;
