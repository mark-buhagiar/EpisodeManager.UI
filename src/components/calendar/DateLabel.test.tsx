import { cleanup, render, wait, getByTestId } from '@testing-library/react';

import React from 'react';
import CalendarDateLabel from './DateLabel';
import moment, { Moment } from 'moment';

afterEach(async () => {
    await cleanup();
    jest.useRealTimers();
    jest.clearAllMocks();
});

describe('When the component is rendered', () => {
    it('should display the numeric date of the month', () => {
        const testDate = new Date(2020, 3, 10);
        const { getByTestId } = render(<CalendarDateLabel date={testDate} isToday={false} />);
        expect(getByTestId(`month-date-${testDate.getMonth()}-${testDate.getDate()}`).textContent).toEqual('10');
    });

    it('should display the month name if the date is the first of the month', () => {
        const testDate = new Date(2020, 3, 1);
        const { getByTestId } = render(<CalendarDateLabel date={testDate} isToday={false} />);
        expect(getByTestId(`month-date-${testDate.getMonth()}-${testDate.getDate()}`).textContent).toEqual('April1');
    });

    it.each`
        isToday
        ${true}
        ${false}
    `('should display a marker if the date is today (isToday = $isToday)', async ({ isToday }) => {
        const { queryByTestId } = render(<CalendarDateLabel date={new Date()} isToday={isToday} />);
        const expectation = expect(queryByTestId('is-today-marker'));
        if (isToday) expectation.toBeTruthy();
        if (!isToday) expectation.toBeNull();
    });
});
