import { cleanup, render } from '@testing-library/react';
import React from 'react';
import CalendarBody from './Body';
import CalendarBodyItem from './BodyItem';
import moment from 'moment';
import Episode from '../../models/Episode';

jest.mock('./BodyItem');

afterEach(async () => {
    await cleanup();
    jest.useRealTimers();
    jest.clearAllMocks();
});

describe('When the component is rendered', () => {
    it('should display a date for each day that is passed in', async () => {
        const actualImpl = jest.requireActual('./BodyItem');
        (CalendarBodyItem as jest.Mock).mockImplementation(((): any => actualImpl.default)());

        const dates = [new Date(2020, 3, 1), new Date(2020, 3, 2), new Date(2020, 3, 3)];
        const { getAllByTestId, debug } = render(<CalendarBody dates={dates} episodes={[]} />);
        const dateItems = getAllByTestId(`calendar-body-item`, { exact: false });

        expect(dateItems.length).toEqual(dates.length);
        dateItems.forEach((dateItem, index) => {
            const testId = dateItem.getAttribute('data-testid');
            expect(testId).toEqual(`calendar-body-item-${moment(dates[index]).format('YYYYMMDD')}`);
        });
    });

    it('should filter data by the provided date', () => {
        const propUpdate = jest.fn();

        (CalendarBodyItem as jest.Mock).mockImplementation(
            (() => ({ date, episodes }: any): React.ReactNode => {
                propUpdate(date, episodes);
                return <></>;
            })(),
        );

        const dates = [new Date(2020, 3, 1), new Date(2020, 3, 2), new Date(2020, 3, 3)];
        const firstA = { publishedDate: dates[0], id: 1 } as Episode;
        const firstB = { publishedDate: dates[0], id: 2 } as Episode;
        const firstC = { publishedDate: dates[0], id: 3 } as Episode;
        const firstD = { publishedDate: dates[0], id: 4 } as Episode;
        const secondA = { publishedDate: dates[1], id: 5 } as Episode;
        const secondB = { publishedDate: dates[1], id: 6 } as Episode;
        const secondC = { publishedDate: dates[1], id: 7 } as Episode;
        const secondD = { publishedDate: dates[1], id: 8 } as Episode;
        const thirdA = { publishedDate: dates[2], id: 9 } as Episode;
        const thirdB = { publishedDate: dates[2], id: 10 } as Episode;
        const thirdC = { publishedDate: dates[2], id: 11 } as Episode;
        const thirdD = { publishedDate: dates[2], id: 12 } as Episode;

        const episodes = [
            firstA,
            secondA,
            thirdA,
            firstB,
            secondB,
            thirdB,
            firstC,
            secondC,
            thirdC,
            firstD,
            secondD,
            thirdD,
        ] as Episode[];

        render(<CalendarBody dates={dates} episodes={episodes} />);
        expect(propUpdate).toHaveBeenNthCalledWith(1, dates[0], [firstA, firstB, firstC, firstD]);
        expect(propUpdate).toHaveBeenCalledWith(dates[1], [secondA, secondB, secondC, secondD]);
        expect(propUpdate).toHaveBeenCalledWith(dates[2], [thirdA, thirdB, thirdC, thirdD]);
    });
});
