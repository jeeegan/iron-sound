import React, { Component } from 'react';
import api from '../../api';

class Track extends Component {
  state = {}

  componentDidMount() {
    api.getTrack(this.props.match.params.trackid)
    .then(res => {
      this.setState(res);
    })
    .catch(console.log);
    
  }
  
  render() {     
    return (
      <div className="pageContent">
        <h3>Track info:</h3>
          {this.state.title}<br/>
          {this.state.artist}<br/>
          {this.state.album}<br/>
          {this.state.genre}<br/>
      </div>
    );
  }
}

export default Track;