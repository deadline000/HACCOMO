import React, { useState,useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import axios from 'axios';

const UserinfoModify = () => {
    const location = useLocation();
    const navigate = useNavigate();
    const user = location.state ? location.state.user : null; // 수정 전 조회페이지에서 가져온 객체

    useEffect(() => {
        if (!user) {
          alert('접근할 수 없는 페이지입니다.');
          navigate('/');
        }
      }, []);

    // form 구성
    const [formValues, setFormValues] = useState({
        userId: user.userId,
        userPwd: user.userPwd,
        userPhone: '',
        userNickname: '',
        userEmail: '',
        userRole: '',
        marketingAgreement: '',
        userBirth: ''
    });

    // input 값에 따른 세팅
    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormValues(prevState => ({
            ...prevState,
            [name]: value
        }));
    };

    // 폼 제출
    const modifySubmit = async (e) => {
        e.preventDefault();

        try {
            const response = await axios.post('/user/userModify', formValues, {
                withCredentials: true
            });
            if (response.data === "success") {
                alert("수정되었습니다!");
                window.location.reload();
            } else {
                alert("회원가입 실패!");
            }
        } catch (error) {
            alert("에러!");
            console.error('에러 발생:', error.response.data);
        }
    };
    
    return (
        <div className='content_body'>
        <div className='registerContainer'>
            <h2>회원정보 수정</h2>
            
            <form onSubmit={modifySubmit}>
                <section className='register_form'>
                    <p><purple>*</purple> 필수입력사항</p>

                    <div className='inputs'>
                        <div className='cols'> 아이디 </div>
                        <div>{user.userId}</div>
                    </div>

                    <div className='inputs'>
                            <div className='cols'><purple>*</purple> 생년월일 </div>
                            <div><input type='text' name='userBirth' value={user.userBirth} onChange={handleChange}  placeholder="YYYY-MM-DD 형식으로 입력해주세요." required></input></div>
                        </div>

                    <div className='inputs'>
                        <div className='cols'><purple>*</purple> 전화번호 </div>
                        <div><input type='text' name='userPhone' value={user.userPhone} onChange={handleChange}  placeholder="'-'제외 숫자만 입력" required></input></div>
                    </div>
                    <div className='inputs'>
                        <div className='cols'><purple>*</purple> 닉네임 </div>
                        <div><input type='text' name='userNickname' value={user.userNickname} onChange={handleChange} placeholder='닉네임 입력' required></input></div>
                    </div>
                    <div className='inputs'>
                        <div className='cols'><purple>*</purple> 이메일 </div>
                        <div><input type='text' name='userEmail' value={user.userEmail} onChange={handleChange} placeholder='이메일 입력' required></input></div>
                    </div>
                </section>

                <div className='checkAgree'>
                    <button id='backBtn' type='button' onClick={() => { window.location.href = '/myinfo/UserInfo' }}>취소</button>
                    <button id='registerBtn' type="submit">회원가입</button>
                </div>

            </form>

        </div>
    </div>
    );
  };

  export default UserinfoModify;