import React, { createContext, useState, useEffect } from 'react';
import Cookies from 'js-cookie';

export const AuthContext = createContext();

const AuthProvider = ({ children }) => {
    // 쿠키에서 토큰과 유저 정보 가져오기
    const tokenCookie = Cookies.get('token'); //토큰
    const isLoginFromCookie = Cookies.get('isLogin') === 'true'; //로그인여부
    const userNicknameCookie = Cookies.get('userNickname'); //닉네임
    const userRoleCookie = Cookies.get('userRole'); //아이디
    const userIdCookie = Cookies.get('userId'); //롤

    // 로그인
    const login = (newToken, newUserId, newUserNickname, newUserRole) => {
      Cookies.set('token', newToken, { expires: 7 }); // 쿠키에 토큰 저장, 7일 유효
      Cookies.set('userNickname', newUserNickname, { expires: 7 }); // 유저 닉네임 쿠키에 저장
      Cookies.set('userRole', newUserRole, { expires: 7 }); // 유저 롤 쿠키에 저장
      Cookies.set('userId', newUserId, { expires: 7 }); // 유저 아이디 쿠키에 저장
      Cookies.set('isLogin', true, { expires: 7 }); // 로그인여부 true로 쿠키에 저장

      
    };

    // 로그아웃
    const logout = () => {
      if (window.confirm("로그아웃 하시겠습니까?")) {
          Cookies.remove('token'); // 토큰 쿠키 삭제
          Cookies.remove('isLogin'); // 로그인 여부 쿠키 삭제
          Cookies.remove('userNickname'); // 유저 닉네임 쿠키 삭제
          Cookies.remove('userRole'); // 유저 롤 쿠키 삭제
          Cookies.remove('userId'); // 유저 아이디 쿠키 삭제
          window.location.reload(); // 페이지 새로고침
      }
  };

    useEffect(() => {
      // 페이지 이동 시에도 쿠키 값 확인
      const token = Cookies.get('token');
      const isLogin = Cookies.get('isLogin') === 'true';
      const userNickname = Cookies.get('userNickname');
      const userRole = Cookies.get('userRole');
      const userId = Cookies.get('userId');

      // 쿠키에 값이 있다면 로그인 상태로 설정
      if (token && isLogin && userNickname && userRole && userId) {
        login(token, userId, userNickname, userRole);
      }
    }, []);

    return (
      <AuthContext.Provider
        value={{
          tokenCookie,
          isLoginFromCookie,
          userNicknameCookie,
          userRoleCookie,
          userIdCookie,
          login,
          logout
        }}
      >
        {children}
      </AuthContext.Provider>
    );
  };
  
  export default AuthProvider;