import React, {useState, useEffect, useCallback} from 'react';
import {useLocation, useParams} from 'react-router-dom';
import {UserData} from 'types';
import {Input} from 'components/Input';
import {getTeamOverview, getUserData} from '../../api';
import Card from '../../components/Card';
import {Container} from '../../components/Container';
import Header from '../../components/Header';
import List from '../../components/List';

const teamMembersArray = (users: UserData[]) => {
    return users.map(user => {
        const columns = [
            {
                key: 'Name',
                value: `${user.firstName} ${user.lastName}`,
            },
            {
                key: 'Display Name',
                value: user.displayName,
            },
            {
                key: 'Location',
                value: user.location,
            },
        ];
        return {
            id: user.id,
            url: `/user/${user.id}`,
            columns,
            navigationProps: user,
        };
    });
};

const teamLeadCard = (teamLead?: UserData) => {
    const columns = [
        {
            key: 'Team Lead',
            value: '',
        },
        {
            key: 'Name',
            value: `${teamLead.firstName} ${teamLead.lastName}`,
        },
        {
            key: 'Display Name',
            value: teamLead.displayName,
        },
        {
            key: 'Location',
            value: teamLead.location,
        },
    ];
    return <Card columns={columns} url={`/user/${teamLead.id}`} navigationProps={teamLead} />;
};

interface PageState {
    teamLead?: UserData;
    teamMembers?: UserData[];
}

const TeamOverview = () => {
    const location = useLocation();
    const {teamId} = useParams();
    const [pageData, setPageData] = useState<PageState>({});
    const [filteredTeamMembers, setFilteredTeamMembers] = useState<UserData[]>([]);
    const [isLoading, setIsLoading] = useState<boolean>(true);
    const [inputValue, setInputValue] = useState<string>('');

    const getTeamUsers = useCallback(async () => {
        const {teamLeadId, teamMemberIds = []} = await getTeamOverview(teamId);

        const teamMemberPromises = teamMemberIds.map(async teamMemberId => {
            return getUserData(teamMemberId);
        });

        const [teamLead, ...teamMembers] = await Promise.all([
            getUserData(teamLeadId),
            ...teamMemberPromises,
        ]);
        setPageData({
            teamLead,
            teamMembers,
        });
        setIsLoading(false);
    }, [teamId]);

    useEffect(() => {
        getTeamUsers();
    }, [getTeamUsers]);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const value = e.target.value;
        setInputValue(value);
        const filtered = pageData.teamMembers?.filter(user =>
            user.displayName.toLowerCase().startsWith(value.toLowerCase())
        );
        setFilteredTeamMembers(filtered);
    };

    const renderList = inputValue ? filteredTeamMembers : pageData.teamMembers || [];

    return (
        <Container>
            <Header title={`Team ${location.state.name}`} />
            <Input
                type="text"
                value={inputValue}
                onChange={handleChange}
                placeholder="Filter by display name"
            />
            {!isLoading && teamLeadCard(pageData.teamLead)}
            <List items={teamMembersArray(renderList)} isLoading={isLoading} />
        </Container>
    );
};

export default TeamOverview;
