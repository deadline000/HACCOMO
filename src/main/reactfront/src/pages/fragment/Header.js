import React, { useContext } from 'react';
import { AuthContext } from '../provider/AuthProvider'; //토큰+로그인정보

// 헤더
const Header = () => {
    const { isLogin,logout,userId,userNickname } = useContext(AuthContext);

    // 로그아웃
    const handleLogout = (e) => {
        e.preventDefault();
        if(window.confirm("로그아웃 하시겠습니까?")){
            alert("로그아웃되었습니다.");
            logout();
        }
    };
    
  return (
    
        <header>
            <div>
                <h2><a href="/">HA<span>CCO</span>MO</a></h2>
                <h4>아이디: {userId}</h4>
                <h4>닉네임: {userNickname}</h4>
                
                <nav className="menu">
                    <ul>
                        <li><a href="#">NOTICE</a>
                            <ul>
                                <li><a href="/notice">공지사항</a></li>
                                <li><a href="#">이벤트</a></li>
                                <li><a href="#">TIP</a></li>
                            </ul>
                        </li>
                        
                        <li><a href="#">CREATOR</a>
                            <ul>
                                <li><a href="/creator">프로필 보기</a></li>
                            </ul> 
                        </li>         
                        <li><a href="#">COMMUNITY</a>
                            <ul>
                                <li><a href="#">자유게시판</a></li>
                                <li><a href="#">구인/구직</a></li>
                                <li><a href="#">정보게시판</a></li>
                            </ul>
                        </li>          
                        <li><a href="#">SHOP</a>
                            <ul>
                                <li><a href="#">굿즈샵</a></li>
                                <li><a href="#">제휴/문의</a></li>
                            </ul>
                        </li>          
                        <li><a href="#">MY</a>
                            <ul>
                                <li><a href="#">내 정보</a></li>
                                <li><a href="#">문의하기</a></li>
                                <li><a href="#">내가 쓴 글</a></li>
                                <li><a href="#">쪽지함</a></li>
                            </ul>
                        </li> 
                    </ul>
                </nav>

                <div>
                    {/* 로그인 상태에 따라 다른 링크 표시 */}
                    {isLogin ? (
                        <div>
                        <a href="#">내정보</a>
                        <a href="#" onClick={handleLogout}>로그아웃</a>
                        </div>
                    ) : (
                        <div>
                        <a href="/login">로그인</a>
                        <a href="/register">회원가입</a>
                        </div>
                    )}
                </div>
                
            </div>
        </header>

  );
};

export default Header;