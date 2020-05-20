import { cleanup, render } from '@testing-library/react';
import moment, { Moment } from 'moment';
import React from 'react';
import Calendar from './';

afterEach(async () => {
    await cleanup();
    jest.useRealTimers();
    jest.clearAllMocks();
});

describe('When the component is rendered', () => {
    afterEach(async () => {
        await cleanup();
        jest.useRealTimers();
        jest.clearAllMocks();
    });

    it.each`
        anchorDate                | expectedStart             | expectedEnd
        ${new Date(2020, 3, 1)}   | ${new Date(2020, 2, 30)}  | ${new Date(2020, 4, 3)}
        ${new Date(2020, 4, 13)}  | ${new Date(2020, 3, 27)}  | ${new Date(2020, 4, 31)}
        ${new Date(2020, 6, 13)}  | ${new Date(2020, 5, 29)}  | ${new Date(2020, 7, 2)}
        ${new Date(2020, 10, 13)} | ${new Date(2020, 9, 26)}  | ${new Date(2020, 11, 6)}
        ${new Date(2020, 11, 25)} | ${new Date(2020, 10, 30)} | ${new Date(2021, 0, 3)}
    `(
        'should display a date for each day when the anchor date is $anchorDate',
        async ({ anchorDate, expectedStart, expectedEnd }) => {
            const { getAllByTestId } = render(<Calendar date={anchorDate} />);

            const dateItems = getAllByTestId(`calendar-body-item`, { exact: false });

            const testDate = moment(expectedStart);
            let index = 0;
            while (testDate.isSameOrBefore(expectedEnd, 'day')) {
                expect(dateItems[index].getAttribute('data-testid')).toEqual(
                    `calendar-body-item-${testDate.format('YYYYMMDD')}`,
                );
                index += 1;
                testDate.add(1, 'day');
            }

            expect(index).toEqual(dateItems.length);
        },
    );

    it.each`
        dayOfWeek
        ${`Mon`}
        ${`Tue`}
        ${`Wed`}
        ${`Thu`}
        ${`Fri`}
        ${`Sat`}
        ${`Sun`}
    `('should display the day of the week ($dayOfWeek)', async ({ dayOfWeek }) => {
        const { getByTestId } = render(<Calendar date={new Date()} />);
        expect(getByTestId(`calendar-header-item-${dayOfWeek}`)).toBeTruthy();
    });
});

describe('When date prop changes', () => {
    let momentTestDate: Moment;
    let calendarRerender: any;
    let calendarGetByTestId: any;

    beforeEach(() => {
        const testDate = new Date(2020, 3, 12);
        const { getByTestId, rerender } = render(<Calendar date={testDate} />);
        momentTestDate = moment(testDate);
        calendarRerender = rerender;
        calendarGetByTestId = getByTestId;
    });

    it('should update the displayed dates', async () => {
        expect(calendarGetByTestId(`calendar-body-item-${momentTestDate.format('YYYYMMDD')}`)).toBeTruthy();

        const momentNextMonth = momentTestDate.add(1, 'month');
        calendarRerender(<Calendar date={momentNextMonth.toDate()} />);
        expect(calendarGetByTestId(`calendar-body-item-${momentNextMonth.format('YYYYMMDD')}`)).toBeTruthy();
    });
});
