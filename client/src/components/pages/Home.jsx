import React, { Component } from 'react';

class Home extends Component {

  render() {           
    return (
      <div className="Home pageContent">
        <h3>Welcome {this.props.userData.display_name}!</h3>
        <div>
          <h3>Uploads:</h3>
          <ul className="upload-list">
          {this.props.uploads && this.props.uploads.map( upload => {
            return <li key={upload._id}>{upload.title}</li>
          })}
          </ul>
        </div>
      </div>
    );
  }
}

export default Home;
