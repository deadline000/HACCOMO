import React, { useState, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { AuthContext } from '../provider/AuthProvider'; //토큰+로그인정보

const Login = () => {
    const { login } = useContext(AuthContext); // AuthContext에서 login 함수 가져오기
    

    // 폼 정의
    const [formValues, setFormValues] = useState({
        userId: '',
        userPwd: '',
    });
    // 폼 데이터 변경
    const navigate  = useNavigate();

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormValues(prevState => ({
            ...prevState,
            [name]: value
        }));
    };

    const loginSubmit = async (e) => {
        e.preventDefault();

        if (!formValues.userId || !formValues.userPwd) {
            alert("아이디와 비밀번호를 모두 입력해주세요!");
            return;
        }

        try {
            const response = await axios.post('/user/login', formValues, {
                withCredentials: true
            });
            console.log('로그인 응답:', response.data); // 응답 데이터 콘솔에 출력
            if (response.data === "noPwd") {
                alert("비밀번호가 틀렸습니다!");
            } else if (response.data === "noId") {
                alert("일치하는 아이디가 없습니다!");
            } else {
                // 서버에서 받은 데이터 (토큰, 유저객체)
                const { token, user } = response.data;

                login(response.data, user); // 로그인 성공 시 AuthProvider에 토큰+유저정보 저장

                alert("로그인 성공!");
                navigate('/');
            }
        } catch (error) {
            alert("에러!");
            console.error('에러 발생:', error.response.data);
        }
    };

    return (
        <div className='content_body'>
            <div className='loginContainer'>
                <h3>로그인</h3>
                <form onSubmit={loginSubmit}>
                    <table className='loginTable'>
                        <tr>
                            <td><purple>아이디</purple></td>
                            <td>
                                <input type='text' name='userId' value={formValues.userId} onChange={handleChange} placeholder='아이디를 입력하세요.' />
                            </td>
                        </tr>
                        <tr>
                            <td><purple>패스워드</purple></td>
                            <td>
                                <input type='password' name='userPwd' value={formValues.userPwd} onChange={handleChange} placeholder='패스워드를 입력하세요.' />
                            </td>
                        </tr>
                        <tr>
                            <td colSpan={2}>
                                <button id='registerBtn' type='submit'>로그인</button>
                            </td>
                        </tr>
                    </table>
                </form>
            </div>
        </div>
    );
};

export default Login;