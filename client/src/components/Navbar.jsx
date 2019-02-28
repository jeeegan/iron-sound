import React from 'react';
import api from '../api';
import { NavLink } from 'react-router-dom';

const Navbar = () => {
    return(
      <div className="navbar">
        <div className="nav-left">
          <NavLink to="/" exact>Home</NavLink>
          {api.isLoggedIn() && <NavLink to="/upload">Upload</NavLink>}
          {api.isLoggedIn() && <NavLink to="/profile">Profile</NavLink>}
        </div>
        <div className="nav-right">
          {!api.isLoggedIn() && <NavLink to="/signup">Signup</NavLink>}
          {!api.isLoggedIn() && <NavLink to="/login">Login</NavLink>}
          {api.isLoggedIn() && <NavLink to="/" onClick={(e) => api.logout()}>Logout</NavLink>}
        </div>
      </div>
    )
}

export default Navbar;