import React from 'react';
import api from '../api';
import { NavLink } from 'react-router-dom';

const Navbar = (props) => {
    return(
      <div className="navbar">
        <div className="nav-left">
          <NavLink to="/" exact><img 
            src="/WTLogoW.png"  
            style={{ 
              width: '70px', 
              height: 'auto',
              id: 'logo',
              margin: '-20px',
            }} 
            alt="logo"/></NavLink>
          {api.isLoggedIn() && <NavLink to="/upload"><img src="/icon-add.png" alt="add" style={{ width: '30px', height: 'auto' }}/></NavLink>}
          {api.isLoggedIn() && <NavLink to="/profile"><img src="/icon-profile.png" alt="profile" style={{ width: '30px', height: 'auto' }}/></NavLink>}
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