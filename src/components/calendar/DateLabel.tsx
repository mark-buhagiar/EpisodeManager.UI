import React from 'react';

interface Props {
    isToday: boolean;
    date: Date;
}

const CalendarDateLabel: React.FC<Props> = ({ date, isToday }): JSX.Element => {
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
