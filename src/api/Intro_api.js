
import api from '../api/api';

export async function save01(subejct, content) {
    try {
      const response = await fetch(`${api}/api/blog/IntroInsert`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({subejct, content}),
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

export async function upload01(html) {
  try {
      const chunkSize = 1024; // 각 덩어리의 크기 (예: 1KB * 1000)
      const chunks = [];
      for (let i = 0; i < html.length; i += chunkSize) {
        chunks.push(html.slice(i, i + chunkSize));
      }
      let cnt = 0;
      for (const chunk of chunks) {
        const isLastChunk = cnt === chunks.length;
        debugger;
        const response = await fetch(`${api}/api/blog/intro/upload`, {
          method: 'POST',
          headers: {
            'Content-Type': 'text/plain',
          },
          body: isLastChunk ? chunk : chunk + 'LINEEND'
        });
        if (response.ok) {
          debugger;
          // 성공적으로 저장됨
           const data = await response.text(); // JSON 데이터를 파싱
           return data; // 데이터 반환
        } else {
          // 저장 실패
          console.error('upload 처리실패');
        }
        cnt = cnt + 1;
      }
    } catch (error) {
      console.error('upload 처리실패', error);
    }
}

export async function fileDelete01() {
  try {
      const response = await fetch(`${api}/api/blog/intro/fileDelete`, {
        method: 'GET',
        headers: {
          'Content-Type': 'text/plain',
        },
      });
      if (response.ok) {
      } else {
        // 저장 실패
        console.error('fileDelete 조회실패');
      }
    } catch (error) {
      console.error('fileDelete 조회실패', error);
    }
}