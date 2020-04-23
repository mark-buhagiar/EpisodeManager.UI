import React from 'react';
import CalendarHeader from './CalendarHeader';
import './Calendar.scss';

interface Props {
    date: Date;
}

const Calendar: React.FC<Props> = (props: Props): JSX.Element => {
    return (
        <>
            <CalendarHeader />
            WOOOOW
        </>
    );
};

export default Calendar;
