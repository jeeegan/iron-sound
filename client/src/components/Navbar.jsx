import React from 'react';
import api from '../api';
import { NavLink } from 'react-router-dom';

const Navbar = (props) => {
    return(
      <div className="navbar">
        <div className="nav-left">
          <NavLink to="/" exact>
            {/* <img 
              src="/WTLogoW.png"  
              style={{ 
                width: '70px', 
                height: 'auto',
                id: 'logo',
                margin: '-20px',
              }} 
              alt="logo"/> */}
              <img src="/icon-home-lg.png" alt="add" style={{ width: '30px', height: 'auto' }}/>
          </NavLink>
          {api.isLoggedIn() && <NavLink to="/upload"><img src="/icon-upload-button-white.png" alt="add" style={{ width: '30px', height: 'auto' }}/></NavLink>}
          {api.isLoggedIn() && <NavLink to="/profile"><img src="/icon-profile-button-white.png" alt="profile" style={{ width: '30px', height: 'auto' }}/></NavLink>}
        </div>

        <div style={{ marginLeft: '55%', color: 'cornsilk', font: 'sans-serif' }}>
          {api.isLoggedIn() && <div>
          {props.userData.display_name}
          </div>}  
        </div>

        <div className="nav-right">
          {api.isLoggedIn() && <NavLink to="/settings"><img src="/icon-settings-button-white.png" alt="profile" style={{ width: '30px', height: 'auto' }}/></NavLink>}
          {!api.isLoggedIn() && <NavLink to="/signup"><img src="/icon-signup.png" alt="profile" style={{ width: '30px', height: 'auto' }}/></NavLink>}
          {!api.isLoggedIn() && <NavLink to="/login"><img src="/icon-power-button-white.png" alt="profile" style={{ width: '25px', height: 'auto' }}/></NavLink>}
          {api.isLoggedIn() && <NavLink to="/" onClick={(e) => 
              api.logout()
              .then(() => {
                props.loggedOut(true)
              })
          }><img src="/icon-power-button-white.png" alt="profile" style={{ width: '25px', height: 'auto' }}/></NavLink>}
        </div>
      </div>
    )
}

export default Navbar;