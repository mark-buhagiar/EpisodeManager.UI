import { render, fireEvent } from '@testing-library/react';
import React from 'react';
import DateSelector from './DateSelector';
import { MonthReducerActionTypes } from '../../reducers/monthReducerActions';

describe('When the component is rendered', () => {
    it('should render correctly', () => {
        const testDate = new Date(2020, 11, 1);
        const { getByTestId } = render(<DateSelector date={testDate} updateDateDispatch={jest.fn()}></DateSelector>);
        expect(getByTestId('navigate_before')).toBeTruthy();
        expect(getByTestId('navigate_next')).toBeTruthy();
        expect(getByTestId('month-label').textContent).toEqual('December 2020');
    });
});
describe('When month change buttons are clicked', () => {
    it('should increment the month when the right arrow is clicked', () => {
        const mockDateChangeDispatcher = jest.fn();
        const { getByTestId } = render(
            <DateSelector date={new Date()} updateDateDispatch={mockDateChangeDispatcher}></DateSelector>,
        );
        fireEvent.click(getByTestId('navigate_next'));
        expect(mockDateChangeDispatcher).toHaveBeenCalledWith({ type: MonthReducerActionTypes.INCREMENT_MONTH });
    });

    it('should decrement the month when the left arrow is clicked', () => {
        const mockDateChangeDispatcher = jest.fn();
        const { getByTestId } = render(
            <DateSelector date={new Date()} updateDateDispatch={mockDateChangeDispatcher}></DateSelector>,
        );
        fireEvent.click(getByTestId('navigate_before'));
        expect(mockDateChangeDispatcher).toHaveBeenCalledWith({ type: MonthReducerActionTypes.DECREMENT_MONTH });
    });
});
