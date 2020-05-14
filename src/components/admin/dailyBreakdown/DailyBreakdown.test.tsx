import React from 'react';
import { render, fireEvent, act } from '@testing-library/react';

import DailyBreakdown from './DailyBreakdown';
import { getEpisodeCountDailyDistribution } from '../../../api/showsApi';
import { DatePicker } from '@material-ui/pickers';
import moment from 'moment';

jest.mock('@material-ui/pickers', () => {
    const actual = jest.requireActual('@material-ui/pickers');
    const moment = jest.requireActual('moment');

    return {
        ...actual,
        DatePicker: (() => (props: any): JSX.Element => {
            return (
                <input
                    data-testid="mockedDateField"
                    onChange={(e): void => {
                        props.onChange(moment(e.target.value));
                    }}
                />
            );
        })(),
    };
});

jest.mock('react-chartjs-2', () => ({
    Bar: (): string => 'Fake Chart',
}));

jest.mock('../../../api/showsApi', () => ({ getEpisodeCountDailyDistribution: jest.fn() }));

const validResult = [
    {
        qualityDistribution: [
            {
                count: 31,
                quality: 1,
            },
            {
                count: 31,
                quality: 2,
            },
            {
                count: 27,
                quality: 3,
            },
        ],
        date: '2020-05-01T00:00:00',
    },
];

afterEach(() => {
    jest.clearAllMocks();
});

describe('When the component is loading', () => {
    it('should display a loading spinner', async (): Promise<void> => {
        jest.useFakeTimers();
        (getEpisodeCountDailyDistribution as jest.Mock).mockReturnValueOnce(Promise.resolve(validResult));
        const { asFragment } = render(<DailyBreakdown />);
        expect(asFragment()).toMatchSnapshot();

        await act(async () => {
            await Promise.resolve();
        });
    });
});

describe('When data retrieval errors out', () => {
    it('should display an error icon', async (): Promise<void> => {
        (getEpisodeCountDailyDistribution as jest.Mock).mockReturnValueOnce(Promise.reject('Error test'));
        const { asFragment } = render(<DailyBreakdown />);

        await act(async () => {
            await Promise.resolve();
        });
        expect(asFragment()).toMatchSnapshot();
    });
});

describe('When data retrieval completes successfully', () => {
    it('should display the chartjs chart', async (): Promise<void> => {
        (getEpisodeCountDailyDistribution as jest.Mock).mockResolvedValueOnce(validResult);
        const { asFragment } = render(<DailyBreakdown />);

        await act(async () => {
            await Promise.resolve();
        });
        expect(asFragment()).toMatchSnapshot();
    });
});

describe('When selected dates are changed', () => {
    it.only('should re-query the web service', async (): Promise<void> => {
        (getEpisodeCountDailyDistribution as jest.Mock).mockResolvedValueOnce(validResult);

        await act(async () => {
            const { asFragment, getAllByTestId } = render(<DailyBreakdown />);
            const mockedDateField = getAllByTestId('mockedDateField');
            fireEvent.change(mockedDateField[0], { target: { value: moment().format() } });
        });

        expect(getEpisodeCountDailyDistribution).toHaveBeenCalledTimes(2);
    });
});
