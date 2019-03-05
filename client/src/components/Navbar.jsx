import React from 'react';
import api from '../api';
import { NavLink } from 'react-router-dom';

const Navbar = (props) => {
    return(
      <div className="navbar">
        <div className="nav-left">
          <NavLink to="/" exact>Home</NavLink>
          {api.isLoggedIn() && <NavLink to="/upload">Add Content</NavLink>}
          {api.isLoggedIn() && <NavLink to="/profile">Profile</NavLink>}
        </div>
        <div className="nav-right">
          {api.isLoggedIn() && <NavLink to="/settings">Settings</NavLink>}
          {!api.isLoggedIn() && <NavLink to="/signup">Signup</NavLink>}
          {!api.isLoggedIn() && <NavLink to="/login">Login</NavLink>}
          {api.isLoggedIn() && <NavLink to="/" onClick={(e) => 
              api.logout()
              .then(() => {
                props.loggedOut(true)
              })
          }>Logout</NavLink>}
        </div>
      </div>
    )
}

export default Navbar;