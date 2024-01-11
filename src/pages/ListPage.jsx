import React from 'react';
import { StDiv, StDiv2, StBtn, NavDiv, ListDiv } from './styled';
import Fab from '@mui/material/Fab';
import HomeIcon from '@mui/icons-material/Home';
import { Link, useNavigate } from 'react-router-dom';
import { Cookies } from 'react-cookie';

function ListPage() {
    const navigate = useNavigate();
    const cookies = new Cookies();
    const accessToken = cookies.get('token');

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
                <h1>✨ TODO LIST</h1>
                <StDiv2>
                    <ListDiv onClick={() => navigate('/list')}>
                        <h2>✅ TODO LIST</h2>
                    </ListDiv>
                </StDiv2>
            </StDiv>
        </div>
    );
}

export default ListPage;
