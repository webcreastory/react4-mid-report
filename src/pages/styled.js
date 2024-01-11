import styled from 'styled-components';

export const StDiv = styled.div`
    height: 79vh;
    width: 98%;
    display: flex;
    flex-direction: column;
    gap: 50px;
    -webkit-box-pack: center;
    justify-content: center;
    padding: 0px 20px;
`;
export const StDiv2 = styled.div`
    width: 100%;
    display: flex;
    flex-direction: column;
    gap: 20px;
`;
export const NavDiv = styled.div`
    display: flex;
    -webkit-box-align: center;
    align-items: center;
    -webkit-box-pack: justify;
    justify-content: space-between;
    flex-direction: row;
    height: 60px;
    background-color: rgb(255, 255, 255);
    border-bottom: 1px solid rgb(221, 221, 221);
    padding: 5px 12px 5px 5px;
`
export const StInput = styled.input`
    box-sizing: border-box;
    height: 46px;
    width: 100%;
    outline: none;
    border-radius: 8px;
    padding: 0px 12px;
    font-size: 14px;
    border: 1px solid rgb(238, 238, 238);
`;
export const TextDiv = styled.div`
    box-sizing: border-box;
    padding: 0px;
    margin: 0px;
    text-decoration: none;
    outline: none;
    font-family: "Noto Sans KR", sans-serif;
`;
export const StBtn = styled.button`
    display: flex;
    -webkit-box-align: center;
    align-items: center;
    -webkit-box-pack: center;
    justify-content: center;
    flex-direction: row;
    flex-shrink: 0;
    border: 1px solid rgb(238, 238, 238);
    color: ${(props) => (props.bg === 'red' ? 'white' : 'black')};
    height: 46px;
    border-radius: 8px;
    background-color: ${(props) => props.bg};
    cursor: pointer;
    width: ${(props) => props.width};
    font-size: 16px;
    font-weight: 600;
`
export const ListDiv = styled.div`
    isplay: flex;
    -webkit-box-align: center;
    align-items: center;
    -webkit-box-pack: justify;
    justify-content: space-between;
    flex-direction: row;
    padding: 0px 20px;
    width: 100%;
    height: 120px;
    border: 1px solid rgb(238, 238, 238);
    background-color: rgb(255, 255, 255);
    border-radius: 8px;
    cursor: pointer;
`