import React, { useState, useEffect } from 'react';
import '../css/Header.css';
import { login01 } from '../api/Header_api';

function Header() {
  const [isModalOpen, setModalOpen] = useState(false); //로그인팝업
  const [password, setPassword] = useState(''); //패스워드
  const [isLoginYn, setIsLogin] = useState(false);//로그인여부
  const [isMenuOpen, setMenuOpen] = useState(false); //햄버거클릭여부

  useEffect(() => {
    // 컴포넌트가 처음 마운트될 때 로컬 세션을 확인하여 로그인 상태 업데이트
    const isLoggedIn = localStorage.getItem('isLoggedIn');
    setIsLogin(isLoggedIn === 'true');
  }, []);

  const openModal = () => {
    if (isLoginYn) {
      // 이미 로그인한 경우, 로그아웃 처리
      localStorage.removeItem('isLoggedIn');
      setIsLogin(false);
      window.location.reload();
    } else {
      setModalOpen(true);
    }
  };

  const LoginProc = () => {
    setIsLogin(true);
    closeModal();
    window.location.reload();
  };

  const closeModal = () => {
    setModalOpen(false);
  };

  const handlePasswordChange = (e) => {
    setPassword(e.target.value);
  };

  const handleLogin = () => {
    login01(password).then((data) => {
      if (data.length > 0) {
        localStorage.setItem('isLoggedIn', 'true');
        alert('로그인 성공');
        LoginProc();
      } else {
        alert('패스워드가 틀립니다.');
      }
    });
  };

  const goToHomePage = () => {
    window.location.href = '/'; // 페이지 이동
  };

  const toggleMenu = () => {
    setMenuOpen(!isMenuOpen);
  };

  return (
    <header className={`header-class ${isMenuOpen ? 'menu-open' : ''}`}>
      <div>
      <i className='fas fa-bars' onClick={toggleMenu} style={{ marginRight: '5px' }}></i>
        <span className='logo-class' onClick={goToHomePage}>LJC Developer Blog</span>
        {isLoginYn ? (
          <span className='account-class' onClick={openModal}>Admin</span>
        ) : (
          <span className='account-class' onClick={openModal}>일반용</span>
        )}
      </div>

      <div className="menu-list">
        <ul>
        <li className="li-parent" >
            프론트엔드
              <ul className="li-submenu">
                <li className='li-sub'><a href="/board/vue">vue.js</a></li>
                <li className='li-sub'><a href="/board/react">react.js</a></li>
              </ul>
        </li>
        <li className="li-parent" >
            백엔드
              <ul className="li-submenu">
                <li className='li-sub'><a href="/board/nodejs">node.js</a></li>
              </ul>
          </li>
          <li className="li-parent" >
            DB
              <ul className="li-submenu">
                <li className='li-sub'><a href="/board/mariadb">MariaDB</a></li>
              </ul>
          </li>
        <li className="li-parent" ><a href="/board/etc">기타작업</a></li>
        </ul>
      </div>

      {isModalOpen && (
        <div className="modal">
          <div className="modal-content">
            <h2>관리자 로그인</h2>
            <input type="password" placeholder="비밀번호를 입력해주세요." value={password} onChange={handlePasswordChange} />
            <button onClick={handleLogin}>로그인</button>
            <button onClick={closeModal}>닫기</button>
          </div>
        </div>
      )}
    </header>
  );
}

export default Header;