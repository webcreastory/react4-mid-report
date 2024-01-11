// 필요한 React 요소들을 가져옵니다.
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
// 스타일 관련 컴포넌트들을 가져옵니다.
import { StDiv, StDiv2, StInput, TextDiv, StBtn } from './styled';
// API 호출을 위한 모듈을 가져옵니다.
import api from '../axios/api';
// 쿠키 기능을 사용하기 위한 모듈을 가져옵니다.
import { Cookies } from 'react-cookie';

// 로그인 페이지 컴포넌트를 정의합니다.
export default function LoginPage() {
    // React Router의 navigate 함수를 가져옵니다.
    const navigate = useNavigate();
    // 쿠키 객체를 생성합니다.
    const cookies = new Cookies();
    // 쿠키에서 토큰을 가져옵니다.
    const accessToken = cookies.get('token');
    // 아이디와 비밀번호를 상태로 관리합니다.
    const [inputValue, setInputValue] = useState({
        id: '',
        password: '',
    });
    
    // 로그인을 이미 한 경우, 로그인/회원가입 페이지는 접근 할 수 없습니다.
    // 페이지가 처음 렌더링될 때 특정 작업을 수행합니다.
    useEffect(() => {
        // 이미 로그인한 경우 홈페이지로 이동합니다.
        if (accessToken) {
            navigate('/home');
        } // 여기에 토큰 만료 시 처리 추가
    }, []);// 토큰 만료 추가 코딩
    
    // 로그인을 처리하는 함수입니다.
    const loginHandler = async () => {
        // 아이디와 비밀번호가 모두 입력되지 않으면, API 요청을 보내지 않도록 합니다.
        if (inputValue.id === '' && inputValue.password === '') {
            alert('아이디와 비밀번호를 입력해주세요!');
            return;
        }
        try {
            // mock 서버 API 명세 // 
            // 유저 로그인 // method: post // url: login // request: inputValue(id, password) 
            //  response: 201 token // error: 401 (4가지 경우)
            
            // 서버에 로그인 요청을 보냅니다.
            const response = await api.post('/login', inputValue);
            // 로그인에 성공하면 받은 토큰을 쿠키에 저장하고 홈페이지로 이동합니다.
            const accessToken = response.data.token;
            // JWT의 유효시간 60분이 만료된 경우, 유저에게 재로그인을 할 것을 표시합니다
            cookies.set('token', accessToken, { maxAge: 60 * 60, path: '/' });
            navigate('/home');
        } catch (error) {
            // 서버 에러1. 존재하지 않는 아이디를 입력한 경우
            if (error.response.status === 401 && error.response.data.message.includes('존재하지 않는 유저')) {
                // alert(error.response.data.message);
                alert('존재하지 않는 아이디입니다.'); // 서버 에러2. 비밀번호가 잘못된 경우
            } else if (
                error.response.status === 401 &&
                error.response.data.message === '비밀번호가 일치하지 않습니다.'
            ) {
                alert(error.response.data.message); // 비밀번호가 일치하지 않습니다.
                // 서버 에러3. 아이디와 비밀번호가 모두 입력되지 않은 경우
            } else if (error.response.status === 401 && error.response.data.message.includes('존재하지 않습니다.')) {
                alert(error.response.data.message); // id 또는 password가 존재하지 않습니다.
            } // "401 id 또는 password가 string이 아닙니다. 구현하지 않음" status가 201로 뜸
        }
    };
    // 리액트 login, 회원가입 검색
    // 리액트 토큰 쿠키 저장 검색

    return (
        <StDiv>
            <h1>로그인 하기</h1>
            <StDiv2>
                <TextDiv>아이디</TextDiv>
                <StInput
                    type="text"
                    value={inputValue.id}
                    onChange={(e) => {
                        setInputValue({ ...inputValue, id: e.target.value });
                    }}
                    placeholder="아이디를 입력하세요"
                ></StInput>
                <TextDiv>비밀번호</TextDiv>
                <StInput
                    type="password"
                    value={inputValue.password}
                    onChange={(e) => {
                        setInputValue({ ...inputValue, password: e.target.value });
                    }}
                    placeholder="비밀번호를 입력하세요"
                ></StInput>
                <StBtn bg="red" onClick={() => loginHandler()}>로그인</StBtn>
                <StBtn bg="red" onClick={() => navigate('/signup')}>회원가입</StBtn>
            </StDiv2>
        </StDiv>
    );
}
