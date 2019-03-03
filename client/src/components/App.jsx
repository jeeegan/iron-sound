import React, { Component } from 'react';
import { Route, Switch } from 'react-router-dom';
import Home from './pages/Home';
import Login from './pages/Login';
import Signup from './pages/Signup';
import Upload from './pages/Upload';
import Profile from './pages/Profile';
import Navbar from './Navbar';
import api from '../api';
// import WaveSurfer from 'wavesurfer.js';


class App extends Component {
  constructor(props) {
    super(props)
    this.state = { 
      homeState: {
        display_name: ""  
      }
    };    
  }

  state = {};

  getHomeData = () => {
    api.userData()
      .then(res => {
        console.log("Got home state", res)
        this.setState( { homeState: res} );
      })
      .catch(console.log)
    api.getUploadData()
      .then(res => {
        console.log("Got uploads", res)
        this.setState( { homeUploads: res } );
      })
  }

  // LOGIN / LOGOUT
  loggedIn = (trueOrFalse) => {
    this.getHomeData()
  }

  loggedOut = (trueOrFalse) => {
    this.setState({ 
      homeState: {
        display_name: ""  
      }
    })
  }

  componentDidMount() {
    this.getHomeData()
  }

  logout() {
    api.logout();
  }

  render() {
    return (
      <div className="App">
        <header className="App-header">
          <Navbar loggedOut={this.loggedOut} />
        </header>
        <Switch>
          <Route path="/" exact render={() =>
              <Home userData={this.state.homeState} uploads={this.state.homeUploads }/>
            } />
          <Route path="/signup" component={Signup} />
          <Route path="/login" render={() =>
              <Login loggedIn={this.loggedIn} />
            }  />
          <Route path="/upload" component={Upload} />
          <Route path="/profile" component={Profile} />
          <Route render={() => <h2>404</h2>} />
        </Switch>
      </div>
    );
  }
}

export default App;
