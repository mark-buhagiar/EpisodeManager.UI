import React from 'react';
import CalendarHeaderItem from './HeaderItem';

const CalendarHeader: React.FC = (): JSX.Element => {
    const headers = [
        { label: 'Mon' },
        { label: 'Tue' },
        { label: 'Wed' },
        { label: 'Thu' },
        { label: 'Fri' },
        { label: 'Sat' },
        { label: 'Sun' },
    ];

    return (
        <div className="calendar-header">
            {headers.map((header) => (
                <CalendarHeaderItem key={header.label} {...header} />
            ))}
        </div>
    );
};

export default CalendarHeader;
