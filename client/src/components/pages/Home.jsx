import React, { Component } from 'react';
import Wavesurfer from '../Wavesurfer';

class Home extends Component {

  render() {           
    return (
      <div className="Home pageContent">
        <h3>Welcome {this.props.userData.display_name}!</h3>
        <div>
          <h3>Uploads:</h3>
          <ul className="upload-list">
          {this.props.uploads && this.props.uploads.map( upload => {
            return <Wavesurfer key={upload._id} upload_url={upload.upload_url} artist={upload.artist} title={upload.title}/>
          })}
          </ul>
        </div>
      </div>
    );
  }
}

export default Home;
