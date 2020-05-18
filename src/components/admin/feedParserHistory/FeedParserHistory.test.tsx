import { act, cleanup, fireEvent, render } from '@testing-library/react';
import moment from 'moment';
import React from 'react';
import { getParseHistoryBetweenDates } from '../../../api/feedParserApi';
import FeedParserHistory from './FeedParserHistory';

jest.mock('@material-ui/pickers', () => {
    const actual = jest.requireActual('@material-ui/pickers');
    const moment = jest.requireActual('moment');

    return {
        ...actual,
        DatePicker: (() => (props: any): React.ReactNode => {
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

jest.mock('../../../api/feedParserApi', () => ({ getParseHistoryBetweenDates: jest.fn() }));

const validResult = [
    {
        id: 28,
        retrievedOn: moment('2020-04-13T15:28:27.751938').toDate(),
        lastSyncedOn: moment('2020-04-13T15:28:27.751938').toDate(),
        episodeCount: 100,
        syncCount: 1,
        success: true,
    },
    {
        id: 30,
        retrievedOn: moment('2020-04-16T22:15:03.898613').toDate(),
        lastSyncedOn: moment('2020-04-16T22:15:03.898613').toDate(),
        episodeCount: 100,
        syncCount: 1,
        success: true,
    },
];

afterEach(async () => {
    await cleanup();
    jest.clearAllMocks();
});

describe('When the component is loading', () => {
    it('should display a loading spinner', async (): Promise<void> => {
        (getParseHistoryBetweenDates as jest.Mock).mockReturnValueOnce(Promise.resolve([...validResult]));
        const { asFragment } = render(<FeedParserHistory />);
        expect(asFragment()).toMatchSnapshot();

        await act(async () => {
            await Promise.resolve();
        });
    });
});

describe('When data retrieval errors out', () => {
    it('should display an error icon', async (): Promise<void> => {
        (getParseHistoryBetweenDates as jest.Mock).mockReturnValueOnce(Promise.reject('Error test'));
        const { asFragment } = render(<FeedParserHistory />);

        await act(async () => {
            await Promise.resolve();
        });
        expect(asFragment()).toMatchSnapshot();
    });
});

describe('When data retrieval completes successfully', () => {
    it('should display the appropriate message if there are no results', async (): Promise<void> => {
        (getParseHistoryBetweenDates as jest.Mock).mockReturnValueOnce(Promise.resolve([]));
        const { asFragment, getByText } = render(<FeedParserHistory />);

        await act(async () => {
            await Promise.resolve();
        });
        expect(asFragment()).toMatchSnapshot();
        expect(getByText('No Feed Parser Data Available')).toBeTruthy();
    });

    it('should display a list of results', async (): Promise<void> => {
        (getParseHistoryBetweenDates as jest.Mock).mockReturnValueOnce(Promise.resolve([...validResult]));
        const { asFragment, queryByText, getAllByTestId } = render(<FeedParserHistory />);

        await act(async () => {
            await Promise.resolve();
        });

        expect(asFragment()).toMatchSnapshot();
        expect(queryByText('No Feed Parser Data Available')).toBeNull();

        const sortedResults = [...validResult];
        sortedResults.sort((a, b) => (a.lastSyncedOn.getTime() < b.lastSyncedOn.getTime() ? 1 : -1));

        const commonTestId = 'feed-parser-history-item';
        const historyItems = getAllByTestId(commonTestId, { exact: false });
        expect(historyItems.length).toEqual(validResult.length);

        historyItems.forEach((renderedRow, index) => {
            expect(renderedRow.getAttribute('data-testId')).toEqual(`${commonTestId}-${sortedResults[index].id}`);
        });
    });
});

describe('When selected dates are changed', () => {
    it('should re-query the web service', async (): Promise<void> => {
        (getParseHistoryBetweenDates as jest.Mock).mockResolvedValue([...validResult]);

        await act(async () => {
            const { getAllByTestId } = render(<FeedParserHistory />);
            await Promise.resolve();
            const [startDate, endDate] = getAllByTestId('mockedDateField');
            fireEvent.change(startDate, { target: { value: moment().subtract(2, 'weeks').format() } });
            await Promise.resolve();
            fireEvent.change(endDate, { target: { value: moment().subtract(1, 'weeks').format() } });
            await Promise.resolve();
        });

        expect(getParseHistoryBetweenDates).toHaveBeenCalledTimes(3);
    });
});
