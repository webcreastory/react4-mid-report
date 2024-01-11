import React from 'react';
import { useState } from 'react';
import { StDiv, StDiv2, StBtn, NavDiv, ListDiv, StInput } from './styled';
import Fab from '@mui/material/Fab';
import HomeIcon from '@mui/icons-material/Home';
import { Link, useNavigate } from 'react-router-dom';
import { Cookies } from 'react-cookie';

function MemoPage() {
    const navigate = useNavigate();
    const cookies = new Cookies();
    const accessToken = cookies.get('token');
    const [inputValue, setInputValue] = useState({
        id: '',
        password: '',
    });

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
                <br />
                <h2>작성자</h2> 
                <StInput
                    type="text"
                    value={inputValue.id}
                    onChange={(e) => {
                        setInputValue({ ...inputValue, id: e.target.value });
                    }}
                    placeholder="작성자의 이름을 입력해주세요 (10자 이내)"
                ></StInput>
                <h2>제목</h2> 
                <StInput
                    type="text"
                    value={inputValue.id}
                    onChange={(e) => {
                        setInputValue({ ...inputValue, id: e.target.value });
                    }}
                    placeholder="제목을 입력해주세요 (20자 이내)"
                ></StInput>
                <h2>내용</h2> 
                <StInput
                    type="text"
                    value={inputValue.id}
                    onChange={(e) => {
                        setInputValue({ ...inputValue, id: e.target.value });
                    }}
                    placeholder="내용을 입력해주세요 (200자 이내)"
                ></StInput>
                <StDiv2>
                    <StBtn bg="red" onClick={() => navigate('/list')}>추가하기</StBtn>
                </StDiv2>
            </StDiv>
        </div>
    );
}

export default MemoPage;
