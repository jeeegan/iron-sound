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
          <ul className="upload-list">
          {this.state.uploads && this.state.uploads.map( upload => {
            return <li><iframe style={{width: "50%", height: "150px"}} key={upload._id} src={upload.embed_url}></iframe></li>
          })}
          </ul>
        </div>
      </div>
    );
  }
}

export default Home;
