
import api from '../api/api';

export async function save01(content) {
    try {
      const response = await fetch(`${api}/api/blog/IntroInsert`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ content }),
      });
      if (response.ok) {
        // 성공적으로 저장됨
        console.log('내용이 성공적으로 저장되었습니다.');
      } else {
        // 저장 실패
        console.error('내용 저장에 실패했습니다.');
      }
    } catch (error) {
      console.error('내용 저장 중 오류 발생:', error);
    }
  }

// 다른 API 요청을 처리하는 함수 추가
export async function Search01(endpoint) {
    try {
      const response = await fetch(`${api}${endpoint}`);
      if (response.ok) {
        const data = await response.json();
        return data;
      } else {
        throw new Error('데이터 검색에 실패했습니다.');
      }
    } catch (error) {
      console.error('데이터 검색 중 오류 발생:', error);
      throw error;
    }
  }