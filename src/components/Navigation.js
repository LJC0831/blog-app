import React from 'react';
import '../css/Navigation.css';
import '../css/common.css';

function Navigation() {
  return (
    <div className="margin-top-50">
      <nav className="left-nav">
        <ul>
          <li>
            <img src={process.env.PUBLIC_URL + '/profile.JPG'} alt="프로필 사진" className="profile-img" />
          </li>
          <li><a href="/">소개</a></li>
          <li className="li-parent" >
            frontend
              <ul className="li-submenu">
                <li className='li-sub'><a href="/board/vue">└ vue.js</a></li>
                <li className='li-sub'><a href="/board/react">└ react.js</a></li>
              </ul>
          </li>
          <li>
            backend
              <ul className="li-submenu">
                <li className='li-sub'><a href="/board/nodejs">└ node.js</a></li>
              </ul>
          </li>
          <li>
            DB
              <ul className="li-submenu">
                <li className='li-sub'><a href="/board/mariadb">└ MariaDB</a></li>
              </ul>
          </li>
          <li><a href="/contact">문의</a></li>
        </ul>
      </nav>
    </div>
  );
}

export default Navigation;