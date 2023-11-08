import * as React from 'react';
import {fireEvent, render, screen, waitFor, act} from '@testing-library/react';
import * as API from '../../../api';
import Teams from '..';

jest.mock('react-router-dom', () => ({
    useLocation: () => ({
        state: {
            firstName: 'Test',
            lastName: 'User',
            displayName: 'userName',
            location: 'location',
        },
    }),
    useNavigate: () => ({}),
}));

jest.mock('../../../api');

describe('Teams', () => {
    beforeAll(() => {
        jest.useFakeTimers();
    });

    afterEach(() => {
        jest.clearAllTimers();
    });

    afterAll(() => {
        jest.useRealTimers();
    });

    it('should render spinner while loading', async () => {
        // TODO - Add code for this test

        render(<Teams />);
        expect(screen.getByTestId('spinner')).toBeInTheDocument();
    });

    it('should render teams list', async () => {
        jest.spyOn(API, 'getTeams').mockResolvedValue([
            {
                id: '1',
                name: 'Team1',
            },
            {
                id: '2',
                name: 'Team2',
            },
        ]);

        render(<Teams />);

        await waitFor(() => {
            expect(screen.getByText('Team1')).toBeInTheDocument();
        });
        expect(screen.getByText('Team2')).toBeInTheDocument();
    });

    it('should render an input field with a placeholder "Filter by display name"', () => {
        render(<Teams />);
        const inputElement = screen.getByPlaceholderText('Filter by display name');
        expect(inputElement).toBeInTheDocument();
    });

    it('should filter teams based on input value', async () => {
        jest.spyOn(API, 'getTeams').mockResolvedValue([
            {
                id: '1',
                name: 'Barcelona',
            },
            {
                id: '2',
                name: 'Real Madrid',
            },
            {
                id: '3',
                name: 'Manchester United',
            },
        ]);
        render(<Teams />);

        await waitFor(() => {
            expect(screen.getByText('Barcelona')).toBeInTheDocument();
        });

        await waitFor(() => {
            expect(screen.getByText('Real Madrid')).toBeInTheDocument();
        });

        await waitFor(() => {
            expect(screen.getByText('Manchester United')).toBeInTheDocument();
        });

        const inputElement = screen.getByPlaceholderText('Filter by display name');
        fireEvent.change(inputElement, {target: {value: 'Barcelona'}});

        await waitFor(() => {
            expect(screen.queryByText('Barcelona')).toBeInTheDocument();
        });
        await waitFor(() => {
            expect(screen.queryByText('Real Madrid')).toBeNull();
        });
        await waitFor(() => {
            expect(screen.queryByText('Manchester United')).toBeNull();
        });
    });
});
