
import api from '../api/api';

export async function save01(title, content, privew) {
    try {
      const response = await fetch(`${api}/api/blog/BoardInsert`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({title, content, privew}),
      });
      if (response.ok) {
        // 성공적으로 저장됨
        console.log('내용이 성공적으로 저장되었습니다.');
      } else {
        // 저장 실패
        console.error('BoardInsert 내용 저장에 실패했습니다.');
      }
    } catch (error) {
      console.error('BoardInsert 내용 저장에 실패했습니다.', error);
    }
  }

  export async function update01(title, content, privew, id) {
    try {
      const response = await fetch(`${api}/api/blog/BoardUpdate`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({title, content, privew, id }),
      });
      if (response.ok) {
        // 성공적으로 저장됨
        console.log('내용이 성공적으로 저장되었습니다.');
      } else {
        // 저장 실패
        console.error('BoardUpdate 내용 저장에 실패했습니다.');
      }
    } catch (error) {
      console.error('BoardUpdate 내용 저장에 실패했습니다.', error);
    }
  }

export async function Search01(board_id) {
    try {
        const response = await fetch(`${api}/api/blog/BoardSearch`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({board_id}),
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