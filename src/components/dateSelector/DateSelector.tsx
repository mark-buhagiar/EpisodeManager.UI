import Moment from 'moment';
import React, { Dispatch } from 'react';
import { MonthReducerAction } from '../../reducers/monthReducerActions';
import './DateSelector.scss';

interface Props {
    date: Date;
    updateDateDispatch: Dispatch<MonthReducerAction>;
}

const DateSelector: React.FC<Props> = ({ date, updateDateDispatch }): JSX.Element => {
    const momentDate = Moment(date);
    const month = momentDate.format('MMMM');
    const year = momentDate.format('YYYY');

    return (
        <div id="dateSelector">
            <div id="decrementMonth">
                <span className="material-icons">navigate_before</span>
            </div>
            <div className="month-label">
                {month} <br /> <div className="year">{year}</div>
            </div>
            <div id="incrementMonth">
                <span className="material-icons">navigate_next</span>
            </div>
        </div>
    );
};

export default DateSelector;
