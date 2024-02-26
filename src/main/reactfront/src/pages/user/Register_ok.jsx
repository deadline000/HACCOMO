import React from 'react';
import { useParams} from 'react-router-dom';

const Register_ok = () => {
    // 받아온 가입 유형 (role)
    const { value } = useParams(); //creator / user
    const roleText = value === 'creator' ? '크리에이터' : '일반';

    const login = () => {
        window.location.href='/login' // 로그인 페이지로
    };

    return (

        <div className='content_body'>
            <div className='registerContainer' id='ok'>
                <h2>{roleText}&nbsp;&nbsp;회원가입</h2>
                
                <section className='register_phase'>
                    <div className='purpleCircle'>1</div>
                    
                    <div className='grayline'></div>

                    <div className='purpleCircle active'>2</div>
                    <div className='phaseText'>
                        <p>회원약관 및 기본정보</p>
                        <p>가입완료</p>
                    </div>
                </section>

                <div className='registerOk'>
                    <h3>회원가입이 완료되었습니다.</h3>
                    <h4><purple>하꼬모</purple>에 오신 것을 환영합니다!</h4>
                    <button id='registerBtn' onClick={login}>로그인</button>
                </div>

            </div>
        </div>
    );
};

export default Register_ok;