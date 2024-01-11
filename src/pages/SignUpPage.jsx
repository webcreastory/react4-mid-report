// React Hook과 관련된 요소들을 가져옵니다.
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
// 스타일링을 위한 컴포넌트들을 가져옵니다.
import { StDiv, StDiv2, StInput, TextDiv, StBtn } from './styled';
// API 호출을 위한 모듈을 가져옵니다.
import api from '../axios/api';
// 쿠키 관련 기능을 가져옵니다.
import { Cookies } from 'react-cookie';

// 회원가입 페이지 컴포넌트를 정의합니다.
export default function SignUpPage() {
    // React Router의 navigate 함수를 가져옵니다.
    const navigate = useNavigate();
    // 쿠키를 사용하기 위해 새로운 Cookies 객체를 생성합니다.
    const cookies = new Cookies();
    // 쿠키에서 토큰을 가져옵니다.
    const accessToken = cookies.get('token');
    // 아이디와 비밀번호를 관리하기 위한 상태 변수를 설정합니다.
    const [inputValue, setInputValue] = useState({
        id: '',
        password: '',
    });

    // 페이지가 처음 렌더링될 때 특정 작업을 수행합니다.
    useEffect(() => {
        if (accessToken) {
            // 이미 로그인한 경우 홈페이지로 이동합니다.
            navigate('/home');
        } // 토큰 만료 추가 처리
        // JWT의 유효시간이 만료된 경우, 유저에게 재로그인을 할 것을 알려줍니다.
    }, []);

    // 회원가입을 처리하는 함수입니다.
    const signUpHandler = async () => {
        // 아이디와 비밀번호가 모두 입력되지 않으면, API 요청을 보내지 않습니다.
        if (inputValue.id === '' && inputValue.password === '') {
            alert('아이디와 비밀번호를 입력해주세요!');
            return;
        }
        try {
            // mock 서버 API 명세 //
            // 기능: 유저 회원가입 // method: post // url: register // request: inputValue(id, password)
            //  response: 201, token(없음) // error: 401 (3가지 경우)

            // 서버에 회원가입 요청을 보냅니다.
            const response = await api.post('/register', inputValue);
            console.log(response);
            navigate('/');
        } catch (error) {
            // 서버에서 발생한 오류를 처리합니다.
            if (error.response.status === 401 && error.response.data.message.includes('이미 존재하는 유저')) {
                // alert(error.response.data.message);
                alert('이미 존재하는 아이디입니다.');
            } else if (error.response.status === 401 && error.response.data.message.includes('존재하지 않습니다.')) {
                alert(error.response.data.message); // id 또는 password가 존재하지 않습니다.
            } // "401 id 또는 password가 string이 아닙니다. 구현하지 않음" status가 201로 뜸
        }
    };

    return (
        <StDiv>
            <h1>회원가입</h1>
            <StDiv2>
                <TextDiv>아이디</TextDiv>
                {/* 아이디 입력 필드 */}
                <StInput
                    type="text"
                    value={inputValue.id}
                    onChange={(e) => {
                        setInputValue({ ...inputValue, id: e.target.value });
                    }}
                    placeholder="아이디를 입력하세요"
                ></StInput>
                <TextDiv>비밀번호</TextDiv>
                {/* 비밀번호 입력 필드 */}
                <StInput
                    type="password"
                    value={inputValue.password}
                    onChange={(e) => {
                        setInputValue({ ...inputValue, password: e.target.value });
                    }}
                    placeholder="비밀번호를 입력하세요"
                ></StInput>
                <StBtn bg="red" onClick={signUpHandler}>회원가입</StBtn>
                <StBtn bg="red" onClick={() => navigate('/')}>로그인하기</StBtn>
            </StDiv2>
        </StDiv>
    );
}
