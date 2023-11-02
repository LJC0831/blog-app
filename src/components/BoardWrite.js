import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom'; // 게시판 글번호 받기
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css'; // 에디터의 스타일을 불러옵니다.
import { save01, Search01, Search02, update01, upload01, fileStatUpdate, save02 } from '../api/BoardWrite_api';

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
  const initComment = '';
  
  const [title, setSubject] = useState(titletHTML);
  const [privew, setPrivew] = useState(privewtHTML);
  const [isLoginYn, setIsLogin] = useState(false);
  const [introText, setIntroText] = useState(initialHTML); // 에디터의 내용을 저장
  const [commentText, setcommentText] = useState(initComment); // 댓글입력
  const [commentData, setCommentData] = useState([]); // 댓글 데이터를 배열로 관리


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
  const handleCommentTextChange = (e) =>{
    setcommentText(e.target.value);
  }

  const handleEditButtonClick = async() => {
    setIsEditing(!isEditing); // 편집 버튼 클릭 시 가시성 상태를 토글
    if (isEditing) {
      if(!isNaN(id)){
        await fileStatUpdate(id);
        const html = await upload01(introText, '', id); //html, board_type, board_id
        update01(title, html.replace(/'/g, "\\'"), privew, id); //작은따옴표의 경우 '\ 로 변경
      } else {
        const html = await upload01(introText, id,''); //html, board_type, board_id
        save01(title, html.replace(/'/g, "\\'"), privew, id); //작은따옴표의 경우 '\ 로 변경
      }
    }
  };
  const handleCommenButtonClick = async() => {
    if(isLoginYn){
      save02(id, commentText, '관리자');  
    } else {
      save02(id, commentText, '손님');
    }
    setcommentText('');
    window.location.reload();
  }; 

  // 처음 렌더링 시 Search01 함수 호출
  useEffect(() => {
    const isLoggedIn = localStorage.getItem('isLoggedIn');
    setIsLogin(isLoggedIn === 'true');
    if(!isNaN(id)){ //작성된 글 읽기
      Search01(id).then((data) => { //게시글조회
          setSubject(data[0].title);
          setIntroText(data[0].content);
          setPrivew(data[0].privew_content);
      });
      Search02(id).then((data) => {
        // 모든 댓글 정보를 배열에 저장
        const comments = data.map((comment) => {
          return {
            user: comment.ins_user_id,
            content: comment.comment,
            date: comment.ins_ymdhms,
          };
        });
        
        // 배열로 저장한 댓글 정보를 상태 변수로 설정
        setCommentData(comments);
      });
    } else { // 새글작성
      setIsEditing(true);
    }
  }, [id]); // 빈 배열을 전달하여 컴포넌트 마운트 시 한 번만 실행

  return (
    <div className='margin-content'>
      {isEditing ? (
        <textarea value={title} 
        onChange={(e) => setSubject(e.target.value)}
          style={{ width: '50vw' }}
        />
      ) : (
        <div className='board-subject'>
          <h1>{addLineBreaks(title)}</h1>
        </div>
        
      )}
      {isEditing && (
        <p><textarea value={privew} 
        onChange={(e) => setPrivew(e.target.value)}
        style={{ width: '50vw' }}
        />
        </p>
      ) 
      }
      {isEditing ? (
        <ReactQuill value={introText} onChange={handleIntroTextChange} modules={modules} style={{ width: '50vw' }} />
      ) : (
        <p
          className="description"
          dangerouslySetInnerHTML={{ __html: introText }}
        />
      )}
      <p>
        { isLoginYn && 
          <button className="new-post-button" onClick={handleEditButtonClick}>
            {isEditing ? (!isNaN(id) ? '수정' : '저장') : '편집'}
          </button>
        }
      </p>
      { !isNaN(id) &&
      <div className="comment-section">
        <h2>댓글</h2>
        <div className="comment-list">
          {commentData.map((comment, index) => (
            <p key={index}><span className='comment-user'>{comment.user}</span> 
            <span className='comment-txt'>{comment.content}</span>
            <span className='comment-time'>작성시간: {comment.date}</span></p>
          ))}
        </div>

          <div className="comment-form">
            <textarea value={commentText} onChange={handleCommentTextChange} className='comment-textarea' placeholder="댓글을 작성하세요"/>
            <button className="new-post-button" onClick={handleCommenButtonClick}>댓글 작성</button>
          </div>
      </div>
      }
    </div>
  );
}

export default BoardWrite;