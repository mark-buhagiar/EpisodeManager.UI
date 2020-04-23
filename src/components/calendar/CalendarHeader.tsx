import React from 'react';
import CalendarHeaderItem from './CalendarHeaderItem';

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
