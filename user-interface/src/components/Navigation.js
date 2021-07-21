import React from 'react';
import { NavLink } from 'react-router-dom';

const Navigation = () => {
  return (
    <nav className="main-nav">
      <ul>
        <li><NavLink to="/nature">Nature</NavLink></li>
        <li><NavLink to="/civil-rights">Civil Rights</NavLink></li>
        <li><NavLink to="/travel">Travel</NavLink></li>
        <li><NavLink to="/wild-life">Wild Life</NavLink></li>
      </ul>
    </nav>
  );
}

export default Navigation;