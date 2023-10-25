import React from 'react';
import '../css/Header.css';
import { login01 } from '../api/Header_api';


const accountChange = () => {
  const pwd = prompt('비밀번호를 입력해주세요.');
  login01(pwd).then((data) => {
    if(data.length > 0){
      alert('로그인성공');
    } else {
      alert('패스워드가 틀립니다.');
    }
  });
};

function Header() {
  return (
    <header className="header-class"> 
      <div>
        <span>LJC Developer Blog</span>
        <span className='account-class' onClick={accountChange}>관리자</span>
      </div>
    </header>
  );
}

export default Header;