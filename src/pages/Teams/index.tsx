import React, {useState, useEffect, useCallback} from 'react';
import {Teams as TeamsList} from 'types';
import {Input} from 'components/Input';
import {getTeams as fetchTeams} from '../../api';
import Header from '../../components/Header';
import List from '../../components/List';
import {Container} from '../../components/Container';
import {Button, PageCounter, PaginationControls} from './styles';

const mapTeams = (teams: TeamsList[]) => {
    return teams.map(team => {
        const columns = [
            {
                key: 'Name',
                value: team.name,
            },
        ];
        return {
            id: team.id,
            url: `/team/${team.id}`,
            columns,
            navigationProps: team,
        };
    });
};

const Teams = () => {
    const [teams, setTeams] = useState<TeamsList[]>([]);
    const [isLoading, setIsLoading] = useState<boolean>(true);
    const [filteredTeams, setFilteredTeams] = useState<TeamsList[]>([]);
    const [inputValue, setInputValue] = useState<string>('');

    const [currentPage, setCurrentPage] = useState(1);
    const itemsPerPage = 10;

    const startIndex = (currentPage - 1) * itemsPerPage;
    const endIndex = currentPage * itemsPerPage;

    const teamsToDisplay = teams.slice(startIndex, endIndex);
    const totalPages = Math.ceil(teams.length / itemsPerPage);

    const handleNextPage = () => {
        if (currentPage < Math.ceil(teams.length / itemsPerPage)) {
            setCurrentPage(currentPage + 1);
        }
    };

    const handlePrevPage = () => {
        if (currentPage > 1) {
            setCurrentPage(currentPage - 1);
        }
    };
    const handlePageClick = page => {
        if (page >= 1 && page <= totalPages) {
            setCurrentPage(page);
        }
    };

    const getTeams = useCallback(async () => {
        const response = await fetchTeams();
        setTeams(response);
        setIsLoading(false);
    }, []);

    useEffect(() => {
        getTeams();
    }, [getTeams]);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const value = e.target.value;
        setInputValue(value);
        const filtered = teams.filter(team =>
            team.name.toLowerCase().startsWith(value.toLowerCase())
        );
        setFilteredTeams(filtered);
    };

    const renderList = inputValue ? filteredTeams : teamsToDisplay || [];

    return (
        <Container>
            <Header title="Teams" showBackButton={false} />
            <Input
                type="text"
                value={inputValue}
                onChange={handleChange}
                placeholder="Filter by display name"
            />
            <List items={mapTeams(renderList)} isLoading={isLoading} />

            {!inputValue && (
                <PaginationControls>
                    <Button type="button" onClick={handlePrevPage} disabled={currentPage === 1}>
                        Página Anterior
                    </Button>
                    <div>
                        {Array.from({length: totalPages}, (_, index) => (
                            <PageCounter
                                type="button"
                                key={index}
                                onClick={() => handlePageClick(index + 1)}
                                disabled={currentPage === index + 1}
                                selected={currentPage === index + 1}
                            >
                                {index + 1}
                            </PageCounter>
                        ))}
                    </div>

                    <Button
                        type="button"
                        onClick={handleNextPage}
                        disabled={currentPage === Math.ceil(teams.length / itemsPerPage)}
                    >
                        Próxima Página
                    </Button>
                </PaginationControls>
            )}
        </Container>
    );
};

export default Teams;
