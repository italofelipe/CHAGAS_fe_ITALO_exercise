import React from 'react';
import {render, screen, waitFor} from '@testing-library/react';
import * as API from '../../../api';
import TeamOverview from '..';

jest.mock('react-router-dom', () => ({
    useLocation: () => ({
        state: {
            teamName: 'Some Team',
        },
    }),
    useNavigate: () => ({}),
    useParams: () => ({
        teamId: '1',
    }),
}));

jest.mock('../../../api');

describe('TeamOverview', () => {
    beforeAll(() => {
        jest.useFakeTimers();
    });

    afterEach(() => {
        jest.clearAllTimers();
    });

    afterAll(() => {
        jest.useRealTimers();
    });

    it('should render team overview users', async () => {
        const teamOverview = {teamLeadId: '1', teamMemberIds: ['2', '3']};
        const teamMembers = [
            {
                id: '1',
                firstName: 'John',
                lastName: 'Doe',
                displayName: 'JohnDoe',
                location: 'New York',
                avatar: '',
            },
            {
                id: '2',
                firstName: 'Jane',
                lastName: 'Smith',
                displayName: 'JaneSmith',
                location: 'London',
                avatar: '',
            },
            {
                id: '3',
                firstName: 'Bob',
                lastName: 'Johnson',
                displayName: 'BobJohnson',
                location: 'Paris',
                avatar: '',
            },
        ];
        jest.spyOn(API, 'getTeamOverview').mockResolvedValue(teamOverview);
        jest.spyOn(API, 'getUserData').mockImplementation(userId => {
            const user = teamMembers.find(member => member.id === userId);
            return Promise.resolve(user);
        });
        render(<TeamOverview />);
        await waitFor(() => {
            expect(screen.getByText('John Doe')).toBeInTheDocument();
        });
    });
});
