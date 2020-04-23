import moment from 'moment';
import React, { useEffect, useState } from 'react';
import { getDatesInRange } from '../../helpers/dateHelpers';
import './Calendar.scss';
import CalendarBody from './CalendarBody';
import CalendarHeader from './CalendarHeader';

interface Props {
    date: Date;
}

const Calendar: React.FC<Props> = (props: Props): JSX.Element => {
    const [dates, setDates] = useState<Date[]>([]);
    const [episodes, setEpisodes] = useState([]);
    const [calendarStart, setCalendarStart] = useState<Date | null>(null);
    const [calendarEnd, setCalendarEnd] = useState<Date | null>(null);

    useEffect(() => {
        const anchorDate = moment(props.date);

        const calendarStart = moment(anchorDate).startOf('month');
        calendarStart.subtract('day', calendarStart.day() === 0 ? 6 : calendarStart.day() - 1);

        const calendarEnd = moment(anchorDate).endOf('month');
        calendarEnd.add('day', 7 - calendarEnd.day());

        setDates(getDatesInRange(calendarStart, calendarEnd));
        setCalendarStart(calendarStart.toDate());
        setCalendarEnd(calendarEnd.toDate());
    }, [props.date]);

    useEffect(() => {
        if (!(calendarStart && calendarEnd)) return;

        console.log(calendarStart);
        console.log(calendarEnd);

        // (async () => getEpisodesForUserBetweenDates(calendarStart, calendarEnd))();
    }, [calendarStart, calendarEnd]);

    return (
        <div className="calendar">
            <CalendarHeader />
            <CalendarBody dates={dates} />
        </div>
    );
};

export default Calendar;
