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

    // input 값에 따른 세팅
    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormValues(prevState => ({
            ...prevState,
            [name]: value
        }));
    };

    // 패스워드 확인
    const [userPwdCheck, setUserPwdCheck] = useState('');
    // 비밀번호 확인 값 변경
    const handlePwdCheckChange = (e) => {
        const { value } = e.target;
        setUserPwdCheck(value);
    };

    // 중복 확인 결과 (1이어야 회원가입 가능)
    const [isUserIdDuplicate, setIsUserIdDuplicate] = useState(null);

    // 아이디 중복 확인 요청
    const idCheck = async () => {
        try {
            const response = await axios.get('/user/userIdCheck', {
                params: {
                    userId: formValues.userId
                }
            });
            setIsUserIdDuplicate(response.data); // 중복 여부를 받아와서 상태 업데이트
        } catch (error) {
            console.error('중복 확인 에러:', error);
            // 에러 처리 로직 추가
        }
    };

    // 폼 제출
    const registerSubmit = async (e) => {
        e.preventDefault();

        // 필수 동의 미체크 시
        if (!isChecked_a) {
            alert("필수 이용약관에 동의하셔야 회원가입이 완료됩니다.");
            return;
        }
        // 아이디 중복체크 안했을때 or 중복일 시
        if (isUserIdDuplicate !== 1 || isUserIdDuplicate === null) {
            alert("아이디 중복확인 바랍니다!");
            return;
        }
        // 비밀번호와 비밀번호 확인 일치 여부 확인
        if (formValues.userPwd !== userPwdCheck || formValues.userPwd === '') {
            alert("비밀번호가 일치하지 않습니다!");
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

                    
                        <div className='inputs_id'>
                            <div className='cols'><purple>*</purple> 아이디 </div>
                            <div><input type='text' name='userId' value={formValues.userId} onChange={handleChange}  placeholder='아이디 입력'></input></div>
                            <div><button id='idCheckBtn' type='button' onClick={idCheck}>중복확인</button></div>
                            {isUserIdDuplicate === 0 && <div style={{ color: 'red' }}>이미 사용 중인 아이디입니다.</div>}
                            {isUserIdDuplicate === 1 && <div style={{ color: 'blue' }}>사용 가능한 아이디입니다.</div>}
                            {isUserIdDuplicate === 2 && <div style={{ color: 'red' }}>아이디를 입력해주세요!</div>}
                        </div>
                        <div className='inputs'>
                            <div className='cols'><purple>*</purple> 비밀번호 </div>
                            <div><input type='password' name='userPwd' value={formValues.userPwd} onChange={handleChange} placeholder='비밀번호 입력'></input></div>
                        </div>
                        <div className='inputs'>
                            <div className='cols'><purple>*</purple> 비밀번호 확인 </div>
                            <div><input type='password' name='userPwdCheck' value={userPwdCheck} onChange={handlePwdCheckChange} placeholder='비밀번호 확인'></input></div>
                            {userPwdCheck === formValues.userPwd && formValues.userPwd !== '' && <div style={{ color: 'blue' }}>비밀번호가 일치합니다.</div>}
                            {userPwdCheck !== formValues.userPwd && <div style={{ color: 'red' }}>비밀번호가 일치하지 않습니다.</div>}
                        </div>

                        <div className='inputs'>
                            <div className='cols'><purple>*</purple> 생년월일 </div>
                            <div><input type='text' name='userBirth' value={formValues.userBirth} onChange={handleChange}  placeholder="YYYY-MM-DD 형식으로 입력해주세요."></input></div>
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