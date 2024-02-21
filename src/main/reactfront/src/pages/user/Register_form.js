import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';


const Register_form = () => {
    const { value } = useParams(); //creator / user

    const [isChecked_a, setIsChecked_a] = useState(false);
    const [isChecked_b, setIsChecked_b] = useState(false);

    const handleCheckbox_a_Change = () => {
        setIsChecked_a(!isChecked_a);
    };

    const handleCheckbox_b_Change = () => {
        setIsChecked_b(!isChecked_b);
    };

    const registerSubmit = async (e) => {
        e.preventDefault();

        try {
            const response = await axios.post('백엔드 API 주소', formValues);
            console.log('서버로부터의 응답:', response.data);
        } catch (error) {
            console.error('에러 발생:', error);
        }
    };
    
    return (
        <div className='content_body'>
            <div className='registerContainer'>
                <h2>회원가입</h2>
                <section className='register_phase'>
                    <div className='purpleCircle active'>1</div>
                    
                    <div className='grayline'></div>

                    <div className='purpleCircle'>2</div>
                    <div className='phaseText'>
                        <p>회원약관 및 기본정보</p>
                        <p>가입완료</p>
                    </div>
                </section>

                <form onSubmit={registerSubmit}>
                    <section className='register_form'>
                        <p><purple>*</purple> 필수입력사항</p>

                    
                        <div className='inputs'>
                            <div className='cols'><purple>*</purple> 아이디 </div>
                            <div><input type='text' name='userId' placeholder='아이디 입력'></input></div>
                        </div>
                        <div className='inputs'>
                            <div className='cols'><purple>*</purple> 비밀번호 </div>
                            <div><input type='password' name='userPwd' placeholder='비밀번호 입력'></input></div>
                        </div>
                        <div className='inputs'>
                            <div className='cols'><purple>*</purple> 비밀번호 확인 </div>
                            <div><input type='password' name='userPwdCheck' placeholder='비밀번호 확인'></input></div>
                        </div>
                        <div className='inputs'>
                            <div className='cols'><purple>*</purple> 전화번호 </div>
                            <div><input type='text' name='userPhone' placeholder="'-'제외 숫자만 입력"></input></div>
                        </div>
                        <div className='inputs'>
                            <div className='cols'><purple>*</purple> 닉네임 </div>
                            <div><input type='text' name='userNickname' placeholder='닉네임 입력'></input></div>
                        </div>
                        <div className='inputs'>
                            <div className='cols'><purple>*</purple> 이메일 </div>
                            <div><input type='text' name='userEmail' placeholder='이메일 입력'></input></div>
                        </div>
                    </section>

                    <div className='checkAgree'>
                        <label>
                            <input
                                type='checkbox'
                                checked={isChecked_a}
                                onChange={handleCheckbox_a_Change}
                            />
                            <span><red>[필수]</red> 이용약관 동의</span>
                        </label>
                        <label>
                            <input
                                type='checkbox'
                                checked={isChecked_b}
                                onChange={handleCheckbox_b_Change}
                            />
                            <span>[선택] 마케팅 정보 수신 동의</span>
                        </label>
                    </div>

                    <button type="submit">회원가입</button>

                </form>

            </div>
        </div>
    );
};

export default Register_form;