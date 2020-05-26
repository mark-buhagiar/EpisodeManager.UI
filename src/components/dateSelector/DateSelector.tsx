import Moment from 'moment';
import React, { Dispatch } from 'react';
import { MonthReducerAction, MonthReducerActionTypes } from '../../reducers/monthReducerActions';
import DateChanger from './DateChanger';
import './DateSelector.scss';

interface Props {
    date: Date;
    updateDateDispatch: Dispatch<MonthReducerAction>;
}

const DateSelector: React.FC<Props> = ({ date, updateDateDispatch }): JSX.Element => {
    const momentDate = Moment(date);
    const month = momentDate.format('MMMM');
    const year = momentDate.format('YYYY');

    const changeMonth = (type: MonthReducerActionTypes): void => updateDateDispatch({ type });
    return (
        <div className="date-selector">
            <DateChanger
                id="navigate_before"
                onClick={(): void => changeMonth(MonthReducerActionTypes.DECREMENT_MONTH)}
            />
            <div data-testid="month-label" className="month-label">
                {month} <br />
                <div className="year">{year}</div>
            </div>

            <DateChanger
                id="navigate_next"
                onClick={(): void => changeMonth(MonthReducerActionTypes.INCREMENT_MONTH)}
            />
        </div>
    );
};

export default DateSelector;
