import React, { useState } from 'react';
import '../css/Navigation.css';
import '../css/common.css';

function Navigation() {
  const [showFrontendMenu, setShowFrontendMenu] = useState(true);
  const [showFrontendMenu2, setShowFrontendMenu2] = useState(true);
  const [showFrontendMenu3, setShowFrontendMenu3] = useState(true);

  const toggleFrontendMenu = () => {
    setShowFrontendMenu(!showFrontendMenu);
  };

  const toggleFrontendMenu2 = () => {
    setShowFrontendMenu2(!showFrontendMenu2);
  };

  const toggleFrontendMenu3 = () => {
    setShowFrontendMenu3(!showFrontendMenu3);
  };

  return (
    <div className="margin-top-50">
      <nav className="left-nav">
        <ul>
          <li>
            <img src={process.env.PUBLIC_URL + '/profile.JPG'} alt="프로필 사진" className="profile-img" />
          </li>
          <li><a href="/">소개</a></li>
          <li className="li-parent" onClick={toggleFrontendMenu}>
            frontend
            {showFrontendMenu && (
              <ul className="li-submenu">
                <li className='li-sub'><a href="/board/vue">└ vue.js</a></li>
                <li className='li-sub'><a href="/board/react">└ react.js</a></li>
              </ul>
            )}
          </li>
          <li onClick={toggleFrontendMenu2}>
            backend
            {showFrontendMenu2 && (
              <ul className="li-submenu">
                <li className='li-sub'><a href="/board/nodejs">└ node.js</a></li>
              </ul>
            )}
          </li>
          <li onClick={toggleFrontendMenu3}>
            DB
            {showFrontendMenu3 && (
              <ul className="li-submenu">
                <li className='li-sub'><a href="/board/mariadb">└ MariaDB</a></li>
              </ul>
            )}
          </li>
          <li><a href="/contact">문의</a></li>
        </ul>
      </nav>
    </div>
  );
}

export default Navigation;