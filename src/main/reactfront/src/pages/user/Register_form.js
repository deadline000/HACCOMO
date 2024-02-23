import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import { ko } from 'date-fns/locale';

const Register_form = () => {
    // 받아온 가입 유형 (role)
    const { value } = useParams(); //creator / user
    const roleText = value === 'creator' ? '크리에이터' : '일반';
    const role = value === 'creator' ? 'ROLE_CREATOR' : 'ROLE_USER';

    // role 값 설정
    useEffect(() => {
        setFormValues(prevState => ({
            ...prevState,
            userRole: role
        }));
    }, [value]);

    // form 구성
    const [formValues, setFormValues] = useState({
        userId: '',
        userPwd: '',
        userPhone: '',
        userNickname: '',
        userEmail: '',
        userRole: '',
        marketingAgreement: '',
        userBirth: ''
    });

    // 필수/마케팅 동의 체크 (기본 미체크)
    const [isChecked_a, setIsChecked_a] = useState(false); //필수 동의
    const [isChecked_b, setIsChecked_b] = useState(false); //마케팅 동의
    
    // 필수동의 체크변경
    const handleCheckbox_a_Change = () => {
        setIsChecked_a(!isChecked_a);
    };

    // 마케팅동의여부 체크변경
    const handleCheckbox_b_Change = () => {
        setIsChecked_b(!isChecked_b); // 체크 여부를 반전시킴
        setFormValues(prevState => ({
            ...prevState,
            marketingAgreement: isChecked_b ? 'n' : 'y' // isChecked_b가 true일 때 '', false일 때 'y'
        }));
    };

    // 생년월일 변경 시
    const handleBirthChange = (date) => {
        // date가 null이면 빈 문자열로, 아니면 YYYY-MM-DD 형식으로 변환하여 저장
        setFormValues(prevState => ({
            ...prevState,
            userBirth: date ? `${date.getFullYear()}-${date.getMonth() + 1}-${date.getDate()}` : ''
        }));
    };
    
    // input 값에 따른 세팅
    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormValues(prevState => ({
            ...prevState,
            [name]: value
        }));
    };

    // 폼 제출
    const registerSubmit = async (e) => {
        e.preventDefault();

        if (!isChecked_a) {
            alert("필수 이용약관에 동의하셔야 회원가입이 완료됩니다.");
            return;
        }

        try {
            const response = await axios.post('/user/register', formValues, {
                withCredentials: true
            });
            if (response.data === "success") {
                window.location.href = `/Register_ok/${value}`;
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
                <h2>{roleText}&nbsp;&nbsp;회원가입</h2>
                
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
                            <div><input type='text' name='userId' value={formValues.userId} onChange={handleChange}  placeholder='아이디 입력'></input></div>
                        </div>
                        <div className='inputs'>
                            <div className='cols'><purple>*</purple> 비밀번호 </div>
                            <div><input type='password' name='userPwd' value={formValues.userPwd} onChange={handleChange} placeholder='비밀번호 입력'></input></div>
                        </div>
                        <div className='inputs'>
                            <div className='cols'><purple>*</purple> 비밀번호 확인 </div>
                            <div><input type='password' name='userPwdCheck' value={formValues.userPwdCheck} onChange={handleChange} placeholder='비밀번호 확인'></input></div>
                        </div>

                        <div className='inputs'>
                            <div className='cols'><purple>*</purple> 생년월일 </div>
                            <div className='birthdate'>
                                <DatePicker
                                    locale={ko}
                                    selected={formValues.userBirth ? new Date(formValues.userBirth) : null}
                                    onChange={handleBirthChange}
                                    dateFormat="yyyy-MM-dd"
                                    placeholderText="직접 입력할 수 있습니다. (ex> 1994-10-25)"
                                />
                            </div>
                        </div>

                        <div className='inputs'>
                            <div className='cols'><purple>*</purple> 전화번호 </div>
                            <div><input type='text' name='userPhone' value={formValues.userPhone} onChange={handleChange}  placeholder="'-'제외 숫자만 입력"></input></div>
                        </div>
                        <div className='inputs'>
                            <div className='cols'><purple>*</purple> 닉네임 </div>
                            <div><input type='text' name='userNickname' value={formValues.userNickname} onChange={handleChange} placeholder='닉네임 입력'></input></div>
                        </div>
                        <div className='inputs'>
                            <div className='cols'><purple>*</purple> 이메일 </div>
                            <div><input type='text' name='userEmail' value={formValues.userEmail} onChange={handleChange} placeholder='이메일 입력'></input></div>
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
                        <br/>
                        <button id='backBtn' type='button' onClick={() => { window.location.href = '/register' }}>취소</button>
                        <button id='registerBtn' type="submit">회원가입</button>
                    </div>


                </form>

            </div>
        </div>
    );
};

export default Register_form;