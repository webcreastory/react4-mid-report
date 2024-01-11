import React, { useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { StDiv, StDiv2, StBtn, NavDiv, ListDiv } from './styled';
import { Cookies } from 'react-cookie';
import api from '../axios/api';
import Fab from '@mui/material/Fab';
import HomeIcon from '@mui/icons-material/Home';

// 홈페이지 컴포넌트를 정의합니다.
export default function HomePage() {
    // React Router에서 페이지 전환을 처리하는 navigate 함수를 가져옵니다.
    const navigate = useNavigate();
    // 쿠키를 사용하기 위해 새로운 Cookies 객체를 생성합니다.
    const cookies = new Cookies();
    // const accessToken = cookies.get('token');

    // 토큰 만료 추가 코딩
    // JWT의 유효시간이 만료된 경우, 유저에게 재로그인을 할 것을 표시

    // 로그아웃 기능을 구현하는 함수입니다.
    const logoutHandler = async () => {
        // 쿠키에서 'token'을 제거합니다.
        cookies.remove('token');
        // 로그아웃 후 로그인 페이지로 이동합니다.
        navigate('/');
        // 페이지를 새로고침합니다.
        window.location.reload(); // 새로고침 코드
        // 새로고침을 해야 쿠키에서 토큰이 사라짐
        // 새로고침을 안해도 사라지게 하는 방법 모색
    };

    const loginCheck = async () => {
        // (추가 기능) 토큰 만료 시 처리 방법
        try {
            // mock 서버 API 명세 //
            // 기능: 유저 인증확인 // method: get // url: user // request: header authorization: string
            //  response: 200 {message: “인증에 성공한 요청입니다.”} // error: 401

            // 로그인을 하지 않은 경우에는 로그인/회원가입 페이지만 접근 가능합니다.
            // 쿠키에서 토큰을 가져옵니다.
            const accessToken = cookies.get('token');
            if (!accessToken) {
                // 토큰이 없으면 로그아웃 처리 후 이동합니다.
                navigate('/');
                return;
            }
            // API를 호출하여 유저 인증을 확인합니다.
            const response = await api.get('/user', { headers: { Authorization: accessToken } });
            console.log(response);
        } catch (error) {
            // 만료된 토큰에 대한 처리
            if (error.response.status === 401 && error.response.data.message.includes('토큰은 60분간 유지')) {
                // alert(error.response.data.message); // 토큰이 만료되었습니다. 토큰은 60분간 유지됩니다.
                alert('아이디가 만료되었습니다.'); // 토큰 만료 시 알림 // 어디서 확인하지?
                logoutHandler(); // 로그아웃 처리
            } else if (error.response.status === 401 && error.response.data.message.includes('존재하지 않습니다.')) {
                alert('존재하지 않는 아이디입니다.');
                logoutHandler(); // 로그아웃 처리
            } // header에 authorization 정보가 존재하지 않습니다. // token value가 존재하지 않습니다.
        } // 헤더에 인증 정보가 없거나 토큰 값이 없는 경우 처리 // 5가지 error 모두 나타내야 하는지??
    }; // (문제 상황에 따라 추가적인 에러 처리가 필요할 수 있음)

    useEffect(() => {
        loginCheck();
    }, []);
    // 홈페이지 컴포넌트를 렌더링합니다.
    return (
        <div>
            <NavDiv>
                <Fab size="medium" color="primary" aria-label="home" to="/" component={Link}>
                    <HomeIcon />
                </Fab>
                <StBtn width="10%" bg="red" onClick={logoutHandler}>
                    LOGOUT
                </StBtn>
            </NavDiv>
        <StDiv>
            <h1>✨ WHAT TODO</h1>
            <StDiv2>
                <ListDiv onClick={() => navigate('/memo')}><h2>✅ TODO MEMO</h2></ListDiv>
                <ListDiv onClick={() => navigate('/list')}><h2>✅ TODO LIST</h2></ListDiv>
            </StDiv2>
        </StDiv>
        </div>
    );
}
