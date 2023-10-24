import React, { useState, useEffect  } from 'react';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css'; // 에디터의 스타일을 불러옵니다.
import { save01, Search01 } from '../api/Intro_api';

function Intro() {
  const [isEditing, setIsEditing] = useState(false); // 에디터의 가시성 상태를 저장
  const initialHTML = 'React 환경에서 만든 반응형 어플리케이션 입니다. <br/> 제작자 : LJC <br/> 깃허브 놀러오세요'; // 초기 HTML

  const [introText, setIntroText] = useState(initialHTML); // 에디터의 내용을 저장

  const handleIntroTextChange = (value) => {
    setIntroText(value);
  };

  const handleEditButtonClick = () => {
    setIsEditing(!isEditing); // 편집 버튼 클릭 시 가시성 상태를 토글
    if(isEditing){
      save01(introText);
    }
  };

  // 처음 렌더링 시 Search01 함수 호출
  useEffect(() => {
    Search01().then((data) => {
      // 서버에서 받아온 데이터를 처리
      // 예: setIntroText(data.introText);
    });
  }, []); // 빈 배열을 전달하여 컴포넌트 마운트 시 한 번만 실행


  return (
    <div className='margin-content'>
      <img src={process.env.PUBLIC_URL + '/logo512.png'} alt="로고 이미지" className="logo" />
      <h2>안녕하세요!</h2>

      {isEditing ? ( // isEditing 상태에 따라 에디터를 표시/숨김
        <ReactQuill value={introText} onChange={handleIntroTextChange} style={{ width: '50vw' }} />
      ) : (
        <p
          className="description"
          dangerouslySetInnerHTML={{ __html: introText }} // HTML을 렌더링
        />
      )}
      <i className="bi bi-github"></i><a href="https://github.com/LJC0831" target="_blank" rel="noreferrer">이동</a>
      <p>
        <button onClick={handleEditButtonClick}>
          {isEditing ? '저장' : '편집'} {/* 편집 버튼의 텍스트 변경 */}
        </button>
      </p>
    </div>
  );
}

export default Intro;