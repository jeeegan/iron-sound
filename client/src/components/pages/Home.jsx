import React, { Component } from 'react';
import Wavesurfer from '../Wavesurfer';

class Home extends Component {

  render() {           
    return (
      <div className="Home pageContent">
        <h3>Welcome {this.props.userData.display_name}!</h3>
        <div>
          <h3>Uploads:</h3>
          {this.props.uploads && this.props.uploads.map( upload => {
            return <div><Wavesurfer key={upload._id} upload_url={upload.upload_url} artist={upload.artist} title={upload.title}/></div>
          })}
        </div>
      </div>
    );
  }
}

export default Home;
