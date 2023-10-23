// Navigation.js
import React from 'react';
import '../css/Navigation.css';
import '../css/common.css';

function Navigation() {
  return (
    <div className="header-common">
    <nav className="left-nav">
      <ul>
        <li><a href="/">소개</a></li>
        <li><a href="/board">개발소스(웹)</a></li>
        <li><a href="/board">DB</a></li>
        <li><a href="/contact">문의</a></li>
      </ul>
    </nav>
    </div>
  );
}

export default Navigation;