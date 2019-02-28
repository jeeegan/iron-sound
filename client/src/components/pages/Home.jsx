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
      })
  }

  render() {                
    return (
      <div className="Home pageContent">
        <h2>Welcome, {this.state.display_name}!</h2>
        <div>
          <h3>Uploads:</h3>
          <ul className="upload-list">
          {this.state.uploads && this.state.uploads.map( upload => {
            return <li key={upload._id}><iframe title={upload.title} style={{width: "80%", height: "150px"}} src={upload.embed_url}></iframe></li>
          })}
          </ul>
        </div>
      </div>
    );
  }
}

export default Home;
