import styled from 'styled-components';

export const PageCounter = styled.span<{selected: boolean}>`
    background: none;
    color: #333;
    background-color: ${({selected}) => (selected ? '#8accf2' : '#FFF')};
    display: inline-block;
    font-family: 'QuickSand';
    font-weight: ${({selected}) => (selected ? 'bold' : 'normal')};
    width: 20px;
    height: 20px;
    border-radius: 50%;
    padding: 5px;
    text-align: center;
    &:hover {
        cursor: pointer;
    }
`;

export const Button = styled.button`
    background: none;
    border: 1px solid #8accf2;
    outline: none;
    padding: 1rem 2rem;
    border-radius: 2rem;
    margin: 0;
    font-weight: bold;

    &:disabled {
        cursor: default;
    }

    &:hover&:not(:disabled) {
        cursor: pointer;
        background-color: #8accf2;
    }
    
`;

export const PaginationControls = styled.div`
    display: flex;
    align-items: center;

    div {
        margin: 0 1rem;
    }
`;