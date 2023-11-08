import styled from 'styled-components';

export const HeaderContainer = styled.div`
    height: 100px;
    margin: 10px;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: space-between;
    width: 100%;
`;

export const Title = styled.h1``;

export const NavigationHeader = styled.div`
    display: flex;
    align-items: center;
    width: 100%;
`;

export const BackButton = styled.button`
    display: flex;
    align-items: center;
    justify-content: center;
    margin: 5px;
    font-weight: bold;
    font-size: 18px;
    cursor: pointer;
    height: 40px;
    outline: 0;
    background: none;
    border: none;
`;
export const ButtonContainer = styled.div`
    display: flex;
    align-items: center;
    justify-content: center;
    width: 18vw;
`;
export const TitleContainer = styled.div`
    display: flex;
    align-items: center;
    justify-content: center;
    width: 65vw;
`;