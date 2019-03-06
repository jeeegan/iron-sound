import React, { Component } from 'react';
import api from '../../api';
import { withRouter } from "react-router-dom"

class Login extends Component {
  constructor(props) {
    super(props)
    this.state = {
      email: "",
      password: "",
      message: null
    }
  }

  handleInputChange(stateFieldName, event) {
    this.setState({
      [stateFieldName]: event.target.value
    })
  }

  handleClick(e) {
    e.preventDefault()
    api.login(this.state.email, this.state.password)
      .then(result => {
        console.log('SUCCESS!')
        this.props.loggedIn()
        this.props.history.push("/") // Redirect to the home page
      })
      .catch(err => this.setState({ message: err.toString() }))
  }

  render() {
    return (
      <div className="Login pageContent">
        <h2>Login</h2>
        <form className="form-vertical">
          <div>
            <label className="form-label" htmlFor="email">Email</label> <br/>
            <input className="form-input" id="email" type="email" value={this.state.email} onChange={(e) => this.handleInputChange("email", e)} /> 
          </div>

          <div>
            <label className="form-label" htmlFor="password">Password</label> <br/>
            <input className="form-input" id="password" type="password" value={this.state.password} onChange={(e) => this.handleInputChange("password", e)} /> 
          </div>
          
          <button className="form-button" onClick={(e) => this.handleClick(e)}>Login</button>
        </form>
        {this.state.message && <div className="info info-danger">
          {this.state.message}
        </div>}
      </div>
    );
  }
}

export default withRouter(Login);
