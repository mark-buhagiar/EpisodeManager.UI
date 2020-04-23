import React from 'react';
import CalendarBodyItem from './CalendarBodyItem';

interface Props {
    dates: Date[];
}

const CalendarBody: React.FC<Props> = ({ dates }): JSX.Element => {
    return (
        <div className="calendar-body">
            {dates.map((date) => (
                <CalendarBodyItem key={date.getTime()} date={date} />
            ))}
        </div>
    );
};

export default CalendarBody;
