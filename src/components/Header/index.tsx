import * as React from 'react';
import {useNavigate} from 'react-router-dom';
import {
    HeaderContainer,
    NavigationHeader,
    BackButton,
    Title,
    TitleContainer,
    ButtonContainer,
} from './styles';

interface Props {
    title: string;
    showBackButton?: boolean;
}

const Header = ({title, showBackButton = true}: Props) => {
    const navigate = useNavigate();
    return (
        <HeaderContainer>
            <NavigationHeader>
                <ButtonContainer>
                    {showBackButton && (
                        <BackButton
                            onClick={() => {
                                navigate(-1);
                            }}
                        >
                            {'<'} Voltar
                        </BackButton>
                    )}
                </ButtonContainer>
                <TitleContainer>
                    <Title>{title}</Title>
                </TitleContainer>
            </NavigationHeader>
        </HeaderContainer>
    );
};

export default Header;
