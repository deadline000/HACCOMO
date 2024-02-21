import React, {useState} from 'react';
import { Link } from 'react-router-dom';

const Register = () => {
  
  const registerGo = (value) => {
    window.location.href = `/Register_form/${value}`;
  };
    
  return (
    
        <div className='content_body'>
            <article className="register_intro">
              <div>
                <div id='cele'></div>
                <h2><span>하꼬모</span>에 오신 것을 환영합니다!</h2>
                <h3>회원 유형을 선택해주세요.</h3>
              </div>

              <section className='register_select'>

                <Link to="/Register_form/creator" className='selectBox'>
                    <div id='user_creator'></div>
                    <p>크리에이터</p>
                </Link>

                <Link to="/Register_form/user" className='selectBox'>
                  <div id='user_user'></div>
                  <p>일반</p>
                </Link>
              </section>
            </article>
        </div>

  );
};

export default Register;