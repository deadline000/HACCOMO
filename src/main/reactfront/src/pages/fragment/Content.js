import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'; //라우터
import Main from '../main'; // 메인화면
import Notice from '../notice/notice'; // 공지사항
import Creator from '../creator/creator'; // 크리에이터 프로필
import Register from '../user/Register'; // 회원가입 (유형 선택)
import Register_form from '../user/Register_form'; // 회원가입 (폼)

const Content = () => {
  return (
    <Router>
      <div>
        <Routes>
            <Route path="/" element={<Main />} />
            <Route path="/notice" element={<Notice/>} />
            <Route path="/creator" element={<Creator/>} />
            <Route path="/register" element={<Register/>} />
            <Route path="/Register_form/:value" element={<Register_form/>} />
        </Routes>
      </div>
    </Router>
  );
};

export default Content;