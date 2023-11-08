import styled from 'styled-components';

export const Container = styled.div<{hasNavigation: boolean}>`
    background: #eef2ff;
    border-radius: 5px;
    display: flex;
    flex-direction: column;
    justify-content: center;
    padding: 20px;
    width: 300px;
    max-height: 200px;
    cursor: ${props => (props.hasNavigation ? 'pointer' : 'default')};
    margin: 5px;
    border-left: 5px solid #0f62fe;
    border-bottom-left-radius: 6px;
    border-top-left-radius: 6px;
`;

export const CardTexts = styled.div`
    display: flex;
    margin: 0 0 1rem 0;
`;

export const CardKey = styled.p`
    color: #0f62fe;
    font-weight: bold;
`;

export const CardContent = styled.p`
    color: #0f62fe;
    margin-left: 0.5rem;
`;
