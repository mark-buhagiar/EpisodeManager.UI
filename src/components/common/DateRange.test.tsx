import { render, fireEvent, wait } from '@testing-library/react';
import React from 'react';
import moment from 'moment';
import DateRange from './DateRange';

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

describe('When the component is rendered', () => {
    it('should display 2 date pickers', () => {
        const placeholderDate = new Date();
        const { getAllByTestId } = render(
            <DateRange
                initialStartDate={placeholderDate}
                initialEndDate={placeholderDate}
                onDateRangeChanged={jest.fn()}
            ></DateRange>,
        );

        expect(getAllByTestId('mockedDateField').length).toEqual(2);
    });
});

describe('When a date is changed', () => {
    it('should call the callback', async () => {
        const placeholderDate = new Date();
        const mockOnDateRangeChanged = jest.fn();
        const { getAllByTestId } = render(
            <DateRange
                initialStartDate={placeholderDate}
                initialEndDate={placeholderDate}
                onDateRangeChanged={mockOnDateRangeChanged}
            ></DateRange>,
        );

        const [startDate, endDate] = getAllByTestId('mockedDateField');
        fireEvent.change(startDate, { target: { value: moment().subtract(2, 'weeks').format() } });
        fireEvent.change(endDate, { target: { value: moment().subtract(1, 'weeks').format() } });
        await wait();
        expect(mockOnDateRangeChanged).toHaveBeenCalledTimes(3);
    });
});
