import React from 'react';
import {useNavigate} from 'react-router-dom';
import {Teams, UserData} from 'types';
import {CardContent, CardKey, CardTexts, Container} from './styles';

interface Props {
    id?: string;
    url?: string;
    columns: Array<{
        key: string;
        value: string;
    }>;
    hasNavigation?: boolean;
    navigationProps?: UserData | Teams;
}

const Card = ({
    id,
    columns,
    url,
    hasNavigation = true,
    navigationProps = null,
}: Props): JSX.Element => {
    const navigate = useNavigate();

    const handleNavigation = (e: Event) => {
        if (hasNavigation) {
            navigate(url, {
                state: navigationProps,
            });
        }
        e.preventDefault();
    };

    return (
        <Container
            data-testid={`cardContainer-${id}`}
            hasNavigation={hasNavigation}
            onClick={(e: Event) => handleNavigation(e)}
        >
            {columns.map(({key: columnKey, value}) => (
                <CardTexts key={columnKey}>
                    <CardKey>{columnKey}:</CardKey>
                    <CardContent>{value}</CardContent>
                </CardTexts>
            ))}
        </Container>
    );
};

export default Card;
