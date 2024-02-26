import React, { useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';

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
    
    return (
        <div className='content_body'>
        <div className='registerContainer'>
            <h2>회원정보 수정</h2>
            
            <form onSubmit={registerSubmit}>
                <section className='modify_form'>
                    <p><purple>*</purple> 필수입력사항</p>

                    <div className='inputs'>
                        <div className='cols'><purple>*</purple> 아이디 </div>
                        <div><input type='text' name='userId' value={user.userId} onChange={handleChange} readOnly></input></div>
                    </div>

                    <div className='inputs'>
                        <div className='cols'><purple>*</purple> 생년월일 </div>
                        <div className='birthdate'>
                            <DatePicker
                                locale={ko}
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

  export default UserinfoModify;