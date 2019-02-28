import React from 'react';
import api from '../api';
import { Link, NavLink } from 'react-router-dom';

const Navbar = () => {
    return(
      <div>
        <NavLink to="/" exact>Home</NavLink>
          {api.isLoggedIn() && <NavLink to="/upload">Upload</NavLink>}
          {api.isLoggedIn() && <NavLink to="/profile">Profile</NavLink>}
          {!api.isLoggedIn() && <NavLink to="/signup">Signup</NavLink>}
          {!api.isLoggedIn() && <NavLink to="/login">Login</NavLink>}
          {api.isLoggedIn() && <Link to="/" onClick={(e) => this.handleLogoutClick(e)}>Logout</Link>}
      </div>
    )
}

export default Navbar;