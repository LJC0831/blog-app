
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
        console.error('IntroInsert 내용 저장에 실패했습니다.');
      }
    } catch (error) {
      console.error('IntroInsert 내용 저장에 실패했습니다.', error);
    }
  }

// 다른 API 요청을 처리하는 함수 추가
export async function Search01() {
    try {
        const response = await fetch(`${api}/api/blog/IntroSearch`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
        });
        if (response.ok) {
          // 성공적으로 저장됨
          const data = await response.json(); // JSON 데이터를 파싱
          return data; // 데이터 반환
        } else {
          // 저장 실패
          console.error('Search01 조회실패');
        }
      } catch (error) {
        console.error('Search01 조회실패', error);
      }
  }