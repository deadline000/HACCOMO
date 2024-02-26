import React, {useState,useEffect,useContext} from 'react';
import axios from 'axios';
import { AuthContext } from '../../provider/AuthProvider'; //토큰+로그인정보
import myinfo_default from '../../../img/myinfo_default.jpg'; // 이미지 경로
import { useNavigate } from 'react-router-dom';

const Userinfo = () => {
    // 클릭 시 원본 이미지 팝업창
    const openImageInNewTab = () => {
      const newWindow = window.open('', '_blank', 'width=600,height=400');
      newWindow.document.body.innerHTML = `
        <div style="display: flex; justify-content: center; align-items: center; height: 100vh;">
          <img src="${myinfo_default}" alt="프로필 이미지" style="min-width: 100%; min-height: 100%;" />
        </div>
      `;
    };

    const [user, setUser] = useState(null);// 리턴 값 (user객체)
    const { tokenCookie } = useContext(AuthContext);// 쿠키에서 토큰 꺼내옴
    const navigate  = useNavigate();

    // 페이지 로딩 시
    useEffect(() => {
      const fetchUser = async () => {
        try {
          if (!tokenCookie) { //토큰 없을시 리턴
            alert("로그인이 필요합니다!");
            navigate('/login');
            return;
          }
          console.log("토큰 : ", tokenCookie);
          // 컨트롤러에 토큰을 통한 회원조회 요청
          const response = await axios.get('/user/info', {
            headers: {
              // token: tokenCookie
              Authorization: tokenCookie // 토큰을 Authorization 헤더에 포함
            }
          });
  
          setUser(response.data);

        } catch (error) {
          console.error("회원정보 조회 에러", error.message);
          if (error.response) {
            // 요청은 성공했지만 서버에서 오류 응답을 보낸 경우
            console.error("백엔드가 잘못한 번호:", error.response.status);
            console.error("백엔드가 잘못한 데이터:", error.response.data);
          } else if (error.request) {
            // 요청 자체가 실패한 경우
            console.error("요청 자체가 안됨:", error.request);
          } else {
            console.error("몰루겠네요 기타 에러 메시지 이거 뜨면 큰일임:", error.message);
          }
          alert("조회 에러!");
        }
      };
      fetchUser();
    }, []);
    
    if (!user) {
      return <div className='loading'>결과 없음...</div>;
    }

    const goModify = () => {
        navigate('/myinfo/UserinfoModify', { state: { user } });
    };
    
    return (
      <div className='content_body'>
        <div>
          <table className='userInfoTable'>
            <tbody>
              <tr>
                <th colSpan={2}> 회원 정보 </th>
              </tr>
              <tr>
                <td>
                  <ul>
                  <li>아이디 : {user.userId ? user.userId : "없음"}</li>
                  <li>닉네임 : {user.userNickname ? user.userNickname : "없음"}</li>
                  <li>가입일 : {user.signupDate ? user.signupDate : "없음"}</li>
                  <li>회원유형 : {user.userRole ? user.userRole : "없음"}</li>
                  </ul>
                </td>
                <td>
                  <div onClick={openImageInNewTab}>
                    <img src={myinfo_default} alt="프로필 이미지" className="my_profileImg" />
                  </div>
                </td>
              </tr>
              <tr>
                <td colSpan={2}>
                  <button type='button' onClick={goModify}>회원정보 수정</button>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    );
  };

  export default Userinfo;