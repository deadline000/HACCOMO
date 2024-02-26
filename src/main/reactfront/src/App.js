import './App.css';
import './css/user.css';
import './css/login.css';
import './css/myinfo.css';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'; //라우터
import AuthProvider from './pages/provider/AuthProvider' //토큰,로그인상태 관리

import Header from './pages/fragment/Header'; // 헤더
import Footer from './pages/fragment/Footer'; // 푸터
import Main from './pages/main'; // 메인화면

import Notice from './pages/notice/notice'; // 공지사항
import Creator from './pages/creator/creator'; // 크리에이터 프로필
import Register from './pages/user/Register'; // 회원가입 (유형 선택)
import Register_form from './pages/user/Register_form'; // 회원가입 (폼)
import Register_ok from './pages/user/Register_ok'; // 회원가입 완료
import Login from './pages/user/Login'; // 로그인
import Myinfo from './pages/user/Myinfo/Myinfo'; // 내정보

import UserInfo from './pages/user/Myinfo/Userinfo'; //내정보 > 회원정보
import UserinfoModify from './pages/user/Myinfo/UserinfoModify'; //내정보 > 회원정보 > 정보수정
import MyProfile from './pages/user/Myinfo/MyProfile'; //내정보 > 내 프로필
import MyQuestions from './pages/user/Myinfo/MyQuestions'; //내정보 > 내 문의
import MyPosts from './pages/user/Myinfo/MyPosts'; //내정보 > 내 게시물
import Withdraw from './pages/user/Myinfo/Withdraw'; //내정보 > 회원탈퇴

const App = () => {
  return (
    <AuthProvider>
      <div>
        <Header /> {/* 헤더 */}

        {/* 내용 */}
        <Router>
          <Routes>
            <Route path="/" element={<Main />} />
            <Route path="/notice" element={<Notice />} />
            <Route path="/creator" element={<Creator />} />
            <Route path="/register" element={<Register />} />
            <Route path="/Register_form/:value" element={<Register_form />} />
            <Route path="/Register_ok/:value" element={<Register_ok />} />
            <Route path="/login" element={<Login />} />
            
            <Route path="/myinfo/*" element={<Myinfo />}>
              <Route index path="" element={<UserInfo />} />
              <Route path="UserInfo" element={<UserInfo />}></Route>
              <Route path="MyProfile" element={<MyProfile />}></Route>
              <Route path="MyQuestions" element={<MyQuestions />}></Route>
              <Route path="MyPosts" element={<MyPosts />}></Route>
              <Route path="Withdraw" element={<Withdraw />}></Route>
              <Route path="UserinfoModify" element={<UserinfoModify />}></Route>
            </Route>

          </Routes>
        </Router>

        <Footer /> {/* 푸터 */}
      </div>
    </AuthProvider>
  );
};

export default App;