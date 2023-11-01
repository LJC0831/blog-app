import React, { useState, useEffect } from 'react';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css'; // 에디터의 스타일을 불러옵니다.
import { save01, Search01, upload01, fileStatUpdate } from '../api/Intro_api';

// 줄바꿈 문자를 <br> 태그로 변환하는 함수
function addLineBreaks(text) {
  const withBreaks = text.split('\n').map((line, index) => (
    <React.Fragment key={index}>
      {line}
      <br />
    </React.Fragment>
  ));
  return withBreaks;
}

function Intro() {
  const [isEditing, setIsEditing] = useState(false); // 에디터의 가시성 상태를 저장
  const initialHTML = ''; // 초기 HTML
  const subjectHTML = ''; // 초기 HTML
  const [subject, setSubject] = useState(subjectHTML);
  const [isLoginYn, setIsLogin] = useState(false);
  const [introText, setIntroText] = useState(initialHTML); // 에디터의 내용을 저장

   //에디터 옵션
  const toolbarOptions = [
    [{ header: [1, 2, 3, 4, 5, 6, false] }],
    ["bold", "italic", "underline", "strike"],
    ["blockquote"],
    [{ list: "ordered" }, { list: "bullet" }],
    [{ color: [] }, { background: [] }],
    [{ align: [] }],
  ]; 

  const modules = {
    toolbar: {
      container: toolbarOptions,
    },
  };

  const handleIntroTextChange = (value) => {
    setIntroText(value);
  };

  const handleEditButtonClick = async() => {
    setIsEditing(!isEditing); // 편집 버튼 클릭 시 가시성 상태를 토글
    if (isEditing) {
      await fileStatUpdate();
      const html = await upload01(introText, 'intro',''); //html, board_type, board_id
      save01(subject, html);
    }
  };

  // 처음 렌더링 시 Search01 함수 호출
  useEffect(() => {
    const isLoggedIn = localStorage.getItem('isLoggedIn');
    setIsLogin(isLoggedIn === 'true');
    Search01().then((data) => {
      setSubject(data[0].subject);
      setIntroText(data[0].content);
    });
  }, []); // 빈 배열을 전달하여 컴포넌트 마운트 시 한 번만 실행

  return (
    <div className='margin-content'>
      {isEditing ? (
        <textarea
          value={subject}
          onChange={(e) => setSubject(e.target.value)}
          style={{ width: '50vw' }}
        />
      ) : (
        <div>
          <h1>{addLineBreaks(subject)}</h1>
        </div>
      )}
      {isEditing ? (
        <ReactQuill value={introText} onChange={handleIntroTextChange} modules={modules} style={{ width: '50vw' }} />
      ) : (
        <p
          className="description"
          dangerouslySetInnerHTML={{ __html: introText }}
        />
      )}
      <i className="bi bi-github"></i>
      <a href="https://github.com/LJC0831" target="_blank" rel="noreferrer">
        이동
      </a>
      <p>
        { isLoginYn && 
          <button className='new-post-button' onClick={handleEditButtonClick}>
            {isEditing ? '저장' : '편집'}
          </button>
        }
      </p>
    </div>
  );
}

export default Intro;