import React, { Component } from 'react';
import api from '../../api';

class Home extends Component {

  render() {           
    console.log("props", this.props)
    return (
      <div className="Home pageContent">
        <h2>Welcome, {this.props.userData.display_name}!</h2>
        <div>
          <h3>Uploads:</h3>
          <ul className="upload-list">
          {this.props.uploads && this.props.uploads.map( upload => {
            return <li key={upload._id}><iframe title={upload.title} style={{width: "80%", height: "150px"}} src={upload.embed_url}></iframe></li>
          })}
          </ul>
        </div>
      </div>
    );
  }
}

export default Home;
