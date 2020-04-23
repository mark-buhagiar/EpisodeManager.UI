import React, { useState, useEffect } from 'react';
import CalendarDateLabel from './CalendarDateLabel';
import useIsToday from '../../hooks/useIsToday';

interface Props {
    date: Date;
}

const CalendarBodyItem: React.FC<Props> = ({ date }): JSX.Element => {
    const isToday = useIsToday(date);

    return (
        <div className={['calendar-body-item', isToday ? 'date-today' : ''].join(' ')}>
            <CalendarDateLabel date={date} />
        </div>
    );
};

export default CalendarBodyItem;
