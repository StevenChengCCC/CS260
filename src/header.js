import React from 'react';
import { NavLink } from 'react-router-dom';
import './index.css';

const Header = () => {
  return (
    <header>
      <nav>
        <ul>
          <li><NavLink to="/" end>Home (Login)</NavLink></li>
          <li><NavLink to="/quiz">Quiz</NavLink></li>
          <li><NavLink to="/score">Scores</NavLink></li>
          <li><NavLink to="/about">About</NavLink></li>
        </ul>
      </nav>
      <h1>Anti-Scam Awareness</h1>
    </header>
  );
};

export default Header;
