import React, { Component } from 'react';
import { Route, Switch } from 'react-router-dom';
import Home from './pages/Home';
import Login from './pages/Login';
import Signup from './pages/Signup';
import Settings from './pages/Settings';
import Upload from './pages/Upload';
import Profile from './pages/Profile';
import PublicProfile from './pages/PublicProfile';
import Navbar from './Navbar';
import Track from './pages/Track';
import api from '../api';

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
        this.setState( { homeState: res} );
      })
      .catch(console.log)
    api.getUploadData()
      .then(res => {
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
          <Route exact path="/signup" component={Signup} />
          <Route exact path="/login" render={() =>
              <Login loggedIn={this.loggedIn} />
            }  />
          <Route exact path="/upload" component={Upload} />
          <Route exact path="/profile" component={Profile} />
          <Route exact path="/settings" component={Settings} />
          <Route exact path="/profile/:displayname" component={PublicProfile} />
          <Route exact path="/track/:trackid" component={Track} />
          <Route render={() => <h2>404</h2>} />
        </Switch>
        <footer>Copyright © 2019 Waveterminal   |   Made in Berlin</footer>
      </div>
    );
  }
}

export default App;
