
import React from 'react';
import { NavLink } from 'react-router-dom';

const NavBar = (props) => {
  
  // const logOutHandler = () => {
  //   props.logOutHandler()
  // }

  return (
    <div className="navbar">
      <NavLink to="/" className="nav-item">Bookings</NavLink>
      <NavLink to="/movies" className="nav-item">Accounts</NavLink>
      <NavLink to="/profile" className="nav-item">Drivers</NavLink>
      <NavLink to="/login" className="nav-item">Vehicles</NavLink>
    </div>
    
  );
};

export default NavBar;