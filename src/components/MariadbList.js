import React, { useState, useEffect } from 'react';
import { Search01 } from '../api/BoardList_api';
import '../css/Vuelist.css';
import { useNavigate } from 'react-router-dom';

function NodejsList() {
  const [loading, setLoading] = useState(true);
  const [posts, setPosts] = useState([]);
  const [isLoginYn, setIsLogin] = useState(false);
  const navigate = useNavigate();

  const handleItemClick = (id) => {
    navigate(`/board/${id}`);
  };
  const handleInsertButton = () => {
    navigate(`/board/write/mariadb`);
  };

  useEffect(() => {
    const isLoggedIn = localStorage.getItem('isLoggedIn');
    setIsLogin(isLoggedIn === 'true');
    // 여기에서 게시글 데이터를 가져오는 API 호출 또는 데이터 로딩 로직을 작성
    // 이 예제에서는 더미 데이터를 사용
    const fetchData = async () => {
      try {
        setTimeout(() => {
          Search01('mariadb').then((data) => {
            if(data.length > 0){
              setPosts(data);
              setLoading(false);
            }
          });
        }, 300);
        setLoading(false);
      } catch (error) {
        console.error('데이터를 가져오는 중 오류가 발생했습니다.', error);
      }
    };
    fetchData();
  }, []);

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <div className='margin-content'>
      <div className="vue-list-container">
        { isLoginYn && 
          <button className="new-post-button" onClick={handleInsertButton}>새글추가 +</button>
        }
        <h2>MariaDB 작업 관련 게시판입니다.</h2>
        <ul className="post-list">
          {posts.map((post) => (
            <li key={post.id} className="post-item" onClick={() => handleItemClick(post.id)}>
              <div className="post-title">{post.title}
              </div>
              <div className="post-content">{post.privew_content}</div>
              <div className="post-content">
                <span className='position-right'>입력일자 : {post.ins_ymdhms}</span>
              </div>
          </li>
          ))}
        </ul>
      </div>
    </div>
  );
}

export default NodejsList;