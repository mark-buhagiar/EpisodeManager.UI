import React from 'react';
import useIsToday from '../../hooks/useIsToday';

interface Props {
    date: Date;
}

const CalendarDateLabel: React.FC<Props> = ({ date }): JSX.Element => {
    const isToday = useIsToday(date);

    const monthNames = [
        'January',
        'February',
        'March',
        'April',
        'May',
        'June',
        'July',
        'August',
        'September',
        'October',
        'November',
        'December',
    ];

    return (
        <div className="date-label">
            {date.getDate() === 1 ? <div className="month-label">{monthNames[date.getMonth()]}</div> : ''}
            <div className={['day-label', isToday ? 'date-today' : ''].join(' ')}>{date.getDate()}</div>
        </div>
    );
};

export default CalendarDateLabel;
