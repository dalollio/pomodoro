import React from 'react';
import './styles.css';

const Navbar: React.FC = () => {
  return (
    <div className="navbar-container">
      <ul className="navbar-menu">
        <li className="navbar-menu-item">
          <a href="/">Timer</a>
        </li>
        <li className="navbar-menu-item">
          <a href="/config">Configuration</a>
        </li>
      </ul>
    </div>
  );
};

export default Navbar;
