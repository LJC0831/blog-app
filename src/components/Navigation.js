// Navigation.js
import React from 'react';
import '../css/Navigation.css';

function Navigation() {
  return (
    <nav className="left-nav">
      <ul>
        <li><a href="/">홈</a></li>
        <li><a href="/about">소개</a></li>
        <li><a href="/board">개발일지</a></li>
        <li><a href="/contact">문의</a></li>
      </ul>
    </nav>
  );
}

export default Navigation;