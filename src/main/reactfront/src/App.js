import './App.css';
import './css/user.css';
import './css/login.css';
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



const App = () => {
  
  return (
    <AuthProvider>
        <div>
          <Header/> {/* 헤더 */}

          {/* 내용 */}
          <Router>
            <Routes>
                <Route path="/" element={<Main />} />
                <Route path="/notice" element={<Notice/>} />
                <Route path="/creator" element={<Creator/>} />
                <Route path="/register"element={<Register />} />
                <Route path="/Register_form/:value" element={<Register_form/>} />
                <Route path="/Register_ok/:value" element={<Register_ok/>} />
                <Route path="/login" element={<Login />}/>
            </Routes>
          </Router>

          <Footer/> {/* 푸터 */}
        </div>
    </AuthProvider>
  );
};


export default App;