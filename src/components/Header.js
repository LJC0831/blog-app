import React, { useState, useEffect } from 'react';
import '../css/Header.css';
import { login01 } from '../api/Header_api';

function Header() {
  const [isModalOpen, setModalOpen] = useState(false);
  const [password, setPassword] = useState('');
  const [isLoginYn, setIsLogin] = useState(false);

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
    } else {
      setModalOpen(true);
    }
  };

  const LoginProc = () => {
    setIsLogin(true);
    closeModal();
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

  return (
    <header className="header-class">
      <div>
        <span>LJC Developer Blog</span>
        {isLoginYn ? (
          <span className='account-class' onClick={openModal}>Admin</span>
        ) : (
          <span className='account-class' onClick={openModal}>일반용</span>
        )}
      </div>

      {isModalOpen && (
        <div className="modal">
          <div className="modal-content">
            <h2>로그인</h2>
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