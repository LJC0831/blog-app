import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom'; // 게시판 글번호 받기
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css'; // 에디터의 스타일을 불러옵니다.
import { save01, Search01, update01 } from '../api/BoardWrite_api';

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

function BoardWrite() {
  const { id } = useParams(); //게시글번호
  const [isEditing, setIsEditing] = useState(false); // 에디터의 가시성 상태를 저장
  const initialHTML = ''; // 초기 HTML
  const titletHTML = ''; // 초기 HTML
  const privewtHTML = ''; // 초기 HTML
  const [title, setSubject] = useState(titletHTML);
  const [privew, setPrivew] = useState(privewtHTML);
  const [isLoginYn, setIsLogin] = useState(false);

  const [introText, setIntroText] = useState(initialHTML); // 에디터의 내용을 저장

  const handleIntroTextChange = (value) => {
    setIntroText(value);
  };

  const handleEditButtonClick = () => {
    setIsEditing(!isEditing); // 편집 버튼 클릭 시 가시성 상태를 토글
    if (isEditing) {
      if(id.length > 0){
        update01(title, introText, privew, id);
      } else {
        save01(title, introText, privew);
      }
    }
  };

  // 처음 렌더링 시 Search01 함수 호출
  useEffect(() => {
    const isLoggedIn = localStorage.getItem('isLoggedIn');
    setIsLogin(isLoggedIn === 'true');
    Search01(id).then((data) => {
        setSubject(data[0].title);
        setIntroText(data[0].content);
        setPrivew(data[0].privew_content)
    });
  }, [id]); // 빈 배열을 전달하여 컴포넌트 마운트 시 한 번만 실행

  return (
    <div className='margin-content'>
      {isEditing ? (
        <textarea value={title} 
        onChange={(e) => setSubject(e.target.value)}
          style={{ width: '50vw' }}
        />
      ) : (
        <div>
          <h1>{addLineBreaks(title)}</h1>
        </div>
        
      )}
      {isEditing && (
        <p><textarea value={privew} 
        onChange={(e) => setSubject(e.target.value)}
        style={{ width: '50vw' }}
        />
        </p>
      ) 
      }
      {isEditing ? (
        <ReactQuill value={introText} onChange={handleIntroTextChange} style={{ width: '50vw' }} />
      ) : (
        <p
          className="description"
          dangerouslySetInnerHTML={{ __html: introText }}
        />
      )}
      <p>
        { isLoginYn && 
          <button onClick={handleEditButtonClick}>
            {isEditing ? (id ? '수정' : '저장') : '편집'}
          </button>
        }
      </p>
    </div>
  );
}

export default BoardWrite;