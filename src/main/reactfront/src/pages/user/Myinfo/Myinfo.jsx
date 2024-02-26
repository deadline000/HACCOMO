import React, { useState,useContext } from 'react';
import { AuthContext } from '../../provider/AuthProvider'; //토큰+로그인정보
import { NavLink,useNavigate,Outlet,Routes, Route } from 'react-router-dom';

const Myinfo = () => {

  const {userNicknameCookie} = useContext(AuthContext);

  const navigate = useNavigate();

  // 선택된 항목 인덱스 상태
  const [selectedItem, setSelectedItem] = useState(0);

  // 클릭 이벤트 핸들러
  const handleItemClick = (index, path) => {
    setSelectedItem(index);
    navigate(path);
  };

  return (
    <div className='content_body'>
      <div className='myInfo_container'>
        <nav className='myinfo_header'>
          <div>
            <div className='profileImg'></div>
            <p><purple>{userNicknameCookie}</purple>님 반갑습니다!</p>
            <ul>
              <NavLink exact to="UserInfo"><li className={selectedItem === 0 ? 'myinfoChecked' : ''} onClick={() => handleItemClick(0, "/UserInfo")}>▶&nbsp;&nbsp;&nbsp;회원정보</li></NavLink>
              <NavLink  to={"MyProfile"}><li className={selectedItem === 1 ? 'myinfoChecked' : ''} onClick={() => handleItemClick(1, "/MyProfile")}>▶&nbsp;&nbsp;&nbsp;내 프로필</li></NavLink >
              <NavLink  to={"MyQuestions"}><li className={selectedItem === 2 ? 'myinfoChecked' : ''} onClick={() => handleItemClick(2, "/MyQuestions")}>▶&nbsp;&nbsp;&nbsp;내 문의</li></NavLink >
              <NavLink  to={"MyPosts"}><li className={selectedItem === 3 ? 'myinfoChecked' : ''} onClick={() => handleItemClick(3, "/MyPosts")}>▶&nbsp;&nbsp;&nbsp;내 게시물</li></NavLink >
              <NavLink  to={"Withdraw"}><li className={selectedItem === 4 ? 'myinfoChecked' : ''} onClick={() => handleItemClick(4, "/Withdraw")}>▶&nbsp;&nbsp;&nbsp;회원탈퇴</li></NavLink >
            </ul>
          </div>
        </nav>
        <Outlet/>
      </div>
    </div>
  );
};

export default Myinfo;