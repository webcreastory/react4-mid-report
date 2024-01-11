// React와 관련된 기능을 가져옵니다.
import React from 'react';
// 앱의 스타일을 담당하는 CSS 파일을 가져옵니다.
import './App.css';
// React Router에서 필요한 요소들을 가져옵니다.
import { BrowserRouter, Route, Routes } from 'react-router-dom';
// 각각의 페이지를 가져옵니다.
import LoginPage from './pages/LoginPage';
import SignUpPage from './pages/SignUpPage';
import HomePage from './pages/HomePage';
import MemoPage from './pages/MemoPage';
import ListPage from './pages/ListPage';


// React 애플리케이션의 기본 컴포넌트를 정의합니다.
function App() {
    return (
        // 브라우저 라우팅을 위해 BrowserRouter를 사용합니다.
        <BrowserRouter>
            {/* 페이지 간의 라우팅을 정의하기 위해 Routes를 사용합니다. */}
            <Routes>
                <Route path="/" element={<LoginPage />} />
                <Route path="/signup" element={<SignUpPage />} />
                <Route path="/home" element={<HomePage />} />
                <Route path="/memo" element={<MemoPage />} />
                <Route path="/list" element={<ListPage />} />
            </Routes>
        </BrowserRouter>
    );
}

// App 컴포넌트를 다른 파일에서 사용할 수 있도록 내보냅니다.
export default App;
