import React from 'react';

// 헤더
const Header = () => {
  return (
    
        <header>
            <div>
                <h2><a href="/">HA<span>CCO</span>MO</a></h2>
                
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
                    <a href="/login">로그인</a>
                    <a href="/register">회원가입</a>
                    <a href="#">내정보</a>
                </div>
            </div>
        </header>

  );
};

export default Header;