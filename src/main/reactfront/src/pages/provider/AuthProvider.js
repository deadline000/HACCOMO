import React, { createContext, useState } from 'react';
import Cookies from 'js-cookie';

export const AuthContext = createContext();

const AuthProvider = ({ children }) => {
    // 쿠키에서 토큰과 로그인 상태 가져오기
    const tokenFromCookie = Cookies.get('token');
    const isLoginFromCookie = Cookies.get('isLogin') === 'true';

    // 초기값 설정
    const [isLogin, setIsLogin] = useState(isLoginFromCookie || false);
    const [token, setToken] = useState(tokenFromCookie || null);
    const [userId, setUserId] = useState(''); //로그인 유저 아이디
    const [userNickname, setUserNickname] = useState(''); //로그인 유저 닉네임
  
    // 로그인
    const login = (newToken, userData) => {
    Cookies.set('token', newToken, { expires: 7 }); // 쿠키에 토큰 저장, 7일 유효
    Cookies.set('isLogin', 'true', { expires: 7 }); // 로그인 여부도 저장
    setToken(newToken);
    setUserId(userData.userId); //로그인 유저 아이디 저장
    setUserNickname(userData.userNickname); //로그인 유저 닉네임 저장
    setIsLogin(true);
  };

  // 로그아웃
  const logout = () => {
    Cookies.remove('token'); // 토큰 쿠키 삭제
    Cookies.remove('isLogin'); // 로그인 여부 쿠키 삭제
    setIsLogin(false);
  };

  
    return (
      <AuthContext.Provider
        value={{
          tokenFromCookie,
          isLogin,
          login,
          logout,
          userId,
          userNickname
        }}
      >
        {children}
      </AuthContext.Provider>
    );
  };
  
  export default AuthProvider;