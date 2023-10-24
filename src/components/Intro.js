import React from 'react';

function Intro() {
  return (
    <div className='margin-content'>
      <img src={process.env.PUBLIC_URL + '/logo512.png'} alt="로고 이미지" className="logo" />
      <h2>안녕하세요!</h2>
      <p className="description">
        React 환경에서 만든 반응형 어플리케이션 입니다.<br/>
        제작자 : LJC <br/>
        깃허브 놀러오세요
      </p> 
      <i className="bi bi-github"></i><a href="https://github.com/LJC0831" target="_blank" rel="noreferrer">이동</a>
    </div>
  );
}

export default Intro;